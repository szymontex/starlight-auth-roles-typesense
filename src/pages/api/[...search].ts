import type { APIRoute } from 'astro';
import Typesense from 'typesense';

interface SearchDocument {
  title: string;
  slug: string;
  description?: string;
  content: string;
  path: string;
}

interface CombinedSearchResult {
  found: number;
  hits: Array<{
    document: SearchDocument & { fullPath: string };
    highlights: Array<{
      field: string;
      snippet: string | null;
    }>;
  }>;
}

const typesenseClient = new Typesense.Client({
  nodes: [{ 
    host: import.meta.env.PUBLIC_TYPESENSE_HOST, 
    port: import.meta.env.PUBLIC_TYPESENSE_PORT, 
    protocol: import.meta.env.PUBLIC_TYPESENSE_PROTOCOL 
  }],
  apiKey: import.meta.env.PUBLIC_TYPESENSE_API_KEY,
});

export const ALL: APIRoute = async ({ request, cookies }) => {
  console.log(`pages/api/search Search API called with ${request.method} method`);
  
  if (request.method === 'POST') {
    const userRole = cookies.get('userRole')?.value || 'klient';
    
    let collectionsToSearch: string[];
    switch (userRole) {
      case 'admin':
        collectionsToSearch = ['docs_admin', 'docs_spolka', 'docs_realizator', 'docs_klient'];
        break;
      case 'spolka':
        collectionsToSearch = ['docs_spolka', 'docs_realizator', 'docs_klient'];
        break;
      case 'realizator':
        collectionsToSearch = ['docs_realizator', 'docs_klient'];
        break;
      case 'klient':
      default:
        collectionsToSearch = ['docs_klient'];
    }

    try {
      const body = await request.json();
      const { query } = body;

      console.log(`pages/api/search Searching in collections: ${collectionsToSearch.join(', ')} for query: ${query}`);

      const searchParameters = {
        q: query,
        query_by: 'title,content,description',
        highlight_full_fields: 'content,title',
        snippet_threshold: 30
      };

      const searchPromises = collectionsToSearch.map(collection => 
        typesenseClient.collections<SearchDocument>(collection).documents().search(searchParameters)
      );

      const results = await Promise.all(searchPromises);

      const combinedResults: CombinedSearchResult = {
        found: results.reduce((sum, result) => sum + (result.found || 0), 0),
        hits: results.flatMap(result => 
          result.hits?.map(hit => ({
            document: {
              ...hit.document,
              fullPath: `/${hit.document.slug}`
            },
            highlights: hit.highlights?.map(h => ({
              field: h.field as string,
              snippet: h.snippet || null
            })) || []
          })) || []
        )
      };
  
      return new Response(JSON.stringify(combinedResults), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Search error:', error);
      return new Response(JSON.stringify({ error: 'pages/api/search An error occurred during search' }), { status: 500 });
    }
  } else if (request.method === 'GET') {
    return new Response(JSON.stringify({ message: 'pages/api/search Search API is working. Use POST method for search queries.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    return new Response(JSON.stringify({ error: 'pages/api/search Method not allowed' }), { status: 405 });
  }
};