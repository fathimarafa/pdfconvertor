export const MaterialCategoryRegistrationMetadata = {
    "moduleId": "materialcategoryregistration",
    "moduleName": "Material Category Registration",
    "displayName": "Material / Material Category Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "MaterialCategoryRegistration",
    "tableColumns": [
        {
            "field": 'materialCategoryId',
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