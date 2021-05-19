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
                            "fieldGroup": [
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
                                    "key": "projectName",
                                    "templateOptions": {
                                        "label": "Project Name",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "select",
                                    "key": "paymentModeId",
                                    "templateOptions": {
                                        "label": "Payment Mode",
                                        "options": [],
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "totalAmount",
                                    "templateOptions": {
                                        "label": "Totoal Cost",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "select",
                                    "key": "taxInclusive",
                                    "templateOptions": {
                                        "label": "Tax Type",
                                        "options": [
                                            {
                                                "label": "Tax Inclusive",
                                                "value": "Y"
                                            },
                                            {
                                                "label": "Tax Exclusive",
                                                "value": "N"
                                            }
                                        ],
                                        "required": true
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "stageName",
                                    "templateOptions": {
                                        "label": "Stage Name",
                                        "required": true
                                    }
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "paymentPercentage",
                                            "templateOptions": {
                                                "label": "Unit Cost (%)",
                                                "readonly": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "unitcostamount",
                                            "templateOptions": {
                                                "label": "Unit Cost Amount",
                                                "readonly": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "input",
                                    "key": "grossAmount",
                                    "templateOptions": {
                                        "label": "Gross Amount",
                                        "type": "number",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "taxArea",
                                    "templateOptions": {
                                        "label": "Tax Area",
                                        "options": [
                                            {
                                                "label": "INTER",
                                                "value": "INTER"
                                            },
                                            {
                                                "label": "INTRA",
                                                "value": "INTRA"
                                            }
                                        ],
                                        "required": true
                                    }
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "TDS (%)",
                                                "type": "number",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "TDS Amount",
                                                "type": "number",
                                                "required": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "labourWelfarePercent",
                                            "templateOptions": {
                                                "label": "LW (%)",
                                                "type": "number",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "labourWelfareAmount",
                                            "templateOptions": {
                                                "label": "LW Amount",
                                                "type": "number",
                                                "required": true
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "sgstPercent",
                                            "templateOptions": {
                                                "label": "SGST (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "cgstPercent",
                                            "templateOptions": {
                                                "label": "CGST (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "igstPercent",
                                            "templateOptions": {
                                                "label": "IGST (%)",
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
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "kfcper",
                                            "templateOptions": {
                                                "label": "KFC (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "type": "datepicker",
                                    "key": "dateToStart",
                                    "templateOptions": {
                                        "label": "Start Date",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "datepicker",
                                    "key": "dateCompleted",
                                    "templateOptions": {
                                        "label": "Completed Date",
                                        "required": true
                                    }
                                },
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "discount",
                                            "templateOptions": {
                                                "label": "Discount (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "discountAmount",
                                            "templateOptions": {
                                                "label": "Discount Amount",
                                                "type": "number"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "input",
                                    "key": "stageNetAmount",
                                    "templateOptions": {
                                        "label": "Stage Net Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "sacCode",
                                    "templateOptions": {
                                        "label": "SAC Code",
                                        "options": []
                                    }
                                },
                                {
                                    "type": "textarea",
                                    "key": "stageRemarks",
                                    "templateOptions": {
                                        "label": "Remarks",
                                        "rows": 11
                                    }
                                }
                            ]
                        }
                    ]
                }
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
                            "fieldGroup": [
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
                                    "key": "projectName",
                                    "templateOptions": {
                                        "label": "Project Name",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "select",
                                    "key": "paymentModeId",
                                    "templateOptions": {
                                        "label": "Payment Mode",
                                        "options": [],
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "totalAmount",
                                    "templateOptions": {
                                        "label": "Totoal Cost",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "select",
                                    "key": "taxInclusive",
                                    "templateOptions": {
                                        "label": "Tax Type",
                                        "options": [
                                            {
                                                "label": "Tax Inclusive",
                                                "value": "Y"
                                            },
                                            {
                                                "label": "Tax Exclusive",
                                                "value": "N"
                                            }
                                        ],
                                        "required": true
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "stageName",
                                    "templateOptions": {
                                        "label": "Stage Name",
                                        "required": true
                                    }
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "paymentPercentage",
                                            "templateOptions": {
                                                "label": "Unit Cost (%)",
                                                "readonly": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "unitcostamount",
                                            "templateOptions": {
                                                "label": "Unit Cost Amount",
                                                "readonly": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "input",
                                    "key": "grossAmount",
                                    "templateOptions": {
                                        "label": "Gross Amount",
                                        "type": "number",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "taxArea",
                                    "templateOptions": {
                                        "label": "Tax Area",
                                        "options": [
                                            {
                                                "label": "INTER",
                                                "value": "INTER"
                                            },
                                            {
                                                "label": "INTRA",
                                                "value": "INTRA"
                                            }
                                        ],
                                        "required": true
                                    }
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "TDS (%)",
                                                "type": "number",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "TDS Amount",
                                                "type": "number",
                                                "required": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "labourWelfarePercent",
                                            "templateOptions": {
                                                "label": "LW (%)",
                                                "type": "number",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "labourWelfareAmount",
                                            "templateOptions": {
                                                "label": "LW Amount",
                                                "type": "number",
                                                "required": true
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "sgstPercent",
                                            "templateOptions": {
                                                "label": "SGST (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "cgstPercent",
                                            "templateOptions": {
                                                "label": "CGST (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "igstPercent",
                                            "templateOptions": {
                                                "label": "IGST (%)",
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
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "kfcper",
                                            "templateOptions": {
                                                "label": "KFC (%)",
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
                                        }
                                    ]
                                },
                                {
                                    "type": "datepicker",
                                    "key": "dateToStart",
                                    "templateOptions": {
                                        "label": "Start Date",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "datepicker",
                                    "key": "dateCompleted",
                                    "templateOptions": {
                                        "label": "Completed Date",
                                        "required": true
                                    }
                                },
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "fieldGroupClassName": "display-flex field-size-small",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "discount",
                                            "templateOptions": {
                                                "label": "Discount (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "discountAmount",
                                            "templateOptions": {
                                                "label": "Discount Amount",
                                                "type": "number"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "input",
                                    "key": "stageNetAmount",
                                    "templateOptions": {
                                        "label": "Stage Net Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "sacCode",
                                    "templateOptions": {
                                        "label": "SAC Code",
                                        "options": []
                                    }
                                },
                                {
                                    "type": "textarea",
                                    "key": "stageRemarks",
                                    "templateOptions": {
                                        "label": "Remarks",
                                        "rows": 11
                                    }
                                }
                            ]
                        }
                    ]
                }
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