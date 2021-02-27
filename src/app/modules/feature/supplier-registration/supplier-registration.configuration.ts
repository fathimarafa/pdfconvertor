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
                    "className": "flex-1",
                    "type": "input",
                    "key": "supplierName",
                    "templateOptions": {
                        "label": "Supplier Name",
                        "required": true
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
                    "type": "input",
                    "key": "phoneNumber",
                    "templateOptions": {
                        "label": "Phone Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "mobileNumber",
                    "templateOptions": {
                        "label": "Mobile Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
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
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "tinNo",
                    "templateOptions": {
                        "label": "TIN Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "gstNo",
                    "templateOptions": {
                        "label": "GST Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "openingBalance",
                    "templateOptions": {
                        "label": "Opening Balance",
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
                    "key": "supplierAddress1",
                    "templateOptions": {
                        "label": "Communication Address",
                        "required": true,
                        "rows": 10
                    }
                },
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "supplierAddress2",
                    "templateOptions": {
                        "label": "Permanent Address",
                        "required": true,
                        "rows": 10
                    }
                }
            ]
        }
    ]
}