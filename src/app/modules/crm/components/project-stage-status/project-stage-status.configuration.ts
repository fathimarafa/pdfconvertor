export const ProjectStageStatusMetadata = {
    "moduleId": "stagestatus",
    "moduleName": "Stage Status",
    "displayName": "CRM / Stage Status",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ProjectStage",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'stageName',
            "displayName": 'Stage Name'
        },
        {
            "field": 'stageRemarks',
            "displayName": 'Stage Remarks'
        },
        {
            "field": 'stageStatus',
            "displayName": 'Stage Status'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1 readonly",
                    "key": "projectId",
                    "type": "input",
                    "templateOptions": {
                        "label": "Project ID",
                        "readonly": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "type": "input",
                    "key": "stageName",
                    "templateOptions": {
                        "label": "Stage Name",
                        "readonly": true
                    }
                },
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "dateToStart",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Start Date"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "dateCompleted",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "End Date"
                    }
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "dateCompleted",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Work Completion Date"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "dateDue",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Payment Due Date"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "stageStatusId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Current Status",
                        "options": [
                            { "label": 'Pending', "value": 1 },
                            { "label": 'Completed', "value": 2 },
                            { "label": 'Lag', "value": 3 }
                        ]
                    }
                }
            ]
        },
    ]
}