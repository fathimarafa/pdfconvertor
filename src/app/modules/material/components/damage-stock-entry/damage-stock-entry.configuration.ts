export const DamageStockEntryMetadata = {
    "moduleId": "damageStockEntry",
    "moduleName": "DamageStockEntry",
    "displayName": "Material / Damage Stock Entry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/DamageStock",
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
            "field": 'unitId',
            "displayName": 'Unit'
        },
        {
            "field": 'materialId',
            "displayName": 'Material'
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
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "project-unit",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select project",
                        "required": true,
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
                        "options": []
                    }
                }
            ]
        },
        {
            "id": "block-floor",
            "fieldGroupClassName": "display-flex readonly",
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
            ]
        },
        {
            "id":"material-row",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "materialId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select material",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "stock",
                    "type": "input",
                    "templateOptions": {
                        "label": "Damage Stock",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "rate",
                    "type": "input",
                    "templateOptions": {
                        "label": "Rate",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        },
        {
            "className": "checkbox-outline-none",
            "type": "checkbox",
            "key": "approvalStatus",
            "defaultValue": 0,
            "templateOptions": {
                "label": "With Approve",
            }
        }
    ]
}