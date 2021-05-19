export const ProjectStatusMetadata = {
    "moduleId": "project-status",
    "moduleName": "Project Status",
    "displayName": "CRM / Project Status",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndpoint": {
        "status": "BuildExeCRM/api/Project/Status",
        "tendersubmit": 'BuildExeCRM/api/TendorSubmit',
        "tenderanalysis": 'BuildExeCRM/api/TendorAnalysis',
        "tendernegotiation": 'BuildExeCRM/api/TendorNegotiation',
        "tenderworkorder": 'BuildExeCRM/api/TendorWorkOrder'
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'status',
            "displayName": 'Status'
        },
        {
            "field": 'statusDescription',
            "displayName": 'Status Description'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "projectdetails",
            "label": "Project Details",
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "key": "projectType",
                            "type": "input",
                            "templateOptions": {
                                "label": "Project Type",
                                "readonly": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "datepicker",
                            "key": "dateentered",
                            "templateOptions": {
                                "label": "Date Entered"
                            }
                        },
                    ]
                },
                {
                    "id": "row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "key": "projectId",
                            "type": "input",
                            "templateOptions": {
                                "label": "Project Id",
                                "readonly": true
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "currentStatus",
                            "type": "select",
                            "templateOptions": {
                                "label": "Current Status",
                                "options": [
                                    { "label": 'Pending', "value": 1 },
                                    { "label": 'Tender Submitted', "value": 2 },
                                    { "label": 'Tender Opened', "value": 3 },
                                    { "label": 'Negotiated', "value": 4 },
                                    { "label": 'Work Order', "value": 5 },
                                    { "label": 'Active', "value": 6 },
                                    { "label": 'Silent', "value": 7 },
                                    { "label": 'Rejected', "value": 8 },
                                    { "label": 'Completed', "value": 9 },
                                    { "label": 'Enquiry', "value": 10 }
                                ],
                                "readonly": true
                            }
                        }
                    ]
                },
                {
                    "id": "row-3",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "key": "projectName",
                            "templateOptions": {
                                "label": "Project Name",
                                "readonly": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "status",
                            "type": "select",
                            "templateOptions": {
                                "label": "Change Status To",
                                "options": [],
                                "required": true
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
                            "type": "textarea",
                            "key": "statusDescription",
                            "templateOptions": {
                                "label": "Narration",
                                "required": true,
                                "rows": 6
                            }
                        }
                    ]
                }
            ],
        }
    ],
    "tendersubmissionFormfields": {
        "id": "tendersubmission",
        "label": "Tender Submission",
        "fields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 readonly",
                        "key": "tenderType",
                        "type": "select",
                        "templateOptions": {
                            "label": "Tender Type",
                            "options": [],
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "tenderNumber",
                        "templateOptions": {
                            "label": "Tender Number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "prebudgetTenderAmount",
                        "templateOptions": {
                            "label": "Prebudgeted Tendor Amount",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "key": "emdStatus",
                        "type": "select",
                        "templateOptions": {
                            "label": "EDM Status",
                            "options": []
                        }
                    },
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tenderAmount",
                        "templateOptions": {
                            "label": "Tender Amount",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tenderFee",
                        "templateOptions": {
                            "label": "Tender Fee",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "feeType",
                        "type": "select",
                        "templateOptions": {
                            "label": "Fee Type",
                            "options": [
                                {
                                    "label": "BANK",
                                    "value": "BANK"
                                },
                                {
                                    "label": "CASH",
                                    "value": "CASH"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "otherCharges",
                        "templateOptions": {
                            "label": "Other Charges",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "otherChargesfeeType",
                        "type": "select",
                        "templateOptions": {
                            "label": "Fee Type",
                            "options": [
                                {
                                    "label": "BANK",
                                    "value": "BANK"
                                },
                                {
                                    "label": "CASH",
                                    "value": "CASH"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "bankId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Bank",
                            "options": []
                        }
                    },
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "emdAmount",
                                        "templateOptions": {
                                            "label": "EMD Amount",
                                            "required": true,
                                            "type": "number"
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "emdType",
                                        "type": "select",
                                        "templateOptions": {
                                            "label": "EMD Type",
                                            "options": [
                                                { "label": "BANK GURANTEE", "value": "BANK GURANTEE" },
                                                { "label": "CASH/DD", "value": "CASH/DD" },
                                                { "label": "FD/OTHER", "value": "FD/OTHER" },
                                                { "label": "ONLINE PAYMENT", "value": "ONLINE PAYMENT" }
                                            ],
                                            "required": true
                                        }
                                    },
                                ]
                            },
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "key": "emdTypeId",
                                        "type": "select",
                                        "templateOptions": {
                                            "label": "Bank",
                                            "options": []
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "transactionNO",
                                        "templateOptions": {
                                            "label": "Transaction No: / ID"
                                        }
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "type": "textarea",
                        "key": "narration",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true,
                            "rows": 6
                        }
                    },
                ]
            }
        ],
    },
    "tenderopenFormfields": {
        "id": "tenderopen",
        "label": "Tender Open - Tender Analysis",
        "fields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "companyName",
                        "type": "input",
                        "templateOptions": {
                            "label": "Company",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "contractorName",
                        "type": "input",
                        "templateOptions": {
                            "label": "Contractor",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "key": "tenderAmount",
                        "type": "input",
                        "templateOptions": {
                            "label": "Tender Amount",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "narration",
                        "type": "input",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "key": "position",
                        "type": "input",
                        "templateOptions": {
                            "label": "Position",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "key": "marksGiven",
                        "type": "input",
                        "templateOptions": {
                            "label": "Marks Given",
                            "required": true,
                            "type": "number"
                        }
                    },
                ]
            }
        ],
    },
    "tendernegotiationFormfields": {
        "id": "tendernegotiation",
        "label": "Tender Negotiated",
        "fields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "className": "readonly",
                                "key": "tenderAmount",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Tender Amount",
                                    "readonly": true
                                }
                            },
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "key": "tenderNegotiationPercent",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Negotiation Percent",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "tenderNegotiationAmount",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Negotiation Amount",
                                            "required": true
                                        }
                                    }
                                ]
                            },
                            {
                                "className": "readonly",
                                "key": "tenderRevisedAmount",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Revised Project Cost",
                                    "readonly": true
                                }
                            },
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "tenderNegotiationNarration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Narration",
                            "rows": 11,
                            "required": true
                        }
                    }
                ]
            }
        ]
    },
    "workorderFormfields": {
        "id": "workorder",
        "label": "Work Order",
        "fields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "tenderAmount",
                        "type": "input",
                        "templateOptions": {
                            "label": "Security Deposit",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "tenderAmount",
                        "type": "input",
                        "templateOptions": {
                            "label": "Bank",
                            "readonly": true
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "key": "performanceGuarantee",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Performance Guarantee",
                                    "readonly": true
                                }
                            },
                            {
                                "key": "securityDepositStatus",
                                "type": "select",
                                "templateOptions": {
                                    "label": "Security Deposit Status",
                                    "readonly": true,
                                    "options": []
                                }
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "securityDepositNarration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Security Deposit Narration",
                            "readonly": true,
                            "rows": 6
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "key": "securityDepositType",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Security Deposit / Per.Guarantee Type",
                                    "readonly": true
                                }
                            },
                            {
                                "key": "chequenumber",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Cheque Number",
                                    "readonly": true
                                }
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "workOrderNarration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Work Order Narration",
                            "readonly": true,
                            "rows": 6
                        }
                    }
                ]
            }
        ]
    },
    "tenderopenTableColumn": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'companyName',
            "displayName": 'Company'
        },
        {
            "field": 'contractorName',
            "displayName": 'Contractor'
        },
        {
            "field": 'tenderAmount',
            "displayName": 'Amount'
        },
        {
            "field": 'projectId',
            "displayName": 'Status'
        },
        {
            "field": 'narration',
            "displayName": 'Narration'
        },
        {
            "field": 'position',
            "displayName": 'Position'
        },
        {
            "field": 'marksGiven',
            "displayName": 'Marks Given'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}