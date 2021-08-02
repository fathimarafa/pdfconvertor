export const LabourWagePaymentMetadata = {
    "moduleId": "labourwagepayment",
    "moduleName": "Labour Wage Payment",
    "displayName": "HR / Labour Wage Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/LabourWagePayment",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'employeeId',
            "displayName": 'Employee Id'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
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
                    "type": "select",
                    "key": "id",
                    "templateOptions": {
                        "label": "Labour",
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
                    "key": "dateFrom",
                    "templateOptions": {
                        "label": "From",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateTo",
                    "templateOptions": {
                        "label": "To",
                        "required": true
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "sendMail",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Send Mail"
                    }
                }
            ]
        },
       
    ],
    "labourWagePaymentDetails": {
        "tableColumns": [
            {
                "field": 'labourWagePaymentDetailsId',
                "displayName": 'SNo'
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
                "field": 'previousBalance',
                "displayName": 'Previous Balance'
            },
            {
                "field": 'daysWorked',
                "displayName": 'Total Work'
            },
            {
                "field": 'overTimeHrs',
                "displayName": 'OverTime Worked'
            },
            {
                "field": 'dailyWageAmount',
                "displayName": 'Wage/Day'
            },
            {
                "field": 'totalWage',
                "displayName": 'Total Wage'
            },
            {
                "field": 'advanceAmount',
                "displayName": 'Advance Amount'
            },
            {
                "field": 'overTimeAmount',
                "displayName": 'Grand Total'
            },
            {
                "field": 'netPayable',
                "displayName": 'Now Paying Amount'
            },
            {
                "field": 'othercharges',
                "displayName": 'Other Charges'
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
                        "key": "date",
                        "templateOptions": {
                            "label": "Payment Date",
                            "required": true,
                            
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
                                    "label": "Cash/DD",
                                    "value": 0
                                },
                                {
                                    "label": "Cheque",
                                    "value": 1
                                }
                            ],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "approvedDate",
                        "templateOptions": {
                            "label": "Cheque Date",
                            "required": true,
                            
                        },
                        "expressionProperties": {
                            "templateOptions.disabled": "!model.paymentMode",
                        },
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
                        "key": "paymentType",
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