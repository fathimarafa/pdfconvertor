export const BasicWorkCategoryMetadata = {
    "moduleId": "basicworkcategory",
    "moduleName": "Basic Work Category",
    "displayName": "Basic / Work Category",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/WorkCategory",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'workCategoryName',
            "displayName": 'Category Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "workCategoryName",
            "templateOptions": {
                "label": "Category Name",
                "required": true
            }
        }
    ]
}