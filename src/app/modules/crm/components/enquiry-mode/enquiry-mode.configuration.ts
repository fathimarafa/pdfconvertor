export const EnquiryModeMetadata = {
    "moduleId": "enquirymode",
    "moduleName": "EnquiryMode",
    "displayName": "CRM / Enquiry Mode",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/EnquiryMode",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'mode',
            "displayName": 'Mode of Enquiry'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "mode",
            "templateOptions": {
                "label": "Mode of Enquiry",
                "required": true
            }
        }
    ]
}