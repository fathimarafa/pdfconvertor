export const BankAccountRegistrtaionMetadata = {
    "moduleId": "bankaccountregistrtaion",
    "moduleName": "Bank Account Registrtaion",
    "displayName": "Basic / Bank Account Registrtaion",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/Bank",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'bankName',
            "displayName": 'Bank Name'
        },
        {
            "field": 'branchName',
            "displayName": 'Branch Name'
        },
        {
            "field": 'currentBalance',
            "displayName": 'Balance'
        },
        {
            "field": 'ifsCode',
            "displayName": 'IFSC'
        },
        {
            "field": 'isOD',
            "displayName": 'OD Account'
        },
        {
            "field": 'minimumBalance',
            "displayName": 'Minimum Balance'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "bankName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Bank Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "branchName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Branch Name",
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "city",
                    "type": "input",
                    "templateOptions": {
                        "label": "City",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "ifsCode",
                    "type": "input",
                    "templateOptions": {
                        "label": "IFSC",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "micr_Code",
                    "type": "input",
                    "templateOptions": {
                        "label": "MICR",
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "accountNo",
                    "type": "input",
                    "templateOptions": {
                        "label": "Account No",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "accountTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Account Type",
                        "required": true,
                        "options": [
                            {
                                "label": "Current account",
                                "value": 1
                            },
                            {
                                "label": "Savings account",
                                "value": 2
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "key": "isOD",
                    "type": "checkbox",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "OD"
                    }
                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "minimumBalance",
                    "type": "input",
                    "templateOptions": {
                        "label": "Minimum Balance",
                        "required": true,
                        "type":"number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "balanceType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Balance Type",
                        "required": true,
                        "options": [
                            {
                                "label": "Debit",
                                "value": "D"
                            },
                            {
                                "label": "Credit",
                                "value": "C"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "currentBalance",
                    "type": "input",
                    "templateOptions": {
                        "label": "Current Balance",
                        "required": true,
                        "type":"number"
                    }
                }
            ]
        }
    ]
}