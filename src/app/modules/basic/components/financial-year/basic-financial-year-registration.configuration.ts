export const BasicFinancialYearRegistrationMetadata = {
    "moduleId": "basicfinancialyearregistration",
    "moduleName": "Basic Financial Year Registration",
    "displayName": "Basic / Financial Year Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/FinancialYear",
    "tableColumns": [
        {
            "field": 'financialYearId',
            "displayName": 'SNo'
        },
        {
            "field": 'financial_Year',
            "displayName": 'Financial Year'
        },
        {
            "field": 'start_date',
            "displayName": 'Start Date'
        },
        {
            "field": 'end_date',
            "displayName": 'End Date'
        },
        {
            "field": 'status',
            "displayName": 'Status'
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
                    "type": "datepicker",
                    "key": "start_date",
                    "templateOptions": {
                        "label": "Start Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "end_date",
                    "templateOptions": {
                        "label": "End Date",
                        "required": true
                    }
                }
            ]
        },
    ]
}