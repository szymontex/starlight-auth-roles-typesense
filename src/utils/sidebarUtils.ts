export function generateSidebar(userRole: string) {
  const allSidebarItems = [
    {
      label: 'Admin Panel',
      entries: [
        { label: 'Admin test', href: '/admin/testowy' },
      ],
    },
    {
      label: 'Spółka',
      entries: [
        { label: 'Spółka Guide', href: '/spolka/testowy' },
      ],
    },
    {
      label: 'Realizator',
      entries: [
        { label: 'Realizator Guide', href: '/realizator/testowy' },
      ],
    },
    {
      label: 'Klient',
      entries: [
        { label: 'Klient Guide', href: '/klient/testowy' },
      ],
    },
  ];

  console.log('generateSidebar userRole:', userRole);

  switch (userRole) {
    case 'admin':
      console.log('Returning admin sidebar');
      return allSidebarItems;
    case 'spolka':
      console.log('Returning spolka sidebar');
      return allSidebarItems.slice(1);
    case 'realizator':
      console.log('Returning realizator sidebar');
      return allSidebarItems.slice(2);
    case 'klient':
    default:
      console.log('Returning klient sidebar');
      return allSidebarItems.slice(3);
  }
}