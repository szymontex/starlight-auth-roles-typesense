import type { SidebarEntry } from '../../node_modules/@astrojs/starlight/utils/navigation';
type StarlightSidebarItem = { label: string; items: { label: string; link: string }[] };

export function generateSidebar(userRole: string): StarlightSidebarItem[] {
  const allSidebarItems: StarlightSidebarItem[] = [
    {
      label: 'Admin',
      items: [
        { label: 'Admin test', link: '/admin/testowy' },
        { label: 'Admin testcopy', link: '/admin/testowycopy' },
      ],
    },
    {
      label: 'Spółka',
      items: [
        { label: 'Spółka Guide', link: '/spolka/testowy' },
      ],
    },
    {
      label: 'Realizator',
      items: [
        { label: 'Realizator Guide', link: '/realizator/testowy' },
      ],
    },
    {
      label: 'Klient',
      items: [
        { label: 'Klient Guide', link: '/klient/testowy' },
        { label: 'Klient Guide', link: '/klient/testowycopy' },
      ],
    },
  ];

  console.log('utils/sidebarUtils.ts UserRole:', userRole);
  
  let filteredSidebar: StarlightSidebarItem[];
  
  switch (userRole) {
    case 'admin':
      filteredSidebar = allSidebarItems;
      break;
    case 'spolka':
      filteredSidebar = allSidebarItems.filter(item => item.label !== 'Admin');
      break;
    case 'realizator':
      filteredSidebar = allSidebarItems.filter(item => item.label !== 'Admin' && item.label !== 'Spółka');
      break;
    case 'klient':
      filteredSidebar = allSidebarItems.filter(item => item.label === 'Klient');
      break;
    default:
      filteredSidebar = [];
  }

  return filteredSidebar.length > 0 ? filteredSidebar : [{ label: 'Menu', items: [] }];
}
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
// Dodaj nową funkcję konwertującą
export function convertToStarlightSidebar(sidebar: StarlightSidebarItem[]): any[] {
  return sidebar.map(group => ({
    label: group.label,
    items: group.items.map(item => ({
      label: item.label,
      link: item.link
    }))
  }));
}