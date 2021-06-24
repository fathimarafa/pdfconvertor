export const MaterialStockEntryMetadata = {
    "moduleId": "materialstockentry",
    "moduleName": "Material Stock Entry",
    "displayName": "Material / Stock Entry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Purchase",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'purchaseOrderNo',
            "displayName": 'Purchase Order No'
        },
        {
            "field": 'purchaseDate',
            "displayName": 'Purchase Date'
        },
        {
            "field": 'supplierName',
            "displayName": 'Supplier'
        },
        {
            "field": 'remark',
            "displayName": 'Remarks'
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
                        "label": "Select project",
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
                        "options": [],
                        "disabled": true,
                        "required": true
                    },
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "disabled": true,
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "disabled": true,
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "supplierId",
                    "templateOptions": {
                        "label": "Select supplier name",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "purchaseDate",
                    "templateOptions": {
                        "label": "Purchase Date",
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
                    "type": "select",
                    "key": "taxarea",
                    "defaultValue": 'INTRA',
                    "templateOptions": {
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
                        "label": "Tax Area",
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentModeId",
                    "templateOptions": {
                        "label": "Payment Mode",
                        "options": [
                            {
                                "label": "Credit",
                                "value": 1
                            },
                            {
                                "label": "Cash",
                                "value": 2
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "siteManagerId",
                    "templateOptions": {
                        "label": "Site Manager",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "category",
                    "templateOptions": {
                        "label": "Work Category",
                        "options": []
                    }
                },
                {
                    "className": "flex-2",
                    "type": "textarea",
                    "key": "remark",
                    "templateOptions": {
                        "label": "Remarks",
                        "rows": 1
                    }
                }
            ]
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'purchaseOrderDetailId',
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
            "field": 'total',
            "displayName": 'Total'
        }
    ],
    "transferChargeFormfields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
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
                                    "defaultValue":0,
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
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Transportation Percent",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "loadingUnloadingCharge",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Loading Unloading Charge",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "loadingUnloadingPer",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Loading Unloading Percent",
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
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "otherCharges",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Other Charges",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "otherChargesPer",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Other Charges Percent",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "gstPer",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "GST Percentage",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small readonly",
                                    "type": "input",
                                    "key": "gstAmount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "GST Amount",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "kfcPer",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "KFC Percentage",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small readonly",
                                    "type": "input",
                                    "key": "kfcAmount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "KFC Amount",
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
                                    "key": "sgst",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "SGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "cgst",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "CGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "igst",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "IGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "kfc",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "KFC",
                                        "type": "number"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "row-2",
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "className": "field-size-small",
                            "type": "input",
                            "defaultValue":0,
                            "key": "amountPaidAdvance",
                            "templateOptions": {
                                "label": "Advance Recovery",
                                "type": "number",
                                "required": true
                            }
                        },
                        {
                            "className": "field-size-small",
                            "type": "input",
                            "defaultValue":0,
                            "key": "billdiscount",
                            "templateOptions": {
                                "label": "Discount",
                                "type": "number",
                                "required": true
                            }
                        },
                        {
                            "className": "field-size-small readonly",
                            "type": "input",
                            "defaultValue":0,
                            "key": "netamount",
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
    ],
    "purchaseOrderTableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'orderNo',
            "displayName": 'Order No:'
        },
        // {
        //     "field": 'dateOrdered',
        //     "displayName": 'Order Date'
        // },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'supplierPreffered',
            "displayName": 'Supplier'
        }
    ],
    "materialTableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'materialName',
            "displayName": 'Name'
        },
        // {
        //     "field": 'materialTypeId',
        //     "displayName": 'Type'
        // },
        {
            "field": 'materialBrandId',
            "displayName": 'Brand Name'
        },
        {
            "field": 'materialCategoryId',
            "displayName": 'Category'
        },
    ]
}