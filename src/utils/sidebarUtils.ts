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
      label: 'Admin',
      items: [
        { link: '/admin/testowy', label: 'Admin test' },
      ],
    },
    {
      label: 'Spółka',
      items: [
        { link: '/spolka/testowy', label: 'Spółka Guide' },
      ],
    },
    {
      label: 'Realizator',
      items: [
        { link: '/realizator/testowy', label: 'Realizator Guide' },
      ],
    },
    {
      label: 'Klient',
      items: [
        { link: '/klient/testowy', label: 'Klient Guide' },
      ],
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