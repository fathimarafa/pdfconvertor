export const MaterialPurchaseOrderMetadata = {
    "moduleId": "materialpurchaseorder",
    "moduleName": "Material Purchase Order",
    "displayName": "Material / Material Purchase Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/PurchaseOrder",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'orderNo',
            "displayName": 'Order No:'
        },
        {
            "field": 'dateOrdered',
            "displayName": 'Order Date'
        },
        {
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'supplierName',
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
                    "type": "input",
                    "key": "orderNo",
                    "templateOptions": {
                        "label": "Order ID",
                        "required": true,
                        "type":"number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateOrdered",
                    "templateOptions": {
                        "label": "Order Date",
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
                    "key": "itemId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Item",
                        "required": true,
                        "options": []
                    }  
                },
                {
                    "className": "flex-1",
                    "key": "supplierPreffered",
                    "type": "select",
                    "templateOptions": {
                        "label": "Supplier",
                        "required": true,
                        "options": []
                    }  
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "contactperson",
                    "templateOptions": {
                        "label": "Contact Person",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "contactNo",
                    "templateOptions": {
                        "label": "Contact No",
                        "required": true
                    }
                }
            ]
        }
    ],
    "purchaseOrderDetail": {
        "tableColumns": [
            {
                "field": 'purchaseOrderDetailId',
                "displayName": 'SNo'
            },
            {
                "field": 'materialName',
                "displayName": 'Item'
            },
            {
                "field": 'quantityPurchased',
                "displayName": 'Quantity'
            },
            {
                "field": 'itemRate',
                "displayName": 'Rate'
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
                        "type": "input",
                        "key": "quantityOrdered",
                        "templateOptions": {
                            "label": "Ordered Quantity",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantityPurchased",
                        "templateOptions": {
                            "label": "Purchased Quantity",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "itemRate",
                        "templateOptions": {
                            "label": "Unit Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "disount",
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
                "id": "row-2",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "textarea",
                        "key": "remarks",
                        "templateOptions": {
                            "label": "Remarks",
                            "required": true,
                            "rows": "3"
                        }
                    }
                ]
            }
        ]
    }

}