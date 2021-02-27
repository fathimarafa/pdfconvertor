export const MaterialBrandRegistrationMetadata = {
    "moduleId": "materialbrandregistration",
    "moduleName": "Material Brand Registration",
    "displayName": "Material / Material Brand Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "MaterialBrandRegistration",
    "tableColumns": [
        {
            "field": 'materialBrandRegistrationId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialBrandName',
            "displayName": 'Short Name'
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
            "key": "materialBrandName",
            "templateOptions": {
                "label": "Short Name",
                "required": true
            }
        }
    ]
}