export const ProjectEnquiryMetadata = {
    "moduleId": "project-enquiry",
    "moduleName": "Project Enquiry",
    "displayName": "CRM / Enquiry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'name',
            "displayName": 'Name'
        },
        {
            "field": 'mobile',
            "displayName": 'Mobile'
        },
        {
            "field": 'email',
            "displayName": 'Email'
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
                    "key": "EnquiryDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date",
                        "required": true,
                    }
                },
                {
                    "key": "AssignStaffid",
                    "type": "select",
                    "templateOptions": {
                        "label": "Attended Staff",
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "key": "ModeofEnquiryid",
                    "type": "select",
                    "templateOptions": {
                        "label": "Mode of Enquiry",
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ],
                        "required": true
                    }
                },

                {
                    "key": "Enquiryfor",
                    "type": "select",
                    "templateOptions": {
                        "label": "Enquiry For",
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "type": "input",
                    "key": "EnquiryId",
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
                            "key": "FirstName",
                            "templateOptions": {
                                "label": "First Name",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "LastName",
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
                            "key": "GSTNo",
                            "templateOptions": {
                                "label": "GST Number",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "Sex",
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
                            "key": "Address",
                            "templateOptions": {
                                "label": "Address",
                                "required": true,
                                "rows": 5
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "textarea",
                            "key": "OfficeAddress",
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
                            "key": "Area",
                            "templateOptions": {
                                "label": "Area",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "Email",
                            "templateOptions": {
                                "label": "Email",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "Phone",
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
                            "key": "OfficePhone",
                            "templateOptions": {
                                "label": "Phone",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "Mobile",
                            "templateOptions": {
                                "label": "Alternate No:",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-3",
                            "type": "input",
                            "key": "Mobile2",
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
                    "key": "CustReq",
                    "templateOptions": {
                        "label": "Custom Requirement",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "type": "textarea",
                    "key": "ProjectDesc",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "type": "textarea",
                    "key": "Remarks",
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
                            "key": "Status",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Enquiry Status",
                                "options": [
                                    {
                                        "label": "type 1",
                                        "value": "type 1"
                                    },
                                    {
                                        "label": "type 2",
                                        "value": "type 2"
                                    },
                                    {
                                        "label": "type 3",
                                        "value": "type 3"
                                    }
                                ],
                                "required": true
                            }
                        },
                        {
                            "key": "NextStaff",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Next Assigned Staff",
                                "options": [
                                    {
                                        "label": "type 1",
                                        "value": "type 1"
                                    },
                                    {
                                        "label": "type 2",
                                        "value": "type 2"
                                    },
                                    {
                                        "label": "type 3",
                                        "value": "type 3"
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
                            "key": "Marketingteam",
                            "className": "flex-1",
                            "type": "select",
                            "templateOptions": {
                                "label": "Marketing Team",
                                "options": [
                                    {
                                        "label": "type 1",
                                        "value": "type 1"
                                    },
                                    {
                                        "label": "type 2",
                                        "value": "type 2"
                                    },
                                    {
                                        "label": "type 3",
                                        "value": "type 3"
                                    }
                                ],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "ReminderDate",
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