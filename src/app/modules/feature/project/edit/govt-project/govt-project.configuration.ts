
export const GovernmentProjectMetadata = {
    "moduleId": "project-enquiry",
    "moduleName": "Project Enquiry",
    "displayName": "CRM / Enquiry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "BuildExeCRM/api/Project",
    "tableColumns": [],
    "formFields": [
        {
            "label": "Project Details",
            "fields": [
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
                            "type": "input",
                            "templateOptions": {
                                "label": "New Project Id",
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
                                // {
                                //     "key": "projectTypeId",
                                //     "type": "select",
                                //     "templateOptions": {
                                //         "label": "Category",
                                //         "required": true,
                                //         "options": [
                                //             {
                                //                 "label": "type 1",
                                //                 "value": "value 1"
                                //             },
                                //             {
                                //                 "label": "type 1",
                                //                 "value": "value 1"
                                //             }
                                //         ]
                                //     }
                                // },
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
            ]
        },
        {
            "label": "Tender Details",
            "fields": [
                {
                    "key": "dateEntered",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date of Entry",
                        "required": true,
                    }
                },
                {
                    "key": "tenderDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Tender Date",
                        "required": true,
                    }
                },
                {
                    "key": "tenderTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Tender Type",
                        "required": true,
                        "options": [
                            {
                                "label": "Percentage",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            }
                        ]
                    }
                },
                {
                    "key": "tenderNumber",
                    "type": "input",
                    "templateOptions": {
                        "label": "Tender No.",
                        "required": true,
                    }
                }
            ]
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
            ]
        }
    ]
}
