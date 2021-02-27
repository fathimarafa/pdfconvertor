export const ProjectEnquiryMetadata = {
    "moduleId": "project-enquiry",
    "moduleName": "Project Enquiry",
    "displayName": "CRM / Enquiry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "BuildExeCRM/api/Enquiry",
    "tableColumns": [
        {
            "field": 'enquiryId',
            "displayName": 'S.No'
        },
        {
            "field": 'enquiryDate',
            "displayName": 'Date of Enquiry'
        },
        {
            "field": 'enquiryfor',
            "displayName": 'Enquiry For'
        },
        {
            "field": 'firstName',
            "displayName": 'Client Name'
        },
        {
            "field": 'enquiryNo',
            "displayName": 'Enquiry Id'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "label": "Enquiry Details",
            "fields": [
                {
                    "key": "enquiryDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date",
                        "required": true,
                    }
                },
                {
                    "key": "assignStaffid",
                    "type": "select",
                    "templateOptions": {
                        "label": "Attended Staff",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "key": "modeofEnquiryid",
                    "type": "select",
                    "templateOptions": {
                        "label": "Mode of Enquiry",
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
                    "key": "enquiryfor",
                    "type": "select",
                    "templateOptions": {
                        "label": "Enquiry For",
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
                    "type": "input",
                    "key": "enquiryNo",
                    "templateOptions": {
                        "label": "Enquiry ID",
                        "required": true
                    }
                }
            ],
        },
        {
            "label": "Client Details",
            "fields": [
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "firstName",
                            "templateOptions": {
                                "label": "First Name",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "lastName",
                            "templateOptions": {
                                "label": "Last Name",
                                "required": true
                            }
                        },
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "gstno",
                            "templateOptions": {
                                "label": "GST Number",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "sex",
                            "templateOptions": {
                                "label": "Sex",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "textarea",
                            "key": "address",
                            "templateOptions": {
                                "label": "Address",
                                "required": true,
                                "rows": 5
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "textarea",
                            "key": "officeAddress",
                            "templateOptions": {
                                "label": "Address Line 2",
                                "required": true,
                                "rows": 5
                            }
                        },
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "area",
                            "templateOptions": {
                                "label": "Area",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "emailId",
                            "templateOptions": {
                                "label": "Email",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "phone",
                            "templateOptions": {
                                "label": "Contact No:",
                                "required": true
                            }
                        },
                    ]
                },

                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "officePhone",
                            "templateOptions": {
                                "label": "Phone",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "mobile",
                            "templateOptions": {
                                "label": "Alternate No:",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "mobile2",
                            "templateOptions": {
                                "label": "Alternate No:2",
                                "required": true
                            }
                        }
                    ]
                }
            ],
        },
        {
            "label": "Requirement",
            "fields": [
                {
                    "type": "textarea",
                    "key": "custReq",
                    "templateOptions": {
                        "label": "Custom Requirement",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "type": "textarea",
                    "key": "projectDesc",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "key": "status",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Enquiry Status",
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
                            "key": "nextStaff",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Next Assigned Staff",
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
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "key": "marketingteam",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Marketing Team",
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
                            "className": "flex-1",
                            "key": "reminderDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Reminder Date",
                                "required": true,
                            }
                        },
                    ]
                }
            ],
        },
    ]
}