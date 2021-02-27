export const AddLabourToProjectMetadata = {
    "moduleId": "EmployeeId",
    "moduleName": "Add labour to Project",
    "displayName": "Build / Add labour to Project",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "AddLabourToProject",
    "tableColumns": [
        {
            "field": 'xx',
            "displayName": 'Employee Name'
        },
        {
            "field": 'xx',
            "displayName": 'Wage/Day'
        },
        {
            "field": 'xx',
            "displayName": 'Labour Head'
        },
        {
            "field": 'xx',
            "displayName": 'Status'
        }
    ],
    "formFields": [
        {
            "key": "EmployeeId",
            "type": "select",
            "templateOptions": {
                "label": "Head Type",
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
            "type": "input",
            "key": "SalaryItemHeadName",
            "templateOptions": {
                "label": "Head Name",
                "required": true
            }
        },
        {
            "key": "CalculateOn",
            "type": "select",
            "templateOptions": {
                "label": "Calculate On",
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
            "key": "CalculationMode",
            "type": "select",
            "templateOptions": {
                "label": "Calculation Mode",
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
            "type": "input",
            "key": "Upperlimit",
            "templateOptions": {
                "label": "Salary Upper Limit",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "Remarks",
            "templateOptions": {
                "label": "Remarks",
                "required": true
            }
        }
    ]

}