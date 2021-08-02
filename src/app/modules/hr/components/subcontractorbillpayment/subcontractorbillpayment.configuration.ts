export const SubcontractorPaymentMetadata = {
    "moduleId": " SubcontractorPayment",
    "moduleName": " SubcontractorPayment",
    "displayName": "HR /SubcontractorPayment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubcontractorPayment",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'employeeId',
            "displayName": 'Subcontractor Name'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
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
                // {
                //     "className": "flex-1",
                //     "type": "select",
                //     "key": "employeeId",
                //     "templateOptions": {
                //         "label": "SubContractor Name",
                //         "required": true
                //     }
                // },   
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "paymentDate",
                    "templateOptions": {
                        "label": "Paying Date",
                        "required": true
                    }
                },
               
            ]
        },
        {
            "id": "row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 checkbox-outline-none",
                            "type": "checkbox",
                            "key": "isBranch",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Site Manager",
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "paymentModeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Sitemanager manager",
                                "required": true,
                                "options": [   
                                ]
                            },
                            "expressionProperties": {
                                "templateOptions.disabled": "!model.isBranch",
                        }
                    }, 
                            {
                                "className": "flex-1",
                                "key": "paymentNo",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Sitemanager Balance",
                                    "required": true,
                                    "options": [
                                       
                                    ]
                                },
                                "expressionProperties": {
                                    "templateOptions.disabled": "!model.isBranch",
                            }
                        },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "withClear",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "With Clear",
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
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "paymentdetails",
                    "templateOptions": {
                        "label": "Amount",
                        "required": true,
                        "rows": 11
                    }
                },
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentMode",
                    "templateOptions": {
                        "label": "Payment Mode",
                        "options": [
                            {
                                "label": "CASH",
                               
                                "value": 0,
                            },
                            {
                                "label": "Cheque or DD",
                               
                                "value": 1,
                            },
                            
                           
                        ],
                        "required": true,
                        "rows": 5
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentModeId",
                    "templateOptions": {
                        "label": "Bank",
                        "required": true,
                        "rows": 5,
                        
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.paymentMode",
                 }
                },
            
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "onlinePayment",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Online Payment",
                    }
                },
                
            ]
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "chequeClearenceID",
                    "templateOptions": {
                        "label": "Cheque/DD No",
                        "required": true,
                        "rows": 5
                    },
                  
                     "expressionProperties": {
                        "templateOptions.disabled": "!model.paymentMode",
                 }
                },

                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "paymentDate",
                    "templateOptions": {
                        "label": "Cheque Date",
                        "required": true,
                        "rows": 5
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.paymentMode",
                 }

                },
                
                
            ]
        }
       
    ],
    "subContractorPaymentDetails": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'billDate',
                "displayName": 'Date'
            },
            {
                "field": 'projectId',
                "displayName": 'Project'
            },
            {
                "field": 'unitId',
                "displayName": 'Unit'
            },
            {
                "field": 'billno',
                "displayName": 'Bill No'
            },
            {
                "field": 'billAmount',
                "displayName": 'Net Amount'
            },
            {
                "field": 'billAmountBalance',
                "displayName": 'Discount'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],    
}

}