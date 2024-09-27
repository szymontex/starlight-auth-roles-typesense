import type { SidebarEntry } from '@astrojs/starlight/utils/navigation';
type StarlightSidebarItem = { label: string; items: { label: string; link: string }[] };

// Function to generate sidebar based on user role
export function generateSidebar(userRole: string): StarlightSidebarItem[] {
  const allSidebarItems: StarlightSidebarItem[] = [
    {
      label: 'Admin',
      items: [
        { label: 'System Overview', link: '/admin/system-overview' },
        { label: 'User Management', link: '/admin/user-management' },
        { label: 'Server Configuration', link: '/admin/server-configuration' },
        { label: 'Security Policies', link: '/admin/security-policies' },
      ],
    },
    {
      label: 'Company',
      items: [
        { label: 'Company Guidelines', link: '/company/guidelines' },
        { label: 'Project Management', link: '/company/project-management' },
        { label: 'Financial Reporting', link: '/company/financial-reporting' },
      ],
    },
    {
      label: 'Editor',
      items: [
        { label: 'Content Creation', link: '/editor/content-creation' },
        { label: 'Media Management', link: '/editor/media-management' },
        { label: 'Style Guide', link: '/editor/style-guide' },
      ],
    },
    {
      label: 'Guest',
      items: [
        { label: 'Getting Started', link: '/guest/getting-started' },
        { label: 'FAQs', link: '/guest/faqs' },
        { label: 'Support', link: '/guest/support' },
        { label: 'Markdown Capabilities', link: '/guest/markdown' },
      ],
    },
  ];

  console.log('utils/sidebarUtils.ts UserRole:', userRole);
  
  let filteredSidebar: StarlightSidebarItem[];
  
  switch (userRole) {
    case 'admin':
      filteredSidebar = allSidebarItems;
      break;
    case 'companyMember':
      filteredSidebar = allSidebarItems.filter(item => item.label !== 'Admin');
      break;
    case 'editor':
      filteredSidebar = allSidebarItems.filter(item => item.label !== 'Admin' && item.label !== 'Company');
      break;
    case 'guest':
      filteredSidebar = allSidebarItems.filter(item => item.label === 'Guest');
      break;
    default:
      filteredSidebar = [];
  }

  return filteredSidebar.length > 0 ? filteredSidebar : [{ label: 'Menu', items: [] }];
}

// Function to convert StarlightSidebarItem to SidebarEntry format
export function convertToSidebarEntry(items: StarlightSidebarItem[]): SidebarEntry[] {
  return items.map(group => ({
    type: 'group',
    label: group.label,
    entries: group.items.map(item => ({
      type: 'link',
      label: item.label,
      href: item.link,
      isCurrent: false,
      badge: undefined,
      attrs: {}
    })),
    collapsed: false,
    badge: undefined
  }));
}

// Function to convert to basic sidebar format
export function convertToStarlightSidebar(sidebar: StarlightSidebarItem[]): any[] {
  return sidebar.map(group => ({
    label: group.label,
    items: group.items.map(item => ({
      label: item.label,
      link: item.link
    }))
  }));
}
