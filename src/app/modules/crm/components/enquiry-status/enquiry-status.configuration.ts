export const EnquiryStatusMetadata = {
    "moduleId": "enquirystatus",
    "moduleName": "EnquiryStatus",
    "displayName": "CRM / Enquiry Status",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/EnquiryStatus",
    "tableColumns": [
        {
            "field": 'enquiryStatusId',
            "displayName": 'SNo'
        },
        {
            "field": 'status',
            "displayName": 'Enquiry Status'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "status",
            "templateOptions": {
                "label": "Enquiry Status",
                "required": true
            }
        }
    ]
}