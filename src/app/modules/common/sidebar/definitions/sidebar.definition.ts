export interface SidebarMenu {
    id?: number;
    menuId?: number;
    menuName?: string;
    component?: string;
    rootlevel?: number;
    rootMenuId?: number;
    moduleId?: number;
    haveApprovalLevel?: number;
    isActive?: number;
    navLink?: string;
    subItem?: SidebarMenu[];
    showSubItem?: boolean;
}