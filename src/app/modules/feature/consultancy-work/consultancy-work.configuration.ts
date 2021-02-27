export const ConsultancyWorkMetadata = {
    "moduleId": "consultancywork",
    "moduleName": "Consultancy Work",
    "displayName": "CRM / Consultancy Work",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ConsultancyWork",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'workName',
            "displayName": 'Work Name'
        },
        {
            "field": 'unit',
            "displayName": 'Unit'
        },
        {
            "field": 'unitRate',
            "displayName": 'Rate'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "workName",
                    "templateOptions": {
                        "label": "Work Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "sac_Code",
                    "templateOptions": {
                        "label": "SAC Code",
                        "required": true
                    }
                },
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "unit",
                    "templateOptions": {
                        "label": "Unit",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "unitRate",
                    "templateOptions": {
                        "label": "Unit Rate",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 5
                    }
                }
            ]
        }
    ]
}