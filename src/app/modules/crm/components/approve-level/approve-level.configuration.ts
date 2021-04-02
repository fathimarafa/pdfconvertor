export const ApproveLevelMetadata = {
    "moduleId": "company",
    "moduleName": "ApproveLevel",
    "displayName": "CRM / Approve Level",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint":"BuildExeCRM/api/Level",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'formName',
            "displayName": 'Form Name'
        },
        {
            "field": 'formlevel',
            "displayName": 'Approve Levels'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": []
}