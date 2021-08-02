export const DashboardMetadata = {
  moduleId: 'dashboard',
  moduleName: 'Dashboard',
  displayName: 'Dashboard',
  hasAddNew: false,
  hasEdit: false,
  hasDelete: false,
  useMultiStepForm: false,
  serviceEndPoint: 'BuildExeBasic/api/Alert',
  tableColumns: [
    {
      field: 'alertMesssage',
      displayName: 'Name',
    },
    {
      field: 'action',
      displayName: 'Action',
    },
  ],
};
