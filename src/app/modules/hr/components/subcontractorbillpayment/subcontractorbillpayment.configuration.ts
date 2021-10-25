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
            "field": 'fullName',
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
            "field": 'paymentdetails',
            "displayName": 'Payment Details'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        // {
        //     "id": "row-0",
        //     "fieldGroupClassName": "display-flex",
        //     "fieldGroup": [
        //         {
        //             "className": "is-siteManager checkbox-outline-none",
        //             "type": "checkbox",
        //             "key": "isSiteManager",
        //             "defaultValue": 0,
        //             "templateOptions": {
        //                 "label": "Site Manager",
        //             }
        //         },
        //     ]
        // },
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "employeeId",
                    "templateOptions": {
                        "label": "Subcontractor Name",
                        "options": [],
                        "required": true
                    },
                    // "expressionProperties": {
                    //     "templateOptions.disabled": "model.isSiteManager",
                    // },
                },
                {
                    "className": "flex-1",
                    "key": "paymentModeId",
                    "type": "select",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Sitemanager manager",
                        // "required": true,
                        "options": [   
                        ]
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isBranch",
                },
              }, 
            
                    {
                        "className": "flex-1",
                        "key": "sitemanager balance",
                        "type": "input",
                        "templateOptions": {
                            "label": "Sitemanager Balance",
                            "required": true,
                            "options": [
                               
                            ]
                        },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isBranch",
                    },
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "isBranch",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Site Manager",
                    }
                  },
            ]
            
        },
//         {
//             "id": "row-2",
//             "fieldGroupClassName": "display-flex",
//             "fieldGroup": [
//                 {
//                     "className": "flex-1",
//                     "type": "select",
//                     "key": "employeeId",
//                     "templateOptions": {
//                         "label": "Foreman Name",
//                         "options": [],
//                         "required": true
//                     },
//                     // "expressionProperties": {
//                     //     "templateOptions.disabled": "model.isSiteManager",
//                     // },
//                 },
//                 {
//                     "className": "flex-1",
//                     "type": "datepicker",
//                     "key": "dateTo",
//                     "templateOptions": {
//                         "label": "To",
//                         "required": true
//                     }
//                 }
//     ]
// }   
{
    "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
              
        // {
        //     "className": "flex-1 checkbox-outline-none",
        //     "type": "checkbox",
        //     "key": "withClear",
        //     "defaultValue": 0,
        //     "templateOptions": {
        //         "label": "With Clear",
        //     }
        // },
        {
            "className": "flex-1",
            "type": "select",
            "key": "paymentMode",
            "templateOptions": {
                "label": "Payment Mode",
                "options": [
                    {
                        "label": "CASH",
                        "value": "CASH"
                    },
                    {
                        "label": "BANK",
                        "value": "BANK"
                    },
                    {
                        "label": "SITE MANAGER",
                        "value": "SITE MANAGER"
                    }
                ],
                "required": true,
            
            },
        },
        {
            "className": "flex-1",
            "type": "datepicker",
            "key": "paymentDate",
            "templateOptions": {
                "label": "Paying Date",
                "required": true
            }
        },
        {
            "className": "flex-1",
            "type": "input",
            "key": "paymentdetails",
            "templateOptions": {
                "label": "Amount",
                "required": true,
            }
        },
      
        {
            "className": "flex-1",
            "type": "select",
            "key": "paymentModeId",
            "templateOptions": {
                "label": "Bank",
                "required": true,
            
            },
            "expressionProperties": {
                "templateOptions.disabled": "!model.isBranch",
        }
        },
      
    ]
},
{
    "id": "row-3",
    "fieldGroupClassName": "display-flex",
    "fieldGroup": [
     
      
    ]
},
{
    "id": "row-4",
    "fieldGroupClassName": "display-flex",
    "fieldGroup": [
       
    ]
},
{
    "id": "row-5",
    "fieldGroupClassName": "display-flex",
    "fieldGroup": [
        {
            "className": "flex-1 checkbox-outline-none",
            "type": "checkbox",
            "key": "onlinePayment",
            "defaultValue": 0,
            "templateOptions": {
                "label": "Online Payment",
            }
        },
        {
            "className": "flex-1",
            "type": "input",
            "key": "paymentNo",
            "templateOptions": {
                "label": "Cheque/DD No",
                "required": true,
                "rows": 5
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
            }
        },
        {
            "className": "flex-1",
            "type": "textarea",
            "key": "remarks",
            "templateOptions": {
                "label": "Remarks",
                "required": true,
            
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
                "displayName": 'Bill Date'
            },
            {
                "field": 'projectName',
                "displayName": 'projectName'
            },
            {
                "field": 'unitId',
                "displayName": 'unitId'
            },
            {
                "field": 'billno',
                "displayName": 'Bill No'
            },
            // {
            //     "field": 'workOrderNo',
            //     "displayName": 'Work Order'
            // },
            {
                "field": 'paymentAmount',
                "displayName": 'Net Amount'
            },
            {
                "field": 'discountAmount',
                "displayName": 'Discount'
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
                        "type": "datepicker",
                        "key": "paymentDate",
                        "templateOptions": {
                            "label": "Payment Date",
                            "required": true,
                            
                        },
                        // "expressionProperties": {
                        //     "templateOptions.disabled": "model.isSiteManager",
                        // },
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
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "",
                        "templateOptions": {
                            "label": "Cheque Date",
                            "required": true,
                            
                        },
                        // "expressionProperties": {
                        //     "templateOptions.disabled": "model.isSiteManager",
                        // },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.paymentMode",
                        },
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
                        "key": "am",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Amount",
                            // "required": true,
                            // "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "paymentModeId",
                        "templateOptions": {
                            "label": "Bank",
                            "options": [],
                            "required": true
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.paymentMode",
                        },
                        
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "paymentNo",
                        "templateOptions": {
                            "label": "Cheque No.",
                            "required": true,
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.paymentMode" ,
                            // "templateOptions.disabled": "model.isSiteManager"
                            
                        },
                    },
                   
                ]
            },
            {
                "id": "row-3",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className":"flex-1",
                        "type": "textarea",
                        "key": "remarks",
                        "templateOptions": {
                            "label": "Remarks",
                            "rows": 1,
                            "required": true,

                        }
                    }
                ]
            }
        ]
    }

}