export const MaterialRecieveMetadata = {
    "moduleId": "materialrecieve",
    "moduleName": "Material Recieve",
    "displayName": "Material / Material Recieve",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialRecieve",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'companyId',
            "displayName": 'Company'
        },
        {
            "field": 'projectIdTo',
            "displayName": 'To Project'
        },
        {
            "field": 'transferId',
            "displayName": 'Transfer Id'
        },
        {
            "field": 'receiveDate',
            "displayName": 'Received Date'
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
                    "key": "transferId",
                    "type": "input",
                    "templateOptions": {
                        "label": "Transfer No",
                        "required": true,
                        "type":"number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "receiveDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Recieve Date",
                        "required": true,
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
        }
    ],
    "recieptDetail": {
        "tableColumns": [
            {
                "field": 'recieptDetailId',
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