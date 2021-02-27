export const GovernmentProjectBookingMetadata = {
    "moduleId": "project-booking",
    "moduleName": "Project Booking",
    "displayName": "CRM / Project Booking",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "ProjectBooking",
    "tableColumns": {
        "tenderNegotiated": [
            {
                "field": 'projectId',
                "displayName": 'S.No'
            },
            {
                "field": 'companyName',
                "displayName": 'Company'
            },
            {
                "field": 'contractor',
                "displayName": 'Contractor'
            },
            {
                "field": 'tenderedAmount',
                "displayName": 'Tendered Amount'
            },
            {
                "field": 'status',
                "displayName": 'Status'
            },
            {
                "field": 'marksGiven',
                "displayName": 'Marks Given'
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
                "field": 'action',
                "displayName": 'Action'
            }
        ]
    },
    "formFields": {
        "projectDetails": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "projectTypeId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Select project type",
                            "options": [
                                {
                                    "label": "type 1",
                                    "value": "type 1"
                                },
                                {
                                    "label": "type 2",
                                    "value": "type 2"
                                },
                                {
                                    "label": "type 3",
                                    "value": "type 3"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "projectId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Select project id",
                            "options": [
                                {
                                    "label": "type 1",
                                    "value": "type 1"
                                },
                                {
                                    "label": "type 2",
                                    "value": "type 2"
                                },
                                {
                                    "label": "type 3",
                                    "value": "type 3"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "projectName",
                        "type": "input",
                        "templateOptions": {
                            "label": "Project Name",
                            "required": true
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "dateEntered",
                        "templateOptions": {
                            "label": "Date Entered",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "projectStatusId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Current Status",
                            "options": [
                                {
                                    "label": "ACTIVE",
                                    "value": "active"
                                },
                                {
                                    "label": "COMPLETED",
                                    "value": "completed"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "changedProjectStatusId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Change Status To",
                            "options": [
                                {
                                    "label": "ACTIVE",
                                    "value": "active"
                                },
                                {
                                    "label": "COMPLETED",
                                    "value": "completed"
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
                        "type": "textarea",
                        "key": "narration",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true,
                            "rows": 5
                        }
                    }
                ]
            }
        ],
        "openTender": [
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
                        "type": "input",
                        "key": "tenderAmount",
                        "templateOptions": {
                            "label": "Tender Amount",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "narration",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "contractorName",
                        "type": "input",
                        "templateOptions": {
                            "label": "Contractor Name",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "marksGiven",
                        "templateOptions": {
                            "label": "Marks Given",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "position",
                        "templateOptions": {
                            "label": "Position",
                            "required": true
                        }
                    }
                ]
            }
        ],
        "tenderSubmission": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "tenderTypeId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Tender Type",
                            "required": true,
                            "options": [
                                {
                                    "label": "type 1",
                                    "value": "type 1"
                                },
                                {
                                    "label": "type 2",
                                    "value": "type 2"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tenderNumber",
                        "templateOptions": {
                            "label": "Tender Number",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "prebudgetedTenderAmount",
                        "templateOptions": {
                            "label": "Prebudjected Tender Amount",
                            "required": true
                        }
                    }
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "tenderAmount",
                        "type": "input",
                        "templateOptions": {
                            "label": "Tender Amount",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tenderFee",
                        "templateOptions": {
                            "label": "Tender Fee",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "feeTypeId",
                        "templateOptions": {
                            "label": "Fee Type",
                            "required": true,
                            "options": [
                                {
                                    "label": "type 1",
                                    "value": "type 1"
                                },
                                {
                                    "label": "type 2",
                                    "value": "type 2"
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
                        "key": "bank",
                        "type": "input",
                        "templateOptions": {
                            "label": "Bank",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "emdAmount",
                        "type": "input",
                        "templateOptions": {
                            "label": "EMD Amount",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "emdType",
                        "type": "select",
                        "templateOptions": {
                            "label": "EMD Type",
                            "required": true,
                            "options": [
                                {
                                    "label": "type 1",
                                    "value": "type 1"
                                },
                                {
                                    "label": "type 2",
                                    "value": "type 2"
                                }
                            ]
                        }
                    },
                ]
            },
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [

                    {
                        "className": "flex-1",
                        "key": "narration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true,
                            "rows": 11
                        }
                    },
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {

                                "key": "emdDepositTypeId",
                                "type": "select",
                                "templateOptions": {
                                    "label": "EMD Deposit Type",
                                    "required": true,
                                    "options": [
                                        {
                                            "label": "type 1",
                                            "value": "type 1"
                                        },
                                        {
                                            "label": "type 2",
                                            "value": "type 2"
                                        }
                                    ]
                                }
                            },
                            {
                                "key": "transactionNo",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Transaction No",
                                    "required": true
                                }
                            },
                            {

                                "key": "emdStatus",
                                "type": "select",
                                "templateOptions": {
                                    "label": "EMD Status",
                                    "required": true,
                                    "options": [
                                        {
                                            "label": "type 1",
                                            "value": "type 1"
                                        },
                                        {
                                            "label": "type 2",
                                            "value": "type 2"
                                        }
                                    ]
                                }
                            },
                        ]
                    }
                ]
            }
        ],
        "tenderNegotiation": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "key": "tenderAmount",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Project Cost/Tender Amount",
                                    "required": true
                                }
                            },
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "key": "negotitationPer",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Negotiation Percent",
                                            "required": true
                                        }
                                    },
                                    {
                                        "key": "negotitationAmount",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Negotiation Amount",
                                            "required": true
                                        }
                                    }
                                ]
                            },
                            {
                                "key": "revisedProjectCost",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Revised Project Cost",
                                    "required": true
                                }
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "narration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Narration",
                            "required": true,
                            "rows": 11
                        }
                    }
                ]
            }
        ],
        "workOrder": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "fieldGroup": [
                            {
                                "key": "securityDeposit",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Security Deposit",
                                    "required": true
                                }
                            },
                            {

                                "key": "securityDepositTypeId",
                                "type": "select",
                                "templateOptions": {
                                    "label": "Security Deposit Type",
                                    "required": true,
                                    "options": [
                                        {
                                            "label": "type 1",
                                            "value": "type 1"
                                        },
                                        {
                                            "label": "type 2",
                                            "value": "type 2"
                                        }
                                    ]
                                }
                            },
                            {
                                "key": "performanceGuarantee",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Performance Guarantee",
                                    "required": true
                                }
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "narration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Security Deposit Narration",
                            "required": true,
                            "rows": 11
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

                                "key": "securityDepositStatus",
                                "type": "select",
                                "templateOptions": {
                                    "label": "Secuirty Deposit Status",
                                    "required": true,
                                    "options": [
                                        {
                                            "label": "type 1",
                                            "value": "type 1"
                                        },
                                        {
                                            "label": "type 2",
                                            "value": "type 2"
                                        }
                                    ]
                                }
                            },
                            {

                                "key": "preGuaranteeTypeId",
                                "type": "select",
                                "templateOptions": {
                                    "label": "Security Deposit/ Pre.Guarantee Type",
                                    "required": true,
                                    "options": [
                                        {
                                            "label": "type 1",
                                            "value": "type 1"
                                        },
                                        {
                                            "label": "type 2",
                                            "value": "type 2"
                                        }
                                    ]
                                }
                            },
                            {
                                "key": "chequeNumber",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Cheque No.",
                                    "required": true
                                }
                            },
                        ]
                    },
                    {
                        "className": "flex-1",
                        "key": "workOrderNarration",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Work Order Narration",
                            "required": true,
                            "rows": 11
                        }
                    }
                ]
            },
        ]
    }
}