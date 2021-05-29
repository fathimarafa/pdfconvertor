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
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'materialName',
            "displayName": 'Name'
        },
        {
            "field": 'materialTypeId',
            "displayName": 'Type'
        },
        {
            "field": 'materialBrandId',
            "displayName": 'Brand Name'
        },
        {
            "field": 'materialCategoryId',
            "displayName": 'Category'
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
                    "key": "materialID",
                    "templateOptions": {
                        "label": "Material ID",
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
                                "label": "capital",
                                "value": 1
                            },
                            {
                                "label": "consumable",
                                "value": 2
                            }
                        ],
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "materialCategoryId",
                    "templateOptions": {
                        "label": "Select Material Category",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "materialBrandId",
                    "templateOptions": {
                        "label": "Select Material Brand",
                        "options": [],
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "unitId",
                    "templateOptions": {
                        "label": "Select Unit",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [

                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "openigStock",
                    "templateOptions": {
                        "label": "Opening Stock",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "materialUnitRate",
                    "templateOptions": {
                        "label": "Unit Rate",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        },
        {
            "id": "row-6",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "taxPer",
                    "templateOptions": {
                        "label": "Tax(%)",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "kfcPer",
                    "templateOptions": {
                        "label": "Kfc Tax(%)",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        },
        {
            "id": "row-7",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "landingCost",
                    "templateOptions": {
                        "label": "Landing Cost",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        }
    ],
    "openingStock": {
        "tableColumns": [
            {
                "field": 'materialId',
                "displayName": 'SNo'
            },
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
                "id": "row-1",
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
                                    "label": "proj1",
                                    "value": "1"
                                },
                                {
                                    "label": "proj2",
                                    "value": "2"
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
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "rate",
                        "templateOptions": {
                            "label": "Unit Rate",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "id": "row-2",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 readonly",
                        "key": "blockId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Select block",
                            "required": true,
                            "disabled": true,
                            "options": []
                        } 
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
                        }
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
                        }
                    }
                ]
            }
        ]
    }

}