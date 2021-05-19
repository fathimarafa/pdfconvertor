export const AdditionalBillGenerationMetadata = {
    "moduleId": "additionalbill",
    "moduleName": "Additional Bill",
    "displayName": "CRM / Additional Bill",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/AdditionalBill",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'billNumber',
            "displayName": 'Bill Number'
        },
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'dueDate',
            "displayName": 'Due Date'
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
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Project ID",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "unitId",
                    "templateOptions": {
                        "label": "Unit ID",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "clientName",
                    "templateOptions": {
                        "label": "Client Name"
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
                    "key": "billNumber",
                    "templateOptions": {
                        "label": "Bill Number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "billDate",
                    "templateOptions": {
                        "label": "Bill Date"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dueDate",
                    "templateOptions": {
                        "label": "Due Date"
                    }
                }
            ]
        }
    ],
    "additonalBillDetails": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'itemDescription',
                "displayName": 'Particular'
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
                "field": 'amount',
                "displayName": 'Amount'
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
                        "className": "flex-1 field-size-small",
                        "type": "select",
                        "key": "taxInclusive",
                        "templateOptions": {
                            "label": "Tax Type",
                            "options": [
                                {
                                    "label": "Tax Inclusive",
                                    "value": "Y"
                                },
                                {
                                    "label": "Tax Exclusive",
                                    "value": "N"
                                }
                            ],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "select",
                        "key": "taxArea",
                        "templateOptions": {
                            "label": "Tax Area",
                            "options": [
                                {
                                    "label": "INTER",
                                    "value": "INTER"
                                },
                                {
                                    "label": "INTRA",
                                    "value": "INTRA"
                                }
                            ],
                            "required": true
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
                        "type": "textarea",
                        "key": "itemDescription",
                        "templateOptions": {
                            "label": "Particular",
                            "rows": 1
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "textarea",
                        "key": "workDescription",
                        "templateOptions": {
                            "label": "Description",
                            "rows": 1
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": "saccode",
                        "templateOptions": {
                            "label": "SAC Code"
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "rate",
                        "templateOptions": {
                            "label": "Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "quantity",
                        "templateOptions": {
                            "label": "Quantity",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 field-size-small readonly",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "amount",
                        "templateOptions": {
                            "label": "Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                   
                ]
            },
            {
                "id": "row-3",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "sgstPercent",
                        "templateOptions": {
                            "label": "SGST (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "key": "sgstAmt",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "SGST Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "cgstPercent",
                        "templateOptions": {
                            "label": "CGST (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "key": "cGSTAmt",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "CGST Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "igstPercent",
                        "templateOptions": {
                            "label": "IGST (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "igstAmt",
                        "templateOptions": {
                            "label": "IGST Amount",
                            "type": "number",
                            "readonly": true
                        }
                    }
                ]
            },
            {
                "id": "row-4",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "kfcper",
                        "templateOptions": {
                            "label": "KFC (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "kfcAmt",
                        "templateOptions": {
                            "label": "KFC Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "tdsPercent",
                        "templateOptions": {
                            "label": "TDS (%)",
                            "type": "number",
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "tdsAmount",
                        "templateOptions": {
                            "label": "TDS Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "labourWelfarePercent",
                        "templateOptions": {
                            "label": "LW (%)",
                            "type": "number",
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "labourWelfareAmount",
                        "templateOptions": {
                            "label": "LW Amount",
                            "type": "number",
                            "readonly": true
                        }
                    }
                ]
            },
            {
                "id": "row-5",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "discount",
                        "templateOptions": {
                            "label": "Discount (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "discountAmt",
                        "templateOptions": {
                            "label": "Discount Amount",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "netAmount",
                        "templateOptions": {
                            "label": "Total Amount",
                            "type": "number",
                            "readonly": true
                        }
                    },
                ]
            }
        ]
    }
}