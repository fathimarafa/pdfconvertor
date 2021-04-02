export const MaterialSupplierAdvanceMetadata = {
    "moduleId": "materialsupplieradvance",
    "moduleName": "MaterialSupplierAdvance",
    "displayName": "Material / Material Supplier Advance",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/SupplierAdvance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'supplierId',
            "displayName": 'Name'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'advanceAmount',
            "displayName": 'Advance Amount'
        },
        {
            "field": 'narration',
            "displayName": 'Description'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id":"row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "supplierId",
                    "templateOptions": {
                        "label": "Name",
                        "options": [],
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
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "withClear",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "With Clear",
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
                    "key": "advanceAmount",
                    "templateOptions": {
                        "label": "Advance Amount",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "advanceRecoveryBalance",
                    "templateOptions": {
                        "label": "Advance Recovery Balance",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "paymentNo",
                    "templateOptions": {
                        "label": "Payment No:",
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
                    "type": "datepicker",
                    "key": "paymentDate",
                    "templateOptions": {
                        "label": "Payment Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-2",
                    "type": "textarea",
                    "key": "narration",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 10
                    }
                }
            ]
        }
    ]
}