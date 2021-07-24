export const ProjectSpecificationMetadata = {
    "moduleId": "projectspecification",
    "moduleName": "Project Specification",
    "displayName": "Prebudget / Project Specification",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ProjectSpecification",
    "tableColumns": {
        "project-details": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'projectId',
                "displayName": 'Project'
            },
            {
                "field": 'taxArea',
                "displayName": 'Tax Area'
            },
            {
                "field": 'taxType',
                "displayName": 'Tax Type'
            },
            {
                "field": 'taxAmount',
                "displayName": 'Tax Amount'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "specification-details": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'spec_Id',
                "displayName": 'Spec ID'
            },
            {
                "field": 'specNumber',
                "displayName": 'Spec Number'
            },
            {
                "field": 'specName',
                "displayName": 'Spec Name'
            },
            {
                "field": 'specDescription',
                "displayName": 'Spec Description'
            },
            {
                "field": 'workTypeName',
                "displayName": 'workTypeName'
            },
            {
                "field": 'specUnit',
                "displayName": 'Spec Unit'
            },
            {
                "field": 'ratePerUnit',
                "displayName": 'Rate Per Unit'
            }
            // {
            //     "field": 'select',
            //     "displayName": ''
            // }
        ],
        "project-specification-details": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'spec_Id',
                "displayName": 'Spec ID'
            },
            {
                "field": 'specNumber',
                "displayName": 'Spec Number'
            },
            {
                "field": 'specName',
                "displayName": 'Spec Name'
            },
            {
                "field": 'specDescription',
                "displayName": 'Spec Description'
            },
            {
                "field": 'category',
                "displayName": 'Category'
            },
            {
                "field": 'specUnit',
                "displayName": 'SpecUnits'
            },
            {
                "field": 'ratePerUnit',
                "displayName": 'RatePerUnit'
            },
            {
                "field": 'deptRatePerUnit',
                "displayName": 'DeptRatePerUnit'
            },
            {
                "field": 'quotedRatePerUnit',
                "displayName": 'QuotedRatePerUnit'
            },
            {
                "field": 'quantity',
                "displayName": 'Quantity'
            },
            {
                "field": 'tax',
                "displayName": 'Tax'
            },
            {
                "field": 'taxAmount',
                "displayName": 'TaxAmount'
            },
            {
                "field": 'specAmount',
                "displayName": 'Spec Amount'
            },
            {
                "field": 'deptAmount',
                "displayName": 'Dept Amount'
            },
            {
                "field": 'quotedAmount',
                "displayName": 'Quoted Amount'
            }
        ],
    },
    "formFields": [
        {
            "id": "project-details",
            "label": "Project Details",
            "hasTable": false,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "departmentId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Department",
                                "options": [],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "specNumber",
                            "templateOptions": {
                                "label": "Estimation ID",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "datepicker",
                            "key": "specNumber",
                            "templateOptions": {
                                "label": "Date",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxarea",
                            "type": "select",
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
                        }
                    ]
                },
                {
                    "id": "row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 test",
                            "key": "projectId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Project",
                                "required": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "blockId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select block",
                                "required": true,
                                "disabled": true,
                                "options": []
                            },

                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "floorId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select floor",
                                "required": true,
                                "disabled": true,
                                "options": []
                            },

                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "unitId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select unit",
                                "required": true,
                                "disabled": true,
                                "options": []
                            },

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
                            "disabled": true,
                            "templateOptions": {
                                "label": "Project Name"
                            }
                        },
                        {
                            "className": "flex-3 readonly",
                            "type": "textarea",
                            "key": "projectDescription",
                            "disabled": true,
                            "templateOptions": {
                                "rows": 1,
                                "label": "Project Description"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "specification-details",
            "label": "Specification Details",
            "hasTable": true,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-2",
                            "type": "input",
                            "key": "specNameOrNumber",
                            "templateOptions": {
                                "label": "Search By Spec Name/Number",
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "workTypeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Search By Work Type",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "categoryId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Category",
                                "options": []
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "project-specification-details",
            "label": "Project Specification Details",
            "hasTable": true,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "specItemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Labour",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type": "number"
                            }
                        }
                    ]
                }
            ],
        }
    ],
    "projectFormfields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1 test",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "disabled": true,
                        "options": []
                    },

                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "disabled": true,
                        "options": []
                    },

                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "disabled": true,
                        "options": []
                    },

                }
            ]
        }
    ],
    "projectTableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'specNumber',
            "displayName": 'Specification Number'
        },
        {
            "field": 'specName',
            "displayName": 'Specification Name'
        },
        {
            "field": 'specDescription',
            "displayName": 'Specification Description'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}