export function generateSidebar(userRole: string) {
  const allSidebarItems = [
    {
      label: 'Admin',
      items: [
        { label: 'Admin test', href: '/admin/testowy' },
      ],
    },
    {
      label: 'Spółka',
      items: [
        { label: 'Spółka Guide', href: '/spolka/testowy' },
      ],
    },
    {
      label: 'Realizator',
      items: [
        { label: 'Realizator Guide', href: '/realizator/testowy' },
      ],
    },
    {
      label: 'Klient',
      items: [
        { label: 'Klient Guide', href: '/klient/testowy' },
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
