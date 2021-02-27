export const EnquiryForMetadata = {
    "moduleId": "enquiryfor",
    "moduleName": "EnquiryFor",
    "displayName": "CRM / Enquiry For",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/EnquiryFor",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'enquiry_For',
            "displayName": 'Enquiry For'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "enquiry_For",
            "templateOptions": {
                "label": "Enquiry For",
                "required": true
            }
        }
    ]
}