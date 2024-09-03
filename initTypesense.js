import Typesense from 'typesense';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

dotenv.config();

const client = new Typesense.Client({
  nodes: [{
    host: process.env.TYPESENSE_HOST,
    port: process.env.TYPESENSE_PORT,
    protocol: process.env.TYPESENSE_PROTOCOL
  }],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2
});

const collections = ['docs_admin', 'docs_klient', 'docs_realizator', 'docs_spolka'];

async function initializeTypesense() {
  const schema = {
    fields: [
      { name: 'title', type: 'string' },
      { name: 'slug', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'content', type: 'string' },
      { name: 'path', type: 'string' }
    ]
  };

  try {
    // Usuń istniejące kolekcje
    await removeExistingCollections();

    // Utwórz nowe kolekcje
    for (const collection of collections) {
      const collectionSchema = { ...schema, name: collection };
      await client.collections().create(collectionSchema);
      console.log(`Collection ${collection} created successfully`);
    }

    // Indeksuj pliki Markdown
    await indexMarkdownFiles('src/content/docs');

    console.log('Markdown files indexed successfully');
  } catch (error) {
    console.error('Error initializing Typesense:', error);
  }
}

async function removeExistingCollections() {
  try {
    const existingCollections = await client.collections().retrieve();
    for (const collection of existingCollections) {
      await client.collections(collection.name).delete();
      console.log(`Deleted existing collection: ${collection.name}`);
    }
  } catch (error) {
    if (error.httpStatus !== 404) {
      console.error('Error removing existing collections:', error);
    }
  }
}

async function indexMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await indexMarkdownFiles(filePath);
    } else if (path.extname(file) === '.md') {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      const document = {
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        content: content,
        path: filePath.replace('src/content/docs/', '')
      };

      // Określ kolekcję na podstawie ścieżki pliku
      const collectionName = getCollectionNameFromPath(filePath);

      try {
        await client.collections(collectionName).documents().create(document);
        console.log(`Indexed in ${collectionName}: ${filePath}`);
      } catch (error) {
        console.error(`Error indexing ${filePath} in ${collectionName}:`, error);
      }
    }
  }
}

function getCollectionNameFromPath(filePath) {
  const relativePath = path.relative('src/content/docs', filePath);
  const topLevelFolder = relativePath.split(path.sep)[0];
  
  switch (topLevelFolder) {
    case 'admin':
      return 'docs_admin';
    case 'klient':
      return 'docs_klient';
    case 'realizator':
      return 'docs_realizator';
    case 'spolka':
      return 'docs_spolka';
    default:
      throw new Error(`Unknown folder: ${topLevelFolder}`);
  }
}

initializeTypesense();