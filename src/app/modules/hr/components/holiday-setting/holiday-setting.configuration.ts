export const HolidaySettingMetadata = {
  moduleId: 'holidaySetting',
  moduleName: 'Holiday Setting',
  displayName: 'Build / Working Hours Setting',
  hasAddNew: true,
  hasEdit: true,
  hasDelete: true,
  useMultiStepForm: false,
  serviceEndPoint: 'BuildExeHR/api/Holiday',
  tableColumns: [
    {
      field: 'date',
      displayName: 'date',
    },
    {
      field: 'day',
      displayName: 'day',
    },
    {
      field: 'desc',
      displayName: 'Description',
    },
    {
      field: 'description',
      displayName: 'Time Out',
    },
    {
      field: 'leave',
      displayName: 'Leave',
    },
    {
      field: 'action',
      displayName: 'Action',
    },
  ],
  formFields: [
    {
      key: 'financial_year_id',
      type: 'select',
      templateOptions: {
        label: 'Select Financial Year',
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
        required: true,
      },
    },
    {
      type: 'input',
      key: 'company_id',
      templateOptions: {
        label: 'Select Company',
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
        required: true,
      },
    },
    {
      type: 'input',
      key: 'BranchId',
      templateOptions: {
        label: 'Select Branch',
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
        required: true,
      },
    },
    {
      type: 'datepicker',
      key: 'date',
      templateOptions: {
        label: 'Date',
        required: true,
      },
    },
    {
      type: 'input',
      key: 'description',
      templateOptions: {
        label: 'Description',
        required: true,
      },
    },
  ],
};
