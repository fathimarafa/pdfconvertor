export const EmployeeDesignationRegistrationMetadata = {
  moduleId: 'employeedesignationregistration',
  moduleName: 'Employee Designation Registration',
  displayName: 'Build / Employee Designation Registration',
  hasAddNew: true,
  hasEdit: true,
  hasDelete: true,
  useMultiStepForm: false,
  serviceEndPoint: 'BuildExeHR/api/EmployeeDesignation',
  tableColumns: [
    {
      field: 'employeeDesignationId',
      displayName: 'S.No',
    },
    {
      field: 'employeeCategoryId',
      displayName: 'Category',
    },
    {
      field: 'employeeDesignationName',
      displayName: 'Designation',
    },
    {
      field: 'description',
      displayName: 'Description',
    },
    {
      field: 'action',
      displayName: 'Action',
    },
  ],
  formFields: [
    {
      key: 'employeeCategoryId',
      type: 'select',
      templateOptions: {
        label: 'Select Category',
        options: [
          {
            label: 'type 1',
            value: 'type 1',
          },
          {
            label: 'type 2',
            value: 'type 2',
          },
          {
            label: 'type 3',
            value: 'type 3',
          },
        ],
      },
    },
    {
      type: 'input',
      key: 'employeeDesignationName',
      templateOptions: {
        label: 'Designation',
        required: true,
      },
    },
    {
      type: 'textarea',
      key: 'description',
      templateOptions: {
        label: 'Description',
        required: true,
        rows: 10,
      },
    },
    {
      className: 'hide-matcheckbox-outline',
      type: 'checkbox',
      key: 'marketing',
      templateOptions: {
        label: 'Marketing',
        required: true,
      },
    },
  ],
};
