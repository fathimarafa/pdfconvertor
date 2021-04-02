export const OwnProjectMetadata = {
    "moduleId": "ownproject",
    "moduleName": "Own Project",
    "displayName": "CRM / Own Project",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "OwnProject",
    "tableColumns": [
        {
            "field": 'projectId',
            "displayName": 'S.No'
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
    "childtableColumns": [
        {
            "field": 'projectId',
            "displayName": 'S.No'
        },
    ],
    "formFields": [
        {
            "key": "departmentId",
            "type": "select",
            "templateOptions": {
                "label": "Select department",
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
            "key": "projectTypeId",
            "type": "select",
            "templateOptions": {
                "label": "Select type",
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
            "key": "projectName",
            "templateOptions": {
                "label": "Project Name",
                "required": true
            }
        },
        {
            "type": "textarea",
            "key": "projectDescription",
            "templateOptions": {
                "label": "Description",
                "required": true,
                "rows": 5
            }
        },
        {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
                "label": "Date",
                "required": true,
            }
        },
        {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
                "label": "Date",
                "required": true,
            }
        },
    ],
    "childFormFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "unitStartDate",
                    "templateOptions": {
                        "label": "Start Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitEndDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "End Date",
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
                    "key": "type",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Type",
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
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Floor",
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
                    "key": "unitNo",
                    "type": "select",
                    "templateOptions": {
                        "label": "Unit No",
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
                    "type": "input",
                    "key": "totalArea",
                    "templateOptions": {
                        "label": "Sqaure Feet",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "ratePerArea",
                    "templateOptions": {
                        "label": "Rate Per Area",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "areaTax",
                    "templateOptions": {
                        "label": "Tax %",
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
                    "key": "description",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "landCost",
                            "templateOptions": {
                                "label": "Last Cost",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "landTax",
                            "templateOptions": {
                                "label": "Tax %",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "unitCost",
                            "templateOptions": {
                                "label": "Unit Cost",
                                "required": true
                            }
                        }
                    ]
                }
            ]
        },
    ]

}