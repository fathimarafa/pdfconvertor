export const PartBillMetadata = {
    "moduleId": "partbill",
    "moduleName": "Part Bill",
    "displayName": "CRM / Part Bill",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/PartBill",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'billNo',
            "displayName": 'Bill No'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'advanceAmount',
            "displayName": 'Advance Amount'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "detailsTableColumn": [
        {
            "field": 'scheduleNo',
            "displayName": 'ScheduleNo'
        },
        {
            "field": 'specName',
            "displayName": 'SpecName'
        },
        {
            "field": 'sacCode',
            "displayName": 'SACCode'
        },
        {
            "field": 'unitShortName',
            "displayName": 'UnitShortName'
        },
        {
            "field": 'partRatePerUnit',
            "displayName": 'RatePerUnit'
        },
        {
            "field": 'scheduledQty',
            "displayName": 'Scheduled Qty'
        },
        {
            "field": 'previousQty',
            "displayName": 'Previous Qty'
        },
        {
            "field": 'currentQty',
            "displayName": 'Current Qty'
        },
        {
            "field": 'totalQty',
            "displayName": 'Total Qty'
        },
        {
            "field": 'tax',
            "displayName": 'Tax'
        },
        {
            "field": 'currentTax',
            "displayName": 'Current Tax'
        },
        {
            "field": 'previousAmount',
            "displayName": 'Previous Amount'
        },
        {
            "field": 'currentAmount',
            "displayName": 'Current Amount'
        },
        {
            "field": 'totalAmount',
            "displayName": 'Total Amount'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
    ],
    "selectSpecTableColumn": [
        {
            "field": 'id',
            "displayName": 'ScheduleNo'
        },
        {
            "field": 'specNumber',
            "displayName": 'Spec Number'
        },
        {
            "field": 'specName',
            "displayName": 'Spec Name'
        },
        {
            "field": 'scheduledQty',
            "displayName": 'Scheduled Qty'
        },
        {
            "field": 'unit',
            "displayName": 'Unit'
        },
        {
            "field": 'ratePerUnit',
            "displayName": 'Rate Per Unit'
        },
        {
            "field": 'tax',
            "displayName": 'Tax'
        },
        {
            "field": 'taxAmount',
            "displayName": 'Tax Amount'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id":"bill-details",
            "label": "Bill Details",
            "fields":[
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-2",
                            "key": "taxTypeId",
                            "type": "radio",
                            "templateOptions": {
                                "label": "Tax Type",
                                "options": [
                                    {
                                        "label": "B2B",
                                        "value": 1
                                    },
                                    {
                                        "label": "Estimate",
                                        "value": 2
                                    },
                                    {
                                        "label": "B2C",
                                        "value": 3
                                    }
                                ],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "billNo",
                            "type": "input",
                            "templateOptions": {
                                "label": "Bill No"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "voucherNumber",
                            "type": "input",
                            "templateOptions": {
                                "label": "Voucher Number",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "partbillNo",
                            "type": "input",
                            "templateOptions": {
                                "label": "PartBill No:",
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
                            "key": "projectId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Project",
                                "required": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "blockId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select block",
                                "required": true,
                                "disabled": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "floorId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select floor",
                                "required": true,
                                "disabled": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "key": "unitId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Select unit",
                                "required": true,
                                "disabled": true,
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
                            "key": "fromDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "From Date",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "toDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "To Date",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "billDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Bill Date",
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1 field-size-small",
                            "key": "dueDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Due Date",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "id": "row-4",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "billType",
                            "type": "select",
                            "templateOptions": {
                                "label": "Bill Type",
                                "options": [
                                    {
                                        "label": "Specification",
                                        "value": 1
                                    },
                                    {
                                        "label": "Schedule",
                                        "value": 2
                                    },
                                    {
                                        "label": "WeeklyBill",
                                        "value": 3
                                    }
                                ],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "taxarea",
                            "type": "select",
                            "defaultValue":"INTRA",
                            "templateOptions": {
                                "label": "Bill Type",
                                "options": [
                                    {
                                        "label": "INTRA",
                                        "value": "INTRA"
                                    },
                                    {
                                        "label": "INTER",
                                        "value": "INTER"
                                    }
                                ],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1 checkbox-outline-none",
                            "key": "withLogo",
                            "type": "checkbox",
                            "defaultValue": true,
                            "templateOptions": {
                                "label": "Print With Logo"
                            }
                        },
                        {
                            "className": "flex-1 checkbox-outline-none",
                            "key": "withZero",
                            "type": "checkbox",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Print Without Zero Quantity"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id":"spec",
            "label": "Specification",
            "fields":[
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
                }
            ]
        },
        {
            "id":"bill-amount-details",
            "label": "Bill Amount Details",
            "fields":[
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "id": "row-1",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "textarea",
                                    "key": "shippingDetails",
                                    "templateOptions": {
                                        "label": "Shipping Details",
                                        "rows": 8
                                    }
                                },
                                {
                                    "type": "textarea",
                                    "key": "remarks",
                                    "templateOptions": {
                                        "label": "Remarks",
                                        "rows": 9
                                    }
                                },
                            ]
                        },
                        {
                            "id": "row-2",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "id": "row-1",
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
                                    "id": "row-2",
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
                                        }
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
                                    "id": "row-5",
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
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "row-3",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "className": "flex-1 field-size-small readonly",
                                    "type": "input",
                                    "defaultValue": 0,
                                    "key": "grossAmount",
                                    "templateOptions": {
                                        "label": "Gross Amount",
                                        "readonly": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "id": "row-2",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1 field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "gstper",
                                            "templateOptions": {
                                                "label": "GST (%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "gstAmt",
                                            "templateOptions": {
                                                "label": "GST Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        }
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
                                            "key": "tdsPercent",
                                            "templateOptions": {
                                                "label": "LD (%)",
                                                "type": "number",
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "tdsAmount",
                                            "templateOptions": {
                                                "label": "LD Amount",
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
                                            "className": "flex-1 field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "retentionPercent",
                                            "templateOptions": {
                                                "label": "Retention (%)",
                                                "type": "number",
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "retentionAmount",
                                            "templateOptions": {
                                                "label": "Retention Amount",
                                                "type": "number",
                                                "readonly": true
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "row-4",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "id": "row-1",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
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
                                    "className": "flex-1",
                                    "type": "input",
                                    "defaultValue": 0,
                                    "key": "advanceAmount",
                                    "templateOptions": {
                                        "label": "Advance Amount Paid",
                                        "type": "number"
                                    }
                                },
                                {
                                    "id": "row-3",
                                    "fieldGroupClassName": "display-flex",
                                    "fieldGroup": [
                                        {
                                            "className": "flex-1 field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "advanceInterestPer",
                                            "templateOptions": {
                                                "label": "Advance Interest(%)",
                                                "type": "number"
                                            }
                                        },
                                        {
                                            "className": "flex-1 readonly field-size-small",
                                            "type": "input",
                                            "defaultValue": 0,
                                            "key": "advanceInterestAmt",
                                            "templateOptions": {
                                                "label": "Advance Interest",
                                                "type": "number"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "className": "flex-1 readonly",
                                    "type": "input",
                                    "defaultValue": 0,
                                    "key": "netAmount",
                                    "templateOptions": {
                                        "label": "Net Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}