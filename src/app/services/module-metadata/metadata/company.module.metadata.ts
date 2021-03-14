export const CompanyMetadata = {
    "moduleId": "company",
    "moduleName": "Company",
    "displayName": "Master / Company",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
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
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "CompanyName",
                    "templateOptions": {
                        "label": "Company Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "Post",
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
                    "key": "CompanyTypeID",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select type",
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
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "Pin",
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
                    "key": "CompanyAddress1",
                    "templateOptions": {
                        "label": "Address Line 1",
                        "required": true,
                        "rows": 10
                    }
                },
                {
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "PhoneNumber",
                            "templateOptions": {
                                "label": "Phone number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "MobileNumber",
                            "templateOptions": {
                                "label": "Mobile number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "EmailId",
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
                    "key": "CompanyAddress2",
                    "templateOptions": {
                        "label": "Address Line 2",
                        "required": true,
                        "rows": 10
                    }
                },
                {
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "TINNo",
                            "templateOptions": {
                                "label": "TIN number",
                                "required": true
                            }
                        },
                        {
                            "type": "input",
                            "key": "CSTNo",
                            "templateOptions": {
                                "label": "CST number",
                                "required": true
                            }
                        },
                        {
                            "key": "TaxType",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select tax type",
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
                        }
                    ]
                }
            ]
        }
    ]

}