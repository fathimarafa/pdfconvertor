export const ApproveLevelMetadata = {
    "moduleId": "company",
    "moduleName": "ApproveLevel",
    "displayName": "CRM / Approve Level",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/LevelSetting",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'menuId',
            "displayName": 'Form Name'
        },
        {
            "field": 'teamId',
            "displayName": 'Team'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "levelTableColumns": [
        {
            "field": 'formlevel',
            "displayName": 'Level'
        },
        {
            "field": 'userId',
            "displayName": 'User'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "formFields": []
}