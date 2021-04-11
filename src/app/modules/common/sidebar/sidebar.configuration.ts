import { CrmSideNavbar } from '../../crm/crm.sidenavbar';
import { BasicSideNavbar } from '../../basic/basic.sidenavbar';
import { HrSideNavbar } from '../../hr/hr.sidenavbar';
import { MaterialSideNavbar } from '../../material/material.sidenavbar';
import { PrebudgetSideNavbar } from '../../prebudget/prebudget.sidenavbar';

export const SideNavigationMenu: ISideNavigationMenuItem[] = [
    {
        displayName: 'Master',
        navLink: '/company',
        showSubItem: true,
        subItem: [
            CrmSideNavbar,
            MaterialSideNavbar,
            BasicSideNavbar,
            HrSideNavbar,
            PrebudgetSideNavbar
        ]
    },
    {
        displayName: 'Pre-budgeting',
        navLink: '/designation',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'HR and Labour',
        navLink: '/home',
        showSubItem: false,
        subItem: [
            {
                displayName: 'General',
                navLink: '/home',
                showSubItem: false,
                subItem: []
            },
            {
                displayName: 'Recruitment',
                navLink: '/home',
                showSubItem: false,
                subItem: []
            },
            {
                displayName: 'Payrol',
                navLink: '/home',
                showSubItem: false,
                subItem: []
            }
        ]
    },
    {
        displayName: 'Accounts',
        navLink: '/home',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'User Management',
        navLink: '/home',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Backup',
        navLink: '/home',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Document Management',
        navLink: '/home',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Settings',
        navLink: '/home',
        showSubItem: false,
        subItem: []
    },
    {
        displayName: 'Calculator',
        navLink: '/home',
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
