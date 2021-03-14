export const MaterialBrandRegistrationMetadata = {
    "moduleId": "materialbrandregistration",
    "moduleName": "Material Brand Registration",
    "displayName": "Material / Material Brand Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Brand",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'materialBrandName',
            "displayName": 'Material Brand'
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
                "label": "Material Brand",
                "required": true
            }
        }
    ]
}