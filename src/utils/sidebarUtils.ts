import type { SidebarEntry } from '@astrojs/starlight/utils/navigation'; // Upewnij się, że masz odpowiedni import

export function generateSidebar(userRole: string): SidebarEntry[] {
  const allSidebarItems: SidebarEntry[] = [
    {
      type: 'group',
      label: 'Admin',
      entries: [
        {
          type: 'link',
          label: 'Admin test',
          href: '/admin/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {}
        }
      ],
      collapsed: false,
      badge: undefined
    },
    {
      type: 'group',
      label: 'Spółka',
      entries: [
        {
          type: 'link',
          label: 'Spółka Guide',
          href: '/spolka/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {}
        }
      ],
      collapsed: false,
      badge: undefined
    },
    {
      type: 'group',
      label: 'Realizator',
      entries: [
        {
          type: 'link',
          label: 'Realizator Guide',
          href: '/realizator/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {}
        }
      ],
      collapsed: false,
      badge: undefined
    },
    {
      type: 'group',
      label: 'Klient',
      entries: [
        {
          type: 'link',
          label: 'Klient Guide',
          href: '/klient/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {}
        }
      ],
      collapsed: false,
      badge: undefined
    },
  ];

  console.log('utils/sidebarUtils.ts UserRole:', userRole);
  switch (userRole) {
    case 'admin':
      return allSidebarItems;
    case 'spolka':
      return allSidebarItems.filter(item => item.label !== 'Admin');
    case 'realizator':
      return allSidebarItems.filter(item => item.label !== 'Admin' && item.label !== 'Spółka');
    case 'klient':
      return allSidebarItems.filter(item => item.label === 'Klient');
    default:
      return [];
  }
}
