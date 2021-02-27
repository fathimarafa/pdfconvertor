export const SalaryHeadCreationMetadata = {
    "moduleId": "salaryHeadTypeId",
    "moduleName": "Salary Head Creation",
    "displayName": "Build / Salary Head Creation",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "SalaryHeadCreation",
    "tableColumns": [
        {
            "field": 'salaryItemHeadName',
            "displayName": 'Head Name'
        },
        {
            "field": 'calculateOn',
            "displayName": 'Calculate On'
        },
        {
            "field": 'CalculationMode',
            "displayName": 'Calculation Mode'
        },
        {
            "field": 'Remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'Upperlimit',
            "displayName": 'Upper Limit'
        }
    ],
    "formFields": [
        {
            "key": "SalaryHeadTypeId",
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