export const ForemanPaymentApprovalMetadata = {
    "moduleId": "foremanpaymentapproval",
    "moduleName": "Foreman Payment Approval",
    "displayName": "HR / Foreman Payment Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanPayment",
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
                    "key": "paymentModeId",
                    // sitemanger===paymentModeId
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "",
                        "options": [],
                        "required": true
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isSiteManager",
                    },
                },
                // {
                //     "className": "flex-1",
                //     "type": "datepicker",
                //     "key": "dateFrom",
                //     "templateOptions": {
                //         "label": "From",
                //         "required": true
                //     }
                // }
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "employeeId",
                    "templateOptions": {
                        "label": "Foreman Name",
                        "options": [],
                        "required": true
                    },
                    // "expressionProperties": {
                    //     "templateOptions.disabled": "model.isSiteManager",
                    // },
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
       
    ],
    "foremanPaymentDetails": {
        "tableColumns": [
            {
                "field": 'billNumber',
                "displayName": 'Bill Number'
            },
            {
                "field": 'billDate',
                "displayName": 'Bill Date'
            },
            {
                "field": 'projectName',
                "displayName": 'Project Name'
            },
            {
                "field": 'unitName',
                "displayName": 'Unit Name'
            },
            {
                "field": 'floorName',
                "displayName": 'Floor Name'
            },
            {
                "field": 'blockName',
                "displayName": 'Block Name'
            },
            {
                "field": 'totalWage',
                "displayName": 'Total Wage'
            },
            {
                "field": 'totOtAmount',
                "displayName": 'Total Amount'
            },
            {
                "field": 'advancePaid',
                "displayName": 'Advance Amount'
            },
            {
                "field": 'billAmount',
                "displayName": 'Bill Amount'
            },
            {
                "field": 'payment',
                "displayName": 'Paying Amount'
            },
            {
                "field": 'billAmountBalance',
                "displayName": 'bill Amount Balance'
            },
            {
                "field": 'discount',
                "displayName": 'Discount'
            },
        ],
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                   
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "date",
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
                                    "label": "Cash/DD",
                                    "value": 0
                                },
                                {
                                    "label": "Cheque",
                                    "value": 1
                                }
                            ],
                            "required": true
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "model.isSiteManager",
                        },
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "approvedDate",
                        "templateOptions": {
                            "label": "Cheque Date",
                            "required": true,
                            
                        },
                        // "expressionProperties": {
                        //     "templateOptions.disabled": "model.isSiteManager",
                        // },
                    }
                ]
            },
            {
                "id": "row-2",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                   
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "advanceAmount",
                        "templateOptions": {
                            "label": "Amount",
                            "required": true,
                            "type": "number"
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
                            "templateOptions.disabled": "!model.paymentMode",
                        },
                        
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "voucherNumber",
                        "templateOptions": {
                            "label": "Cheque No.",
                            "required": true,
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "!model.paymentMode",
                        },
                    },
                   
                ]
            }
        ]
    }

}