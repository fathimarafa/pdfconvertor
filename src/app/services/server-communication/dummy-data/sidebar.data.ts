export const SideNavigationMenu: ISideNavigationMenuItem[] = [
    {
        displayName: 'Master',
        navLink: '/company',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Pre-budgeting',
        navLink: '/designation',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'CRM',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: [
            {
                displayName: 'Enquiry',
                navLink: '/dashboard',
                showSubItem: false,
                subItem: [
                    {
                        displayName: 'Enquiry',
                        navLink: '/enquiry',
                        showSubItem: false,
                        subItem: []
                    },
                    {
                        displayName: 'Followup',
                        navLink: '/followup',
                        showSubItem: false,
                        subItem: []
                    }
                ]
            }
        ]
    },
    {
        displayName: 'Material',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'HR and Labour',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: [
            {
                displayName: 'General',
                navLink: '/dashboard',
                showSubItem: false,
                subItem: []
            },
            {
                displayName: 'Recruitment',
                navLink: '/dashboard',
                showSubItem: false,
                subItem: []
            },
            {
                displayName: 'Payrol',
                navLink: '/dashboard',
                showSubItem: false,
                subItem: []
            }
        ]
    },
    {
        displayName: 'Accounts',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'User Management',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Backup',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Document Management',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Settings',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Calculator',
        navLink: '/dashboard',
        showSubItem: false,
        subItem: []
    }
]

export interface ISideNavigationMenuItem {
    id?: string;
    displayName?: string;
    navLink?: string;
    showSubItem?: boolean;
    subItem?: ISideNavigationMenuItem[]
}
