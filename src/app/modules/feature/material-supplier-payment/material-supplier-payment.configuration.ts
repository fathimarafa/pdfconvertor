export const MaterialSupplierPaymentMetadata = {
    "moduleId": " materialsupplierpayment",
    "moduleName": " Material Supplier Payment",
    "displayName": "Material /  Material Supplier Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/SupplierPayment",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'supplierId',
            "displayName": 'Supplier Id'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'paymentdetails',
            "displayName": 'Payment Details'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "paymentDate",
                    "templateOptions": {
                        "label": "Payment Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentMode",
                    "templateOptions": {
                        "label": "Payment Mode",
                        "options": [
                            {
                                "label": "CASH",
                                "value": "CASH"
                            },
                            {
                                "label": "BANK",
                                "value": "BANK"
                            },
                            {
                                "label": "SITE MANAGER",
                                "value": "SITE MANAGER"
                            }
                        ],
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "paymentNo",
                    "templateOptions": {
                        "label": "Payment No:",
                        "required": true
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "withClear",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "With Clear",
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "onlinePayment",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Online Payment",
                    }
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "paymentdetails",
                    "templateOptions": {
                        "label": "Payment Details",
                        "required": true,
                        "rows": 11
                    }
                },
            ]
        },
    ],
    "supplierPaymentDetails": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'purchaseDate',
                "displayName": 'Date'
            },
            {
                "field": 'projectName',
                "displayName": 'Project'
            },
            {
                "field": 'unitName',
                "displayName": 'Unit'
            },
            {
                "field": 'billAmount',
                "displayName": 'Net Amount'
            },
            {
                "field": 'billAmountBalance',
                "displayName": 'Balance Amount'
            },
            {
                "field": 'action',
                "displayName": ''
            }
        ],
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "supplierId",
                        "templateOptions": {
                            "label": "Supplier Id",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1 checkbox-outline-none",
                        "type": "checkbox",
                        "key": "sitemanager",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Site Manager",
                        }
                    }
                ]
            }
        ]
    }

}