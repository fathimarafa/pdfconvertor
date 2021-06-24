export const LabourWorkRateSettingMetadata = {
    "moduleId": "labourworkratesetting",
    "moduleName": "Labour Workrate Setting",
    "displayName": "Build / Labour Workrate Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/LabourWorkRate",
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
                        "label": "Labour",
                        "value": 1
                    },
                    {
                        "label": "Sub Contractor",
                        "value": 2
                    },
                    {
                        "label": "Foreman",
                        "value": 3
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
                "options": []
            }
        },
        {
            "type": "input",
            "key": "rate",
            "templateOptions": {
                "label": "Rate",
                "type": "number",
                "required": true
            }
        }
    ]
}