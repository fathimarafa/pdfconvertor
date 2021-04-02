export const UnitRegistrationMetadata = {
    "moduleId": "unitregistration",
    "moduleName": "Unit Registration",
    "displayName": "Material / Unit Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Unit",
    "tableColumns": [
        {
            "field": 'unitId',
            "displayName": 'SNo'
        },
        {
            "field": 'unitShortName',
            "displayName": 'Short Name'
        },
        {
            "field": 'unitLongName',
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