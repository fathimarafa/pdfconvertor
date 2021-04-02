export const DepartmentMetadata = {
    "moduleId": "department",
    "moduleName": "Department",
    "displayName": "Master / Department",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Department",
    "tableColumns": [
        {
            "field": 'departmentId',
            "displayName": 'S.No'
        },
        {
            "field": 'departmentShortName',
            "displayName": 'Short Name'
        },
        {
            "field": 'departmentLongName',
            "displayName": 'Long Name'
        },
        {
            "field": 'departmentCategory',
            "displayName": 'Category'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "key": "departmentCategory",
            "type": "select",
            "templateOptions": {
                "label": "Select category",
                "required": true,
                "options": [
                    {
                        "label": "GOVERNMENT",
                        "value": "GOVERNMENT"
                    },
                    {
                        "label": "PRIVATE",
                        "value": "PRIVATE"
                    }
                ]
            }
        },
        {
            "type": "input",
            "key": "departmentShortName",
            "templateOptions": {
                "label": "Short name",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "departmentLongName",
            "templateOptions": {
                "label": "Long name",
                "required": true
            }
        }
    ]
}