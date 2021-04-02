export const MaterialCategoryRegistrationMetadata = {
    "moduleId": "materialcategoryregistration",
    "moduleName": "Material Category Registration",
    "displayName": "Material / Material Category Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialCategory",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'materialCategoryName',
            "displayName": 'Category Name'
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
            "key": "materialCategoryName",
            "templateOptions": {
                "label": "Category Name",
                "required": true
            }
        }
    ]
}