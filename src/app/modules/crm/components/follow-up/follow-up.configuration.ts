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
            "field": 'enquiryNo',
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
            "key": "followupdate",
            "type": "datepicker",
            "templateOptions": {
                "label": "Date",
                "required": true,
            }
        },
        {
            "type": "textarea",
            "key": "remarks",
            "templateOptions": {
                "label": "Remarks",
                "required": true,
                "rows": 5
            }
        },
        {
            "type": "textarea",
            "key": "feedback",
            "templateOptions": {
                "label": "FeedBack",
                "required": true,
                "rows": 5
            }
        },
        {
            "key": "status",
            "type": "select",
            "templateOptions": {
                "label": "Status",
                "options": [
                    {
                        "label": "type 1",
                        "value": 1
                    },
                    {
                        "label": "type 2",
                        "value": 2
                    },
                    {
                        "label": "type 3",
                        "value": 3
                    }
                ],
                "required": true
            }
        },
        {
            "key": "nextfollowup",
            "type": "datepicker",
            "templateOptions": {
                "label": "Date",
                "required": true,
            }
        }
    ]
}