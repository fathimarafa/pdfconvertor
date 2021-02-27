export const MaterialRegistrationMetadata = {
    "moduleId": "materialregistration",
    "moduleName": "Material Registration",
    "displayName": "Material / Material Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Material",
    "tableColumns": [
        {
            "field": 'materialBrandRegistrationId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialName',
            "displayName": 'Name'
        },
        {
            "field": 'MaterialTypeId',
            "displayName": 'Type'
        },
        {
            "field": 'MaterialBrandId',
            "displayName": 'Brand Name'
        },
        {
            "field": 'MaterialCaategoryId',
            "displayName": 'Category'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "materialName",
                    "templateOptions": {
                        "label": "Material Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "hsnCode",
                    "templateOptions": {
                        "label": "HSN Code",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "materialTypeId",
                    "templateOptions": {
                        "label": "Material Type",
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
                        ],
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
                    "type": "select",
                    "key": "materialCategoryId",
                    "templateOptions": {
                        "label": "Select Material Category",
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
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "materialBrandId",
                    "templateOptions": {
                        "label": "Select Material Brand",
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
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "unitId",
                    "templateOptions": {
                        "label": "Select Unit",
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
                        ],
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
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "openingStock",
                    "templateOptions": {
                        "label": "Opening Stock",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "materialUnitRate",
                    "templateOptions": {
                        "label": "Unit Rate",
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
                    "key": "taxPer",
                    "templateOptions": {
                        "label": "Tax(%)",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "kfcTaxPer",
                    "templateOptions": {
                        "label": "Kfc Tax(%)",
                        "required": true
                    }
                }
            ]
        }
    ],
    "openingStock": {
        "tableColumns": [
            {
                "field": 'projectId',
                "displayName": 'Project Id'
            },
            {
                "field": 'unitId',
                "displayName": 'Unit Id'
            },
            {
                "field": 'stock',
                "displayName": 'Stock'
            },
            {
                "field": 'rate',
                "displayName": 'Rate'
            },
            {
                "field": 'total',
                "displayName": 'Total'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "formFields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "projectId",
                        "templateOptions": {
                            "label": "Project Id",
                            "options": [
                                {
                                    "label": "",
                                    "value": ""
                                },
                                {
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "stock",
                        "templateOptions": {
                            "label": "Stock",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "rate",
                        "templateOptions": {
                            "label": "Unit Rate",
                            "required": true
                        }
                    }
                ]
            }
        ]
    }

}