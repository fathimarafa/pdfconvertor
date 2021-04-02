export const MaterialIssueMetadata = {
    "moduleId": "materialissue",
    "moduleName": "MaterialIssue",
    "displayName": "Material / Material Issue",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialUsage",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'usageDate',
            "displayName": 'Usage Date'
        },
        {
            "field": 'usageType',
            "displayName": 'Usage Type'
        },
        {
            "field": 'workCategory',
            "displayName": 'Work Category'
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
                        "label": "Project",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "usageDate",
                    "templateOptions": {
                        "label": "Usage Date",
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
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "options": []
                    }
                }
            ],
            "hideExpression": true
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "options": []
                    },

                }
            ],
            "hideExpression": true
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "usageType",
                    "templateOptions": {
                        "label": "Usage Type",
                        "options": [
                            {
                                "label": "contractor",
                                "value": "CONTRACTOR"
                            },
                            {
                                "label": "labour",
                                "value": "LABOUR"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workCategory",
                    "templateOptions": {
                        "label": "Work Category",
                        "options": [
                            {
                                "label": "type1",
                                "value": 1
                            },
                            {
                                "label": "type2",
                                "value": 2
                            }
                        ],
                        "required": true
                    }
                }
            ]
        }
    ],
    "materialUsageDetails": {
        "tableColumns": [
            {
                "field": 'materialUsageDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'materialId',
                "displayName": 'Material'
            },
            {
                "field": 'quantity',
                "displayName": 'Quantity'
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
                        "key": "materialId",
                        "templateOptions": {
                            "label": "Material",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantity",
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
            }
        ]
    }

}