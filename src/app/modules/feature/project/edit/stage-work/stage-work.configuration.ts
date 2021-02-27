// consultancyId
// consultancyName
// paymentMode - paymentModeId
// totalCost
// taxType

// stageName
// unitCost
// grossAmount
// taxArea
// tds
// lw

// sgst
// cgst
// igst
// kfc
// startDate

// completeDate
// discount
// stageNetAmount
// remarks


export const StageWorkMetadata = {
    "moduleId": "project",
    "moduleName": "Project",
    "displayName": "CRM / Project",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "Project",
    "tableColumns": [
        {
            "field": 'stageName',
            "displayName": 'Stage Name'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'projectDescription',
            "displayName": 'Project Description'
        },
        {
            "field": 'projectTypeId',
            "displayName": 'Type'
        },
        {
            "field": 'departmentId',
            "displayName": 'Department'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "key": "consultancyId",
            "type": "select",
            "templateOptions": {
                "label": "Consultancy Id",
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
            "key": "consultancyName",
            "type": "input",
            "templateOptions": {
                "label": "Consultancy Name",
                "required": true
            }
        },
        {
            "key": "paymentMode",
            "type": "select",
            "templateOptions": {
                "label": "Payment Mode",
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
            "type": "input",
            "key": "totalCost",
            "templateOptions": {
                "label": "Total Cost",
                "required": true
            }
        },
        {
            "type": "select",
            "key": "taxType",
            "templateOptions": {
                "label": "Tax Type",
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
    ],
    "childFormFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "unitStartDate",
                    "templateOptions": {
                        "label": "Stage Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "input",
                    "templateOptions": {
                        "label": "SGST",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Complete Date",
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
                    "type": "input",
                    "key": "unitStartDate",
                    "templateOptions": {
                        "label": "Unit Cost",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "input",
                    "templateOptions": {
                        "label": "CGST",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "input",
                    "templateOptions": {
                        "label": "Discount",
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
                    "type": "input",
                    "key": "unitStartDate",
                    "templateOptions": {
                        "label": "Gross Amount",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "input",
                    "templateOptions": {
                        "label": "IGST",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "input",
                    "templateOptions": {
                        "label": "Stage Net Amount",
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
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "unitStartDate",
                            "templateOptions": {
                                "label": "Tax Area",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "unitStartDate",
                            "templateOptions": {
                                "label": "TDS",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "unitStartDate",
                            "templateOptions": {
                                "label": "LW",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "key": "unitEndDate",
                            "type": "input",
                            "templateOptions": {
                                "label": "KFC",
                                "required": true
                            }
                        },
                        {
                            "key": "unitEndDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Start Date",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 11
                    }
                }
            ]
        }
    ]
}

