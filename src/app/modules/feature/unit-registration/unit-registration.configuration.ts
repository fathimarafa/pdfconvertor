export const UnitRegistrationMetadata = {
    "moduleId": "unitregistration",
    "moduleName": "Unit Registration",
    "displayName": "Material / Unit Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Material/UnitRegistration",
    "tableColumns": [
        {
            "field": 'UnitRegistrationId',
            "displayName": 'SNo'
        },
        {
            "field": 'UnitShortName',
            "displayName": 'Short Name'
        },
        {
            "field": 'UnitLongName',
            "displayName": 'Long Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "className": "flex-1",
            "type": "input",
            "key": "unitShortName",
            "templateOptions": {
                "label": "Short Name",
                "required": true
            }
        },
        {
            "className": "flex-1",
            "type": "input",
            "key": "unitLongName",
            "templateOptions": {
                "label": "Long Name",
                "required": true
            }
        }
    ]
}