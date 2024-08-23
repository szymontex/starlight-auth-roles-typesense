import type { SidebarEntry } from 'C:/IT/astro/starlight/flightstarlight/node_modules/@astrojs/starlight/utils/navigation.ts';

export function generateSidebar(userRole: string): SidebarEntry[] {
  const allSidebarItems: SidebarEntry[] = [
    {
      type: 'group',
      label: 'Admin',
      collapsed: false,
      badge: undefined,
      entries: [
        {
          type: 'link',
          label: 'Admin test',
          href: '/admin/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
        {
          type: 'link',
          label: 'Admin testcopy',
          href: '/admin/testowycopy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Spółka',
      collapsed: false,
      badge: undefined,
      entries: [
        {
          type: 'link',
          label: 'Spółka Guide',
          href: '/spolka/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Realizator',
      collapsed: false,
      badge: undefined,
      entries: [
        {
          type: 'link',
          label: 'Realizator Guide',
          href: '/realizator/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Klient',
      collapsed: false,
      badge: undefined,
      entries: [
        {
          type: 'link',
          label: 'Klient Guide',
          href: '/klient/testowy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
        {
          type: 'link',
          label: 'Klient Guide',
          href: '/klient/testowycopy',
          isCurrent: false,
          badge: undefined,
          attrs: {
            class: 'some-class',
          },
        },
      ],
    },
  ];

  console.log('utils/sidebarUtils.ts UserRole:', userRole);
  
  switch (userRole) {
    case 'admin':
      return allSidebarItems; // Return all items

    case 'spolka':
      return allSidebarItems.filter(item => item.label !== 'Admin'); // Return all except Admin

    case 'realizator':
      return allSidebarItems.filter(item => item.label !== 'Admin' && item.label !== 'Spółka'); // Return all except Admin and Spółka

    case 'klient':
      return allSidebarItems.filter(item => item.label === 'Klient'); // Return only Klient

    default:
      return []; // Return empty array if userRole doesn't match any case
  }
}
