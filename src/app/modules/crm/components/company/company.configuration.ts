export const CompanyMetadata = {
    "moduleId": "company",
    "moduleName": "Company",
    "displayName": "Master / Company",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Company",
    "tableColumns": [
        {
            "field": 'companyId',
            "displayName": 'S.No'
        },
        {
            "field": 'companyName',
            "displayName": 'Name'
        },
        {
            "field": 'mobileNumber',
            "displayName": 'Mobile'
        },
        {
            "field": 'emailId',
            "displayName": 'Email'
        },
        {
            "field": 'companyAddress1',
            "displayName": 'Address'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "is-branch-checkbox",
                    "type": "checkbox",
                    "key": "isBranch",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Branch",
                    }
                },
                {
                    "className": "flex-1",
                    "key": "parentCompanyid",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select parent company",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            },
                            {
                                "label": "type 3",
                                "value": "3"
                            }
                        ]
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!model.isBranch",
                    },
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "companyName",
                    "templateOptions": {
                        "label": "Company Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "post",
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
                    "key": "companyTypeID",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select type",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            },
                            {
                                "label": "type 3",
                                "value": "3"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "pin",
                    "templateOptions": {
                        "label": "Pin",
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
                    "key": "companyAddress1",
                    "templateOptions": {
                        "label": "Address Line 1",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "phoneNumber",
                            "templateOptions": {
                                "label": "Phone number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "mobileNumber",
                            "templateOptions": {
                                "label": "Mobile number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "emailId",
                            "templateOptions": {
                                "label": "Email Id",
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
                    "type": "textarea",
                    "key": "companyAddress2",
                    "templateOptions": {
                        "label": "Address Line 2",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "tinNo",
                            "templateOptions": {
                                "label": "TIN number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "cstNo",
                            "templateOptions": {
                                "label": "CST number",
                                "required": true
                            }
                        },
                        {
                            "key": "taxType",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select tax type",
                                "options": [
                                    {
                                        "label": "type 1",
                                        "value": "type 1"
                                    },
                                    {
                                        "label": "GST",
                                        "value": "GST"
                                    },
                                    {
                                        "label": "type 3",
                                        "value": "type 3"
                                    }
                                ],
                                "required": true
                            }
                        }
                    ]
                }
            ]
        }
    ]

}