export const MaterialSupplierAdvanceMetadata = {
    "moduleId": "materialsupplieradvance",
    "moduleName": "MaterialSupplierAdvance",
    "displayName": "Payment and Receipt / Supplier Advance",
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
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-3",
                    "type": "select",
                    "key": "supplierId",
                    "templateOptions": {
                        "label": "Supplier Name",
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
                    "className": "flex-1 checkbox-outline-none field-size-small",
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
            "id": "row-2",
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
                    "key": "paymentBy",
                    "templateOptions": {
                        "label": "Bank",
                        "options": []
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
                    "key": "narration",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "id": "row-1",
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "paymentNo",
                            "templateOptions": {
                                "label": "Cheque/ DD No:",
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "datepicker",
                            "key": "chequeDate",
                            "templateOptions": {
                                "label": "Cheque Date"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "sitemanagerId",
                    "templateOptions": {
                        "label": "Site Manager",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "advanceRecoveryBalance",
                    "templateOptions": {
                        "label": "Balance",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "advanceAmount",
                    "templateOptions": {
                        "label": "Advance Amount",
                        "required": true,
                        "type": "number"
                    }
                }
            ]
        }
    ]
}