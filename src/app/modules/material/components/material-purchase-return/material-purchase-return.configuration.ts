export const MaterialPurchaseReturnMetadata = {
    "moduleId": "materialpurchasereturn",
    "moduleName": "materialpurchasereturn",
    "displayName": "Material / Material Purchase Return",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/PurchaseReturn",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'returnDate',
            "displayName": 'Return Date'
        },
        {
            "field": 'purchaseReturnTypeId',
            "displayName": 'Return Type'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'supplierId',
            "displayName": 'Supplier'
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
                    "type": "select",
                    "key": "purchaseReturnTypeId",
                    "templateOptions": {
                        "label": "Return Type",
                        "required": true,
                        "options": [
                            {
                                "label":"Damage/Scrap",
                                "value":1
                            },
                            {
                                "label":"Stock",
                                "value":2
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "returnDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Return Date",
                        "required": true,
                    }
                },
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "supplierId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Supplier",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "debitNoteNo",
                    "type": "input",
                    "templateOptions": {
                        "label": "Debit Note No",
                        "required": true
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
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Unit",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Block",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Floor",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        }
    ],
    "purchaseReturnDetail": {
        "tableColumns": [
            {
                "field": 'purchaseReturnId',
                "displayName": 'SNo'
            },
            {
                "field": 'materialId',
                "displayName": 'Item'
            },
            {
                "field": 'quantity',
                "displayName": 'Quantity'
            },
            {
                "field": 'rate',
                "displayName": 'Rate'
            },
            {
                "field": 'tax',
                "displayName": 'Tax'
            },
            {
                "field": 'total',
                "displayName": 'Total'
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
                        "type": "select",
                        "key": "materialId",
                        "templateOptions": {
                            "label": "Material Id",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantity",
                        "templateOptions": {
                            "label": "Quantity",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "rate",
                        "templateOptions": {
                            "label": "Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "discount",
                        "templateOptions": {
                            "label": "Discount",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tax",
                        "templateOptions": {
                            "label": "Tax",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "rate",
                        "templateOptions": {
                            "label": "Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "discount",
                        "templateOptions": {
                            "label": "Discount",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tax",
                        "templateOptions": {
                            "label": "Tax",
                            "required": true,
                            "type": "number"
                        }
                    }
                ],
                "hideExpression":true
            }
        ]
    },
    "transferCharges": {
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "transportationCharge",
                        "templateOptions": {
                            "label": "Transportation Charge",
                            "type": "number",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "transportationPer",
                        "templateOptions": {
                            "label": "Transportation Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "loadingUnloadingCharge",
                        "templateOptions": {
                            "label": "Loading Unloading Charge",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "loadingUnloadingPer",
                        "templateOptions": {
                            "label": "Loading Unloading Per",
                            "required": true,
                            "type": "number"
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
                        "key": "otherCharges",
                        "templateOptions": {
                            "label": "Other Charges",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "otherChargesPer",
                        "templateOptions": {
                            "label": "Other Charges Per",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
            }
        ]
    }

}