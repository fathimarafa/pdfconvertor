export const ContractorPaymentMetadata = {
    "moduleId": "contractorpayment",
    "moduleName": "ContractorPayment",
    "displayName": "HR / Contractor Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ContractorPayment",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'fullName',
            "displayName": 'Contractor'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Paid Date'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
       /* {
            "field": 'paymentAmount',
            "displayName": 'Paying Amount'
        },
        {
            "field": 'voucherNumber',
            "displayName": 'Bank Name'
        },
        {
            "field": 'employeeId',
            "displayName": 'Site Manager'
        },
        {
            "field": 'chequeClearenceID',
            "displayName": 'Cheque No'
        },
        {
            "field": 'paymentNo',
            "displayName": 'Site Balance'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Cheque Date'
        },*/
        {
            "field": 'remarks',
            "displayName": 'Description'
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
                    "key": "employeeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Contractor",
                        "required": true,
                        "options": []
                        
                    }
                },
               
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "is-siteManager checkbox-outline-none",
                    "type": "checkbox",
                    "key": "isSiteManager",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Site Manager",
                    }
                },
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "paymentModeId",
                    "type": "select",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Site Manager",
                        "required": true,
                        "options": []
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isSiteManager",
                    },
                    
                },
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "balance",
                    "type": "input",
                    "templateOptions": {
                        "label": "Site balance",
                        "required": true,
                        "type": "number"
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isSiteManager",
                    },
                    
                },
            ]
            
        },
       
    ],
    "contractorPaymentDetails": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'Id'
            },
            {
                "field": 'projectId',
                "displayName": 'Project Id'
            },
            {
                "field": 'unitId',
                "displayName": 'Unit Id'
            },
            {
                "field": 'billAmount',
                "displayName": 'Amount'
            },
            {
                "field": 'billAmountBalance',
                "displayName": 'Balance'
            },
            {
                "field": 'payment',
                "displayName": 'Paying Amount'
            },
            {
                "field": 'action',
                "displayName": 'action'
            }
        ],
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "paymentDate",
                        "type": "datepicker",
                        "templateOptions": {
                            "label": "Paid Date",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "paymentMode",
                        "templateOptions": {
                            "label": "Payment Mode",
                            "options": [
                                {
                                    "label": "CASH",
                                    "value": 1
                                },
                                {
                                    "label": "BANK",
                                    "value": 0
                                },
                                // {
                                //     "label": "SITE MANAGER",
                                //     "value": 2
                                // }
                            ],
                            "required": true
                        },
                        // "expressionProperties": {
                        //     "templateOptions.disabled": "model.isSiteManager",
                        // },
                        "hideExpression": "model.isSiteManager",

                    },
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "paymentMode",
                        "templateOptions": {
                            "label": "Payment Mode",
                            "options": [
                               
                                {
                                    "label": "SITE MANAGER",
                                    "value": 2
                                }
                            ],
                            "required": true
                        },
                        // "expressionProperties": {
                        //     "templateOptions.disabled": "model.isSiteManager",
                        // },
                        "hideExpression": "!model.isSiteManager",

                    },
                    {
                        "className": "flex-1 checkbox-outline-none",
                        "type": "checkbox",
                        "key": "WithClear",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "With Clear"
                        }
                    }
                ]
            },
            {
                "id": "row-2",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "paymentAmount",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Paying Amount",
                            // "required": true,
                            // "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "paymentModeId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Bank Name",
                            "required": true,
                            "options": []
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.paymentMode",
                        },
                        
                    },
                   
                ]
            },
            {
                "id": "row-4",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                {
                        "className": "flex-1",
                        "type": "input",
                        "key": "paymentNo",
                        "templateOptions": {
                            "label": "Cheque No",
                            "required": true
                    },
                    "expressionProperties": {
                    "templateOptions.disabled": "model.paymentMode",
                    },
                },
                {
                "className": "flex-1",
                "type": "datepicker",
                "key": "chequeDate",
                "templateOptions": {
                    "label": "Cheque Date",
                    "required": true
                },
                "expressionProperties": {
                    "templateOptions.disabled": "model.paymentMode",
                },
                },
            
            
            ]
            },
            {
                "id": "row-5",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "textarea",
                        "key": "remarks",
                        "templateOptions": {
                            "label": "Remarks",
                            "required": true,
                            "rows": 1
                        }
                    },
                ]
            },
        ]
    }

}