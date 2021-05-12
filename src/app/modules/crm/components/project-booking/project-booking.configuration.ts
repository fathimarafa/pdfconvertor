export const ProjectBookingMetadata = {
    "moduleId": "projectbooking",
    "moduleName": "Project Booking",
    "displayName": "CRM / Project Booking",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ProjectBooking",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'enquiryId',
            "displayName": 'Enquiry'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'firstName',
            "displayName": 'Name'
        },
        {
            "field": 'address',
            "displayName": 'Address'
        },
        {
            "field": 'mobileNumber',
            "displayName": 'Mobile Number'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "project-details",
            "label": "Project Details",
            "fields": [
                {
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project ID",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "projectName",
                    "templateOptions": {
                        "label": "Project Name",
                        "readonly": true,
                    }
                },
                {
                    "type": "textarea",
                    "key": "projectDescription",
                    "templateOptions": {
                        "label": "Description",
                        "readonly": true,
                        "rows": 15
                    }
                },
            ]
        },
        {
            "id": "client-details",
            "label": "Client Details",
            "fields": [
                {
                    "type": "input",
                    "key": "firstName",
                    "templateOptions": {
                        "label": "First Name",
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "lastName",
                    "templateOptions": {
                        "label": "Last Name",
                        "required": true
                    }
                },
                {
                    "key": "sex",
                    "type": "radio",
                    "templateOptions": {
                        "label": "Sex",
                        "options": [
                            {
                                "value": "M",
                                "label": "Male"
                            },
                            {
                                "value": "F",
                                "label": "Female"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "key": "dateOfBirth",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date of Birth",
                        "required": true,
                    }
                },
                {
                    "type": "input",
                    "key": "emailId",
                    "templateOptions": {
                        "label": "Email",
                        "required": true
                    }
                },
                {
                    "type": "textarea",
                    "key": "address",
                    "templateOptions": {
                        "label": "Address",
                        "required": true,
                        "rows": 5
                    }
                },
                {
                    "type": "input",
                    "key": "post",
                    "templateOptions": {
                        "label": "Post",
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "pin",
                    "templateOptions": {
                        "label": "Pin",
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "phoneNumber",
                    "templateOptions": {
                        "label": "Phone Number",
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "mobileNumber",
                    "templateOptions": {
                        "label": "Mobile Number",
                        "required": true
                    }
                }
            ],
        },
        {
            "id": "client-stage-work",
            "label": "Client Stage Work Details",
            "fields": [
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "stageName",
                            "templateOptions": {
                                "label": "Stage Name",
                                "required":"true"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "clientPer",
                            "templateOptions": {
                                "label": "Unit Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "clientAmount",
                            "templateOptions": {
                                "label": "Unit Amount",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "paymentPercentage",
                            "templateOptions": {
                                "label": "Payment Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sacCode",
                            "templateOptions": {
                                "label": "SAC Code"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxInclusive",
                            "type": "select",
                            "templateOptions": {
                                "label": "Tax Inclusive",
                                "options": [
                                    {
                                        "value": "Y",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "N",
                                        "label": "No"
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxArea",
                            "type": "select",
                            "templateOptions": {
                                "label": "Tax Area",
                                "options": [
                                    {
                                        "label": "INTER",
                                        "value": "INTER"
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
                            "key": "paymentModeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Payment Mode",
                                "options": [
                                    {
                                        "label": "Cash",
                                        "value": 1
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sgstPercent",
                            "templateOptions": {
                                "label": "SGST Percent",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sgstAmt",
                            "templateOptions": {
                                "label": "SGST Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "cgstPercent",
                            "templateOptions": {
                                "label": "CGST Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "cGSTAmt",
                            "templateOptions": {
                                "label": "CGST Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "igstPercent",
                            "templateOptions": {
                                "label": "IGST Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "igstAmt",
                            "templateOptions": {
                                "label": "IGST Amount",
                                "type": "number"
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
                            "key": "labourWelfarePercent",
                            "templateOptions": {
                                "label": "Labour Welfare Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "labourWelfareAmount",
                            "templateOptions": {
                                "label": "Labour Welfare Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "tdsPercent",
                            "templateOptions": {
                                "label": "TDS Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "tdsAmount",
                            "templateOptions": {
                                "label": "TDS Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "kfcper",
                            "templateOptions": {
                                "label": "KFC Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "kfcAmt",
                            "templateOptions": {
                                "label": "KFC Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "discount",
                            "templateOptions": {
                                "label": "Discount",
                                "type": "number"
                            }
                        },
                    ]
                },
                {

                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-2",
                            "type": "textarea",
                            "key": "stageRemarks",
                            "templateOptions": {
                                "label": "Remarks",
                                "rows": 6
                            }
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "key": "dateToStart",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Start Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "key": "dateToComplete",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Date to Complete"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "netAmount",
                                            "templateOptions": {
                                                "label": "Net Amount",
                                                "type": "number"
                                            }
                                        },
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "key": "dateCompleted",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Completed Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "key": "dateDue",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Due Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "amountBalance",
                                            "templateOptions": {
                                                "label": "Balance Amount",
                                                "type": "number"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            "id": "bank-stage-work",
            "label": "Bank Stage Work Details",
            "fields": [
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "stageName",
                            "templateOptions": {
                                "label": "Stage Name",
                                "required":"true"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "clientPer",
                            "templateOptions": {
                                "label": "Unit Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "clientAmount",
                            "templateOptions": {
                                "label": "Unit Amount",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "paymentPercentage",
                            "templateOptions": {
                                "label": "Payment Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sacCode",
                            "templateOptions": {
                                "label": "SAC Code"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxInclusive",
                            "type": "select",
                            "templateOptions": {
                                "label": "Tax Inclusive",
                                "options": [
                                    {
                                        "value": "Y",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "N",
                                        "label": "No"
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxArea",
                            "type": "select",
                            "templateOptions": {
                                "label": "Tax Area",
                                "options": [
                                    {
                                        "label": "INTER",
                                        "value": "INTER"
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
                            "key": "paymentModeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Payment Mode",
                                "options": [
                                    {
                                        "label": "Cash",
                                        "value": 1
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sgstPercent",
                            "templateOptions": {
                                "label": "SGST Percent",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sgstAmt",
                            "templateOptions": {
                                "label": "SGST Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "cgstPercent",
                            "templateOptions": {
                                "label": "CGST Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "cGSTAmt",
                            "templateOptions": {
                                "label": "CGST Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "igstPercent",
                            "templateOptions": {
                                "label": "IGST Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "igstAmt",
                            "templateOptions": {
                                "label": "IGST Amount",
                                "type": "number"
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
                            "key": "labourWelfarePercent",
                            "templateOptions": {
                                "label": "Labour Welfare Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "labourWelfareAmount",
                            "templateOptions": {
                                "label": "Labour Welfare Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "tdsPercent",
                            "templateOptions": {
                                "label": "TDS Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "tdsAmount",
                            "templateOptions": {
                                "label": "TDS Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "kfcper",
                            "templateOptions": {
                                "label": "KFC Percentage",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "kfcAmt",
                            "templateOptions": {
                                "label": "KFC Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "discount",
                            "templateOptions": {
                                "label": "Discount",
                                "type": "number"
                            }
                        },
                    ]
                },
                {

                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-2",
                            "type": "textarea",
                            "key": "stageRemarks",
                            "templateOptions": {
                                "label": "Remarks",
                                "rows": 6
                            }
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "key": "dateToStart",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Start Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "key": "dateToComplete",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Date to Complete"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "netAmount",
                                            "templateOptions": {
                                                "label": "Net Amount",
                                                "type": "number"
                                            }
                                        },
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "key": "dateCompleted",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Completed Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "key": "dateDue",
                                            "type": "datepicker",
                                            "templateOptions": {
                                                "label": "Due Date"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "amountBalance",
                                            "templateOptions": {
                                                "label": "Balance Amount",
                                                "type": "number"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ],
    "unitTableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'unitId',
            "displayName": 'Unit'
        },
        {
            "field": 'floorId',
            "displayName": 'Floor'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        {
            "field": 'totalAmount',
            "displayName": 'Total Amount'
        }
    ],
    "coapplicantFormfields": [
        {
            "type": "input",
            "key": "coApplicantName",
            "templateOptions": {
                "label": "CoApplicant Name",
                "required": true
            }
        },
        {
            "type": "textarea",
            "key": "coApplicantAddress",
            "templateOptions": {
                "label": "CoApplicant Address",
                "required": true,
                "rows": 5
            }
        },
        {
            "type": "input",
            "key": "relationship",
            "templateOptions": {
                "label": "Relationship",
                "required": true
            }
        },
        {
            "key": "coApplicantSex",
            "type": "radio",
            "templateOptions": {
                "label": "Sex",
                "options": [
                    {
                        "value": "M",
                        "label": "Male"
                    },
                    {
                        "value": "F",
                        "label": "Female"
                    }
                ],
                "required": true
            }
        },
        {
            "key": "coapplicantDateOfBirth",
            "type": "datepicker",
            "templateOptions": {
                "label": "Date of Birth",
                "required": true,
            }
        }
    ],
    "contributionFormfields": [
        {
            "type": "input",
            "key": "projectId",
            "templateOptions": {
                "label": "Project Id",
                "readonly": true
            }
        },
        {
            "type": "input",
            "key": "unitId",
            "templateOptions": {
                "label": "Unit Name",
                "readonly": true
            }
        },
        {
            "type": "input",
            "key": "totalAmount",
            "templateOptions": {
                "label": "Total Cost",
                "readonly": true,
                "type": "number"
            }
        },
        {
            "type": "input",
            "key": "clientPer",
            "templateOptions": {
                "label": "Client Percentage",
                "readonly": true,
                "type": "number"
            }
        },
        {
            "type": "input",
            "key": "clientAmount",
            "templateOptions": {
                "label": "Client Amount",
                "readonly": true,
                "type": "number"
            }
        },
        {
            "type": "input",
            "key": "bankPer",
            "templateOptions": {
                "label": "Bank Percentage",
                "type": "number"
            }
        },
        {
            "type": "input",
            "key": "bankAmount",
            "templateOptions": {
                "label": "Bank Amount",
                "type": "number"
            }
        }
    ],
    "stageTableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'stageName',
            "displayName": 'Stage Name'
        },
        {
            "field": 'clientAmount',
            "displayName": 'Unit Cost'
        },
        {
            "field": 'dateToStart',
            "displayName": 'Start Date'
        },
        {
            "field": 'dateCompleted',
            "displayName": 'Completed Date'
        },
        {
            "field": 'stageRemarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}