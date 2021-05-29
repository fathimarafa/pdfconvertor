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
            "field": 'projectId',
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
            "field": 'supplierId',
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
                    "key": "indentedDate",
                    "templateOptions": {
                        "label": "Enter date",
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
                                "value": "1"
                            },
                            {
                                "label": "Cash",
                                "value": "2"
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
                    "key": "remarks",
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
                    "className": "flex-4",
                    "fieldGroup": [
                        {
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
                                        "label": "Transportation Percent",
                                        "required": true,
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "loadingUnloadingCharge",
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
                                    "templateOptions": {
                                        "label": "Loading Unloading Percent",
                                        "required": true,
                                        "type": "number"
                                    }
                                }
                            ]
                        },
                        {
                            "fieldGroupClassName": "display-flex",
                            "fieldGroup": [
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "otherCharges",
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
                                    "templateOptions": {
                                        "label": "GST Amount",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "kfcPer",
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
                                    "templateOptions": {
                                        "label": "KFC Amount",
                                        "readonly": true
                                    }
                                }
                            ]
                        },
                        {
                            "fieldGroupClassName": "display-flex",
                            "fieldGroup": [
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "sgst",
                                    "templateOptions": {
                                        "label": "SGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "cgst",
                                    "templateOptions": {
                                        "label": "CGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "igst",
                                    "templateOptions": {
                                        "label": "IGST",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className": "flex-1 field-size-small",
                                    "type": "input",
                                    "key": "kfc",
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
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "className": "field-size-small",
                            "type": "input",
                            "key": "transportationCharge",
                            "templateOptions": {
                                "label": "Advance Recovery",
                                "type": "number",
                                "required": true
                            }
                        },
                        {
                            "className": "field-size-small",
                            "type": "input",
                            "key": "transportationCharge",
                            "templateOptions": {
                                "label": "Discount",
                                "type": "number",
                                "required": true
                            }
                        },
                        {
                            "className": "field-size-small readonly",
                            "type": "input",
                            "key": "transportationCharge",
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