export const MaterialTransferRequestMetadata = {
    "moduleId": "materialtransferequest",
    "moduleName": "Material Transfer Request",
    "displayName": "Material / Material Transfer Request",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialTransfer",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'companyId',
            "displayName": 'From Company'
        },
        {
            "field": 'branchId',
            "displayName": 'From Branch'
        },
        {
            "field": 'toCompany',
            "displayName": 'To Company'
        },
        {
            "field": 'transferDate',
            "displayName": 'Transfer Date'
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
                    "className": "flex-2 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "multicompany",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Multi Company",
                    }
                },
                {
                    "className": "flex-1",
                    "key": "transferDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Transfer Date",
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
                    "key": "projectIdFrom",
                    "type": "select",
                    "templateOptions": {
                        "label": "From Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitIdFrom",
                    "type": "select",
                    "templateOptions": {
                        "label": "From unit",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "blockIdFrom",
                    "type": "select",
                    "templateOptions": {
                        "label": "From Block",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "floorIdFrom",
                    "type": "select",
                    "templateOptions": {
                        "label": "From floor",
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
                    "key": "projectIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To unit",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "blockIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To block",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "floorIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To floor",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        }
    ],
    "transferDetail": {
        "tableColumns": [
            {
                "field": 'transferDetailId',
                "displayName": 'SNo'
            },
            {
                "field": 'materialId',
                "displayName": 'Material'
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
                        "key": "tax",
                        "templateOptions": {
                            "label": "Tax",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
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
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "miscellaneousExpense",
                        "templateOptions": {
                            "label": "Miscellaneous Expense",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "miscellaneousExpensePer",
                        "templateOptions": {
                            "label": "Miscellaneous Expense Per",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
            }
        ]
    }

}