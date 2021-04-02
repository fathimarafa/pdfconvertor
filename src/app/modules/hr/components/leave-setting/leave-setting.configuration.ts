export const LeaveCreationMetadata = {
    "moduleId": "FinancialYearId",
    "moduleName": "Leave Setting",
    "displayName": "Build / Leave Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "LeaveSetting",
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
            "key": "FinancialYearId",
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
            "key": "yearly_cls",
            "templateOptions": {
                "label": "Casual Leaves in a Year",
                "required": true
            }
        }, {
            "type": "input",
            "key": "yearly_hpls",
            "templateOptions": {
                "label": "Half Pay Leaves in a Year",
                "required": true
            }
        }, {
            "type": "input",
            "key": "monthly_cls",
            "templateOptions": {
                "label": "Casual Leaves in a Month",
                "required": true
            }
        }, {
            "type": "input",
            "key": "monthly_hpls",
            "templateOptions": {
                "label": "Half Pay Leaves in a Month",
                "required": true
            }
        },

    ]

}