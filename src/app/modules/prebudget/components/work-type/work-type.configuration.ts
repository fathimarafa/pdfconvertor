export const CrmWorkTypeMetadata = {
    "moduleId": "prebudgetworktype",
    "moduleName": "Prebudget Work Type",
    "displayName": "Prebudget / Work Type",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/WorkType",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "workTypeName",
            "templateOptions": {
                "label": "Work Type",
                "required": true
            }
        }
    ]
}