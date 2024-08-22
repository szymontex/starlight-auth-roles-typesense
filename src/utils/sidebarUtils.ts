console.log('utils/sidebarUtils.ts');

export function generateSidebar(userRole: string) {
  // const allSidebarItems = [
  //   {
  //     label: 'Admin Panel',
  //     entries: [
  //       { label: 'Admin test', href: '/admin/testowy' },
  //     ],
  //   },
  //   {
  //     label: 'Spółka',
  //     entries: [
  //       { label: 'Spółka Guide', href: '/spolka/testowy' },
  //     ],
  //   },
  //   {
  //     label: 'Realizator',
  //     entries: [
  //       { label: 'Realizator Guide', href: '/realizator/testowy' },
  //     ],
  //   },
  //   {
  //     label: 'Klient',
  //     entries: [
  //       { label: 'Klient Guide', href: '/klient/testowy' },
  //     ],
  //   },
  // ];
  const allSidebarItems = [
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
        },
        {
          type: 'link',
          label: 'Admin testcopy',
          href: '/admin/testowycopy',
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
        },
        {
          type: 'link',
          label: 'Klient Guide',
          href: '/klient/testowycopy',
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
      return allSidebarItems; // Zwraca wszystkie elementy

    case 'spolka':
      return allSidebarItems.filter(item => item.label !== 'Admin'); // Zwraca wszystkie bez Admin

    case 'realizator':
      return allSidebarItems.filter(item => item.label !== 'Admin' && item.label !== 'Spółka'); // Zwraca wszystkie bez Admin i Spółka

    case 'klient':
      return allSidebarItems.filter(item => item.label === 'Klient'); // Zwraca tylko Klient

    default:
      return []; // W razie gdyby userRole nie pasował do żadnego z powyższych
  }
}