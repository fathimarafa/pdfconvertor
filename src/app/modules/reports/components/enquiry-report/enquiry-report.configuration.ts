export const EnquiryReportMetadata = {
    "moduleId": "enquiryreport",
    "moduleName": "Enquiry Report",
    "displayName": "Reports / Enquiry Report",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/EnquiryList",
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