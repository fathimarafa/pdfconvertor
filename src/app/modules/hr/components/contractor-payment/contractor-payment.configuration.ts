export const ContractorPaymentMetadata = {
    "moduleId": "contractorpayment",
    "moduleName": "ContractorPayment",
    "displayName": "HR / Contractor Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint":  "BuildExeHR/api/ContractorPayment",
    /*{
        "contractorPayment": "BuildExeHR/api/ContractorPayment",
        "contractorWorkOrder": "BuildExeHR/api/ContractorWorkOrder"
    },
    */
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'employeeId',
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
    "formFields":  [
       
],
    "contractorForPayment": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'CNo'
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
                        "key": "employeeId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Contractor",
                            "required": true,
                            "options": []
                            
                        }
                    },
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
                        "key": "paymentMode",
                        "type": "select",
                        "templateOptions": {
                            "label": "Payment Mode",
                            "required": true,
                            "options": [
                                {
                                    "label": "Cash/DD",
                                    "value": 0
                                },
                                {
                                    "label": "Cheque",
                                    "value": 1
                                }
                            ]
                        }
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
                        "className": "is-siteManager checkbox-outline-none",
                        "type": "checkbox",
                        "key": "isSiteManager",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Site Manager",
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "key": "paymentAmount",
                        "defaultValue": 0,
                        "type": "input",
                        "templateOptions": {
                            "label": "Paying Amount",
                            "required": true,
                            "type": "number",
                            "readonly" : true
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
                            "templateOptions.disabled": "!model.paymentMode",
                        },
                        
                    },
                    
                ]
                
            },
            {
                "id": "row-3",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
            {
                "className": "flex-1",
                "key": "id",
                "type": "select",
                "templateOptions": {
                    "label": "Site Manager",
                    "required": true,
                    "options": []
                },
                "expressionProperties": {
                    "templateOptions.disabled": "!model.isSiteManager",
                },
                
            },
            {
                "className": "flex-1",
                "type": "input",
                "key": "chequeClearenceID",
                "templateOptions": {
                    "label": "Cheque No",
                    "required": true
                },
                        "expressionProperties": {
                            "templateOptions.disabled": "!model.paymentMode",
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
        "key": "discountAmount",
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
    {
        "className": "flex-1",
        "type": "datepicker",
        "key": "paymentDate",
        "templateOptions": {
            "label": "Cheque Date",
            "required": true
        },
        "expressionProperties": {
            "templateOptions.disabled": "!model.paymentMode",
        },
    },
    
    
]
},
{
    "id": "row-5",
    "fieldGroupClassName": "display-flex",
    "fieldGroup": [
 {
                        "className": "flex-2",
                        "key": "remarks",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Description",
                            "required": true,
                            "rows": 1
                        }
                    },
    ]
}
            
        ]
    }

    }