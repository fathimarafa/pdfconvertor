export const SupplierRegistrationMetadata = {
    "moduleId": "supplierregistration",
    "moduleName": "Supplier Registration",
    "displayName": "Material / Supplier Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Supplier",
    "tableColumns": [
        {
            "field": 'supplierRegistrationId',
            "displayName": 'S.No'
        },
        {
            "field": 'supplierName',
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
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "supplierName",
                            "templateOptions": {
                                "label": "Supplier Name",
                                "required": true
                            }
                        },
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
                            "key": "post",
                            "templateOptions": {
                                "label": "Post",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "supplierAddres1",
                    "templateOptions": {
                        "label": "Communication Address",
                        "required": true,
                        "rows": 11
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
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
                },
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "supplierAddres2",
                    "templateOptions": {
                        "label": "Permanent Address",
                        "required": true,
                        "rows": 11
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "tinNo",
                    "templateOptions": {
                        "label": "TIN number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "gstNo",
                    "templateOptions": {
                        "label": "GST number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "openingBalance",
                    "templateOptions": {
                        "label": "Opening Balance",
                        "required": true,
                        "type":"number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "openingType",
                    "templateOptions": {
                        "label": "Opening Type",
                        "options": [
                            {
                                "label": "debit",
                                "value": "D"
                            },
                            {
                                "label": "credit",
                                "value": "C"
                            }
                        ],
                        "required": true
                    }
                }
            ]
        }
    ]
}