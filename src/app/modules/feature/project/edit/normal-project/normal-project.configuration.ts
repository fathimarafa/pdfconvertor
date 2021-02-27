export const NormalProjectMetadata = {
    "moduleId": "project-enquiry",
    "moduleName": "Project Enquiry",
    "displayName": "CRM / Enquiry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "Project",
    "tableColumns": [],
    "formFields-tab1": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Project Name",
                        "required": true,
                    }
                },
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "New Project Id",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "value 1"
                            },
                            {
                                "label": "type 1",
                                "value": "value 1"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectDescription",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "key": "projectTypeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Category",
                                "required": true,
                                "options": [
                                    {
                                        "label": "type 1",
                                        "value": "value 1"
                                    },
                                    {
                                        "label": "type 1",
                                        "value": "value 1"
                                    }
                                ]
                            }
                        },
                        {
                            "key": "startDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Start Date",
                                "required": true,
                            }
                        },
                        {
                            "key": "endDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "End Date",
                                "required": true,
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "formFields-tab2": [
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
                    "key": "post",
                    "type": "input",
                    "templateOptions": {
                        "label": "Post",
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
                    "key": "address",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Address",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "pin",
                            "templateOptions": {
                                "label": "Pin",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "phoneNumber",
                            "templateOptions": {
                                "label": "Phone",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "mobileNumber",
                            "templateOptions": {
                                "label": "Mobile",
                                "required": true
                            }
                        }
                    ]
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "gsT_No",
                    "templateOptions": {
                        "label": "GSTIN No.",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "emailId",
                    "type": "input",
                    "templateOptions": {
                        "label": "Email Id",
                        "required": true
                    }
                }
            ]
        },
    ],
    "formFields-tab3": [
        {
            "type": "input",
            "key": "pin",
            "templateOptions": {
                "label": "Total Area",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "phoneNumber",
            "templateOptions": {
                "label": "Rate Per Area",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "mobileNumber",
            "templateOptions": {
                "label": "Amount",
                "required": true
            }
        },
        {
            "type": "select",
            "key": "mobileNumber",
            "templateOptions": {
                "label": "Payment Mode",
                "required": true,
                "options": [
                    {
                        "label": "",
                        "value": ""
                    }
                ]
            }
        }
    ]

}