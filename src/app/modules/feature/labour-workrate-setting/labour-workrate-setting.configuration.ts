export const LabourWorkRateSettingMetadata = {
    "moduleId": "labourworkratesetting",
    "moduleName": "Labour Workrate Setting",
    "displayName": "Build / Labour Workrate Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "LabourWorkrate",
    "tableColumns": [
        {
            "field": 'labourWorkrateId',
            "displayName": 'S.No'
        },
        {
            "field": 'specItemTypeId',
            "displayName": 'Category'
        },
        {
            "field": 'labourWorkName',
            "displayName": 'Work Name'
        },
        {
            "field": 'unitId',
            "displayName": 'Unit    '
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
            "key": "specItemTypeId",
            "type": "select",
            "templateOptions": {
                "label": "Select category",
                "required": true,
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
                ]
            }
        },
        {
            "type": "input",
            "key": "labourWorkName",
            "templateOptions": {
                "label": "Work Name",
                "required": true
            }
        },
        {
            "key": "unitId",
            "type": "select",
            "templateOptions": {
                "label": "Select unit",
                "required": true,
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
                ]
            }
        },
        {
            "type": "input",
            "key": "rate",
            "templateOptions": {
                "label": "Rate",
                "required": true
            }
        }
    ]
}