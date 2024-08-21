console.log('utils/sidebarUtils.ts');

export function generateSidebar(userRole: string, currentPathname: string) {
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
      label: 'Admin Group',
      items: [
        { link: '/admin/testowy', label: 'Admin test' },
        // Add more links here...
      ],
    },
    // Add more groups or individual links here...
  ];
  
  return allSidebarItems;
}