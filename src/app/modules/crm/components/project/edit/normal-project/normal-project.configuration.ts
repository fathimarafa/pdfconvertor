export const NormalProjectMetadata = {
    "moduleId": "project-enquiry",
    "moduleName": "Project Enquiry",
    "displayName": "CRM / Enquiry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "BuildExeCRM/api/Project",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'unitId',
            "displayName": 'Unit'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        {
            "field": 'totalAreaCostWithTax',
            "displayName": 'Area Cost'
        },
        {
            "field": 'totalLandCost',
            "displayName": 'Land Cost'
        },
        {
            "field": 'totalAmount',
            "displayName": 'Total'
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
                    "fieldGroupClassName": "display-flex padd-top-40",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "projectName",
                            "type": "input",
                            "templateOptions": {
                                "label": "Project Name",
                                "required": true,
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "projectId",
                            "type": "input",
                            "templateOptions": {
                                "label": "Project Id",
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
                            "id": "row-1",
                            "className": "flex-1",
                            "key": "projectDescription",
                            "type": "textarea",
                            "templateOptions": {
                                "label": "Description",
                                "required": true,
                                "rows": 11
                            }
                        },
                        {
                            "id": "row-2",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "key": "projectTypeId",
                                    "type": "select",
                                    "templateOptions": {
                                        "label": "Category",
                                        "required": true,
                                        "options": [
                                            {
                                                "label": "Private Project",
                                                "value": "CP"
                                            },
                                            {
                                                "label": "Consultancy",
                                                "value": "CN"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "key": "startDate",
                                    "type": "datepicker",
                                    "templateOptions": {
                                        "label": "Start Date",
                                        "required": true,
                                    }
                                },
                                {
                                    "key": "endDate",
                                    "type": "datepicker",
                                    "templateOptions": {
                                        "label": "End Date",
                                        "required": true,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "clientdetails",
            "label": "Client Details",
            "fields": [
                {
                    "fieldGroupClassName": "display-flex padd-top-20",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "firstName",
                            "templateOptions": {
                                "label": "First Name",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "post",
                            "type": "input",
                            "templateOptions": {
                                "label": "Post",
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
                            "key": "address",
                            "type": "textarea",
                            "templateOptions": {
                                "label": "Address",
                                "required": true,
                                "rows": 11
                            }
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
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
                                        "label": "Phone",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "mobileNumber",
                                    "templateOptions": {
                                        "label": "Mobile",
                                        "required": true
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "gsT_No",
                            "templateOptions": {
                                "label": "GSTIN No.",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "emailId",
                            "type": "input",
                            "templateOptions": {
                                "label": "Email Id",
                                "required": true
                            }
                        }
                    ]
                },
            ]
        }
    ],
    "privateProjectForm": {
        "id": "privateprojectdetails",
        "label": "Private Project Details",
        "fields": [
            {
                "className": "padd-top-30",
                "type": "input",
                "key": "totalArea",
                "defaultValue":0,
                "templateOptions": {
                    "label": "Total Area",
                    "required": true,
                    "type":"number"
                }
            },
            {
                "type": "input",
                "key": "ratePerArea",
                "defaultValue":0,
                "templateOptions": {
                    "label": "Rate Per Area",
                    "required": true,
                    "type":"number"
                }
            },
            {
                "className":"readonly",
                "type": "input",
                "key": "totalAmount",
                "defaultValue":0,
                "templateOptions": {
                    "label": "Amount",
                    "readonly": true,
                    "type":"number"
                }
            },
            {
                "type": "select",
                "key": "paymentModeId",
                "templateOptions": {
                    "label": "Payment Mode",
                    "required": true,
                    "options": []
                }
            }
        ]
    },
    "projectConsultancyForm": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'S.No'
            },
            {
                "field": 'sacCode',
                "displayName": 'SacCode'
            },
            {
                "field": 'workName',
                "displayName": 'Work Name'
            },
            {
                "field": 'description',
                "displayName": 'Description'
            },
            {
                "field": 'qty',
                "displayName": 'Quantity'
            },
            {
                "field": 'unitRate',
                "displayName": 'Rate'
            },
            {
                "field": 'amount',
                "displayName": 'Total'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "fields": {
            "id": "projectconsultancy",
            "label": "Consultancy Work Details",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "id":"row-1",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "select",
                                    "key": "workid",
                                    "templateOptions": {
                                        "label": "Consultancy Work",
                                        "options": [],
                                        "required": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "qty",
                                    "defaultValue": 0,
                                    "templateOptions": {
                                        "label": "Quantity",
                                        "required": true,
                                        "type":"number",
                                    }
                                },
                            ]
                        },
                        {
                            "id":"row-2",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "unit",
                                    "templateOptions": {
                                        "label": "Unit",
                                        "required": true
                                    }
                                },
                                {
                                    "key": "unitRate",
                                    "type": "input",
                                    "defaultValue": 0,
                                    "templateOptions": {
                                        "label": "Rate",
                                        "required": true,
                                        "type":"number"
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "key": "sacCode",
                                    "type": "input",
                                    "templateOptions": {
                                        "label": "SAC Code",
                                        "required": true,
                                    }
                                },
                                {
                                    "key": "amount",
                                    "type": "input",
                                    "templateOptions": {
                                        "label": "Amount",
                                        "required": true,
                                        "type":"number"
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "key": "startdate",
                                    "type": "datepicker",
                                    "templateOptions": {
                                        "label": "Start Date",
                                        "required": true,
                                    }
                                },
                                {
                                    "key": "enddate",
                                    "type": "datepicker",
                                    "templateOptions": {
                                        "label": "End Date",
                                        "required": true,
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "key": "description",
                                    "type": "textarea",
                                    "templateOptions": {
                                        "label": "Description",
                                        "required": true,
                                        "rows": 6
                                    }
                                },
                            ]
                        },
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "key": "remarks",
                                    "type": "textarea",
                                    "templateOptions": {
                                        "label": "Remarks",
                                        "required": true,
                                        "rows": 6
                                    }
                                },
                            ]
                        }
                    ]
                },
            ],
        },
    },
    "projectStageForm": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'S.No'
            },
            {
                "field": 'stageName',
                "displayName": 'Stage Name'
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
                "field": 'paymentPercentage',
                "displayName": 'Stage Cost(%)'
            },
            {
                "field": 'netAmount',
                "displayName": 'Amount'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "fields": {
            "id": "stagework",
            "label": "Stage Work Details",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "id":"row-1",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "className":"readonly",
                                    "type": "input",
                                    "key": "projectId",
                                    "templateOptions": {
                                        "label": "Project Id",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className":"readonly",
                                    "type": "input",
                                    "key": "projectName",
                                    "templateOptions": {
                                        "label": "Project Name",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className":"readonly",
                                    "type": "select",
                                    "key": "paymentModeId",
                                    "templateOptions": {
                                        "label": "Payment Mode",
                                        "options": [],
                                        "readonly": true
                                    }
                                },
                                {
                                    "className":"readonly",
                                    "type": "input",
                                    "key": "totalAmount",
                                    "templateOptions": {
                                        "label": "Total Cost",
                                        "readonly": true
                                    }
                                },
                                {
                                    "id":"taxfields",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1 field-size-small",
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
                                        },
                                        {
                                            "className": "flex-1 field-size-small",
                                            "type": "select",
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
                                    ]
                                }
                            ]
                        },
                        {
                            "id":"row-2",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "id":"row-1",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "stageName",
                                            "templateOptions": {
                                                "label": "Stage Name",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "key": "sacCode",
                                            "templateOptions": {
                                                "label": "SAC Code",
                                                "options": []
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "datepicker",
                                            "key": "dateToStart",
                                            "templateOptions": {
                                                "label": "Start Date",
                                                "required": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "datepicker",
                                            "key": "dateCompleted",
                                            "templateOptions": {
                                                "label": "Completed Date",
                                                "required": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "id":"row-2",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1 checkbox-outline-none",
                                            "type": "checkbox",
                                            "defaultValue":1,
                                            "key": "percentageWise",
                                            "templateOptions": {
                                                "label": "Percent"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "paymentPercentage",
                                            "templateOptions": {
                                                "label": "Stage Per",
                                                "required": true,
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "stageAmount",
                                            "templateOptions": {
                                                "label": "Stage Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        },
                                        {
                                            "className": "flex-5",
                                            "type": "textarea",
                                            "key": "stageRemarks",
                                            "templateOptions": {
                                                "label": "Remarks",
                                                "rows": 1
                                            }
                                        }
                                    ]
                                },
                                {
                                    "id":"row-3",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "sgstPercent",
                                            "templateOptions": {
                                                "label": "SGST (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "key": "sgstAmt",
                                            "defaultValue":0,
                                            "templateOptions": {
                                                "label": "SGST Amount",
                                                "type": "number",
                                                "readonly":true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "cgstPercent",
                                            "templateOptions": {
                                                "label": "CGST (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "key": "cGSTAmt",
                                            "defaultValue":0,
                                            "templateOptions": {
                                                "label": "CGST Amount",
                                                "type": "number",
                                                "readonly":true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "igstPercent",
                                            "templateOptions": {
                                                "label": "IGST (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "igstAmt",
                                            "templateOptions": {
                                                "label": "IGST Amount",
                                                "type": "number",
                                                "readonly":true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "id":"row-4",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "kfcper",
                                            "templateOptions": {
                                                "label": "KFC (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "kfcAmt",
                                            "templateOptions": {
                                                "label": "KFC Amount",
                                                "type": "number",
                                                "readonly":true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "TDS (%)",
                                                "type": "number",
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "tdsAmount",
                                            "templateOptions": {
                                                "label": "TDS Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "labourWelfarePercent",
                                            "templateOptions": {
                                                "label": "LW (%)",
                                                "type": "number",
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "labourWelfareAmount",
                                            "templateOptions": {
                                                "label": "LW Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        }
                                    ]
                                },
                                {
                                    "id":"row-5",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "discount",
                                            "templateOptions": {
                                                "label": "Discount (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "discountAmt",
                                            "templateOptions": {
                                                "label": "Discount Amount",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly",
                                            "type": "input",
                                            "defaultValue":0,
                                            "key": "netAmount",
                                            "templateOptions": {
                                                "label": "Total Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    }
}