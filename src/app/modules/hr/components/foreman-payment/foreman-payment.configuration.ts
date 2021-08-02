export const ForemanPaymentMetadata = {
    "moduleId": "foremanpayment",
    "moduleName": "ForemanPayment",
    "displayName": "HR / Foreman Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint":  "BuildExeHR/api/ForemanPayment",
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
            "displayName": 'Foreman Name'
        },
        {
            "field": 'dateFrom',
            "displayName": 'From'
        },
        {
            "field": 'dateTo',
            "displayName": 'To'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields":  [
    {
        "id": "row-1",
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
                "className": "flex-1",
                "key": "paymentAmount",
                "type": "input",
                "templateOptions": {
                    "label": "Paying Amount",
                    "required": true,
                    "type": "number"
                },
                "expressionProperties": {
                    "templateOptions.disabled": "!model.isSiteManager",
                },
            },
            {
                "className": "flex-1",
                "key": "contractorPaymentId",
                "type": "select",
                "templateOptions": {
                    "label": "Select Bank Name",
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
        "id": "row-3",
        "fieldGroupClassName": "display-flex",
        "fieldGroup": [
    {
        "className": "flex-1",
        "key": "id",
        "type": "select",
        "templateOptions": {
            "label": "Select Site Manager",
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
                "type": "input",
                "key": "discountAmount",
                "templateOptions": {
                    "label": "Site Balance",
                    "required": true
                },
                "expressionProperties": {
                    "templateOptions.disabled": "!model.isSiteManager",
                },
            },
            {
                "className": "flex-1",
                "key": "paymentDate",
                "type": "datepicker",
                "templateOptions": {
                    "label": "Cheque Date",
                    "required": true
                }
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
                    "rows": 6
                }
            }
        ]
    }
],
    "foremanForPayment": {
        "tableColumns": [
            {
                "field": 'contractorPaymentDetailsId',
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
                "field": 'totalWage',
                "displayName": 'Work Order'
            },
            {
                "field": 'discountAmount',
                "displayName": 'Previous Balance'
            },
            {
                "field": 'paymentAmount',
                "displayName": 'Total Wage'
            },
            {
                "field": 'paymentAmoun',
                "displayName": 'Total OTHrs'
            },
            {
                "field": 'paymentAmou',
                "displayName": 'Total OTAmt'
            },
            {
                "field": 'paymentAmo',
                "displayName": 'Total WorkOrder Amt'
            },
            {
                "field": 'paymentAm',
                "displayName": 'Advance Amount'
            },
            {
                "field": 'paymentA',
                "displayName": 'Grand Total'
            },
            {
                "field": 'paymemount',
                "displayName": 'Paying Amount'
            },
            {
                "field": 'pntAmount',
                "displayName": 'Discount'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            },
            // {
            //     "field": 'action',
            //     "displayName": 'Action'
            // }
        ],
        "formFields": [
          
                    {
                "id": "row-1",
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
                        "className": "flex-1",
                        "type": "select",
                        "key": "employeeId",
                        "templateOptions": {
                            "label": "",
                            "options": [],
                            "required": true
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "!model.isSiteManager",
                        },
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "dateFrom",
                        "templateOptions": {
                            "label": "From",
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
                        "type": "select",
                        "key": "id",
                        "templateOptions": {
                            "label": "Foreman Name",
                            "options": [],
                            "required": true
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.isSiteManager",
                        },
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "dateTo",
                        "templateOptions": {
                            "label": "To",
                            "required": true
                        }
                    }
        ]
    }
            
        ]
    }

    }