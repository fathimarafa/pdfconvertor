export const MaterialIndentCreationMetadata = {
    "moduleId": "MaterialIndentCreation",
    "moduleName": "MaterialIndentCreation",
    "displayName": "Material / Material Indent Creation",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Indent",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'materialId',
            "displayName": 'Item'
        },
        {
            "field": 'quantityRequired',
            "displayName": 'Required Quantity'
        },
        {
            "field": 'requiredDate',
            "displayName": 'Urgency'
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
                    "key": "indentTypeId",
                    "templateOptions": {
                        "label": "Indent Type",
                        "required": true,
                        "options": [
                            {
                                "label": "material",
                                "value": 1
                            },
                            {
                                "label": "sub-contract",
                                "value": 2
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Select project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "supplierPreferred",
                    "templateOptions": {
                        "label": "Select supplier name",
                        "required": true,
                        "options": []
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
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "indentedDate",
                    "templateOptions": {
                        "label": "Enter date",
                        "required": true
                    }
                },
                {
                    "className": "flex-2 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "quotation",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "For Quotation",
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
                    "key": "indentCategoryId",
                    "templateOptions": {
                        "label": "Category",
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
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "materialId",
                    "templateOptions": {
                        "label": "Select items",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "quantityRequired",
                    "templateOptions": {
                        "label": "Requested Quantity",
                        "required": true,
                        "type":"number"
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
                    "key": "requiredDate",
                    "templateOptions": {
                        "label": "Urgency",
                        "required": true
                    }
                },
                {
                    "className": "flex-2",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 5
                    }
                }
            ]
        },
        {
            "className":"checkbox-outline-none",
            "type": "checkbox",
            "key": "nextLevel",
            "defaultValue": 0,
            "templateOptions": {
                "label": "Next Level",
            }
        },
    ]
}