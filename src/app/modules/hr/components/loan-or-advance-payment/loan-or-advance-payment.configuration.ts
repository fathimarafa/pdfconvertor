export const LoanOrAdvancePaymentMetaData = {
  moduleId: '',
  moduleName: 'Loan or Advance Payment',
  displayName: 'HR / Loan or Advance Payment',
  hasAddNew: true,
  hasEdit: true,
  hasDelete: true,
  useMultiStepForm: false,
  serviceEndPoint: 'BuildExeHR/api/LabourAdvanceMaster',
  tableColumns: [
    {
      field: 'id',
      displayName: 'Id No',
    },
    {
      field: 'date',
      displayName: 'Given Date',
    },
    {
      field: 'paymentModeNo',
      displayName: 'Cheque/DD No',
    },
    {
      field: 'remarks',
      displayName: 'Description',
    },
    {
      field: 'paymentMode',
      displayName: 'Cash/Bank',
    },
    {
      field: 'advanceAmount',
      displayName: 'Amount',
    },
    {
      field: 'employeeId',
      displayName: 'EmployeeName',
    },
    {
      field: 'action',
      displayName: 'Action',
    },
  ],
  formFields: [
    {
      key: 'paymentType',
      type: 'radio',
      templateOptions: {
        label: 'Type',
        required: true,
        options: [
          { value: 'LOAN', label: 'Loan' },
          { value: 'ADVANCE', label: 'Advance' },
        ],
      },
    },
    {
      key: 'categoryId', //
      type: 'select',
      id: 'designationId',
      templateOptions: {
        label: 'Designation',
        options: [],
        required: true,
      },
    },
    {
      type: 'input',
      key: 'paymentModeNo',
      templateOptions: {
        label: 'Cheque/DDNo',
        required: false,
        disabled: true,
      },
    },
    {
      key: 'employeeId',
      id: 'employeeId',
      type: 'select',
      templateOptions: {
        label: 'Employee',
        options: [],
        required: true,
      },
    },
    {
      type: 'datepicker',
      key: 'date', //
      templateOptions: {
        label: 'Cheque Date',
        required: true,
      },
    },
    {
      type: 'datepicker',
      key: 'date', //
      templateOptions: {
        label: 'Payment Date',
        required: true,
      },
    },
    {
      key: 'paymentMode',
      type: 'radio',
      templateOptions: {
        label: 'Payment Mode',
        required: true,
        options: [
          { value: 'CASH', label: 'CASH' },
          { value: 'BANK', label: 'BANK' },
        ],
      },
    },

    {
      type: 'input',
      key: 'remarks',
      templateOptions: {
        label: 'Description',
        required: true,
      },
    },
    {
      type: 'checkbox',
      key: 'withclear',
      templateOptions: {
        label: 'With Clear',
        required: false,
        disabled: false,
      },
    },
    {
      key: 'paymentModeId', //
      id: 'paymentModeId', //
      type: 'select',
      templateOptions: {
        label: 'Bank Name',
        options: [],
        required: true,
      },
    },
    {
      type: 'input',
      key: 'advanceAmount',
      templateOptions: {
        label: 'Amount',
        required: true,
        type: 'number',
      },
    },
    {
      type: 'input',
      key: 'approvalRemarks',
      templateOptions: {
        label: '',
      },
      hideExpression: true,
    },
  ],
};
