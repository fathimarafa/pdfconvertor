export const FollowUpMetadata = {
    "moduleId": "follow-up",
    "moduleName": "Follow Up",
    "displayName": "CRM / Follow up",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "BuildExeCRM/api/Followup",
    "tableColumns": [
        {
            "field": 'followupId',
            "displayName": 'S.No'
        },
        {
            "field": 'enquiryId',
            "displayName": 'Enquiry No'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'feedback',
            "displayName": 'Feedback'
        },
        {
            "field": 'nextfollowup',
            "displayName": 'Next Follow Up'
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
                    "className": "flex-1",
                    "key": "followupdate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "attendedstaff",
                    "type": "select",
                    "templateOptions": {
                        "label": "Attended Staff",
                        "options": [],
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 5
                    }
                },
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "feedback",
                    "templateOptions": {
                        "label": "FeedBack",
                        "required": true,
                        "rows": 5
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
                    "key": "status",
                    "type": "select",
                    "templateOptions": {
                        "label": "Status",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "nextfollowup",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Next Follow Up Date",
                        "required": true,
                    }
                }
            ]
        }
    ]
}