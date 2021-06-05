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
                        "type": "number"
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
                    "className": "flex-1 readonly",
                    "key": "blockIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To block",
                        "required": true,
                        "disabled": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To floor",
                        "required": true,
                        "disabled": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitIdTo",
                    "type": "select",
                    "templateOptions": {
                        "label": "To unit",
                        "required": true,
                        "disabled": true,
                        "options": []
                    }
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
            }
        ]
    },
    "transferCharges": {
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex readonly",
                "fieldGroup": [
                    {
                        "id": "row-1",
                        "className": "flex-4",
                        "fieldGroup": [
                            {
                                "id": "row-1",
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
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
                                        "defaultValue": 0,
                                        "key": "miscellaneousExpense",
                                        "templateOptions": {
                                            "label": "Additional Expense",
                                            "required": true,
                                            "type": "number"
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "defaultValue": 0,
                                        "key": "miscellaneousExpensePer",
                                        "templateOptions": {
                                            "label": "Additional Expense Per",
                                            "required": true,
                                            "type": "number"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "row-2",
                        "className": "readonly flex-1 field-font-bold",
                        "type": "input",
                        "key": "netAmount",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Net Amount",
                            "type": "number",
                            "readonly": true
                        }
                    }
                ]
            }
        ]
    },
    "transferTableColumns": [
        {
            "field": 'id',
            "displayName": ''
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
    ]

}