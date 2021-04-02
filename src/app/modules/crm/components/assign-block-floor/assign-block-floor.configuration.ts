export const AssignBlockFloorMetadata = {
    "moduleId": "assignblockfloors",
    "moduleName": "Assign Block Floors",
    "displayName": "CRM / Assign Block Floors",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ProjectBlockFloorAssign",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'blockId',
            "displayName": 'Block'
        },
        {
            "field": 'floorId',
            "displayName": 'Floor'
        },
        {
            "field": 'isActive',
            "displayName": 'Active'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "key": "projectId",
            "type": "select",
            "templateOptions": {
                "label": "Select project",
                "options": [
                    {
                        "label": "admin",
                        "value": "1"
                    },
                    {
                        "label": "user",
                        "value": "2"
                    }
                ],
                "required": true
            }
        },
        {
            "key": "blockId",
            "type": "select",
            "templateOptions": {
                "label": "Select block",
                "options": [
                    {
                        "label": "admin",
                        "value": "1"
                    },
                    {
                        "label": "user",
                        "value": "2"
                    }
                ],
                "required": true
            }
        },
        {
            "key": "floorId",
            "type": "select",
            "templateOptions": {
                "label": "Select floor",
                "multiple": true,
                "options": [
                    {
                        "label": "admin",
                        "value": "1"
                    },
                    {
                        "label": "user",
                        "value": "2"
                    }
                ],
                "required": true
            }
        }
    ]
}