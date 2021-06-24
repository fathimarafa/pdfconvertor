export const ManualBOQMetadata = {
    "moduleId": "manualboq",
    "moduleName": "Manual BOQ",
    "displayName": "Prebudget / Manual BOQ",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/BOQ",
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
            "field": 'unitName',
            "displayName": 'Unit Name'
        },
        {
            "field": 'workCategoryName',
            "displayName": 'Category'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        },
        {
            "field": 'netAmount',
            "displayName": 'Amount'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "project-details",
            "label": "Project Details",
            "hasTable": false,
            "fields": [
                {
                    "id": "row-1",
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
                            },

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
                            },

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
                            },

                        }
                    ]
                },
                {
                    "id": "row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "categoryId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Work Category",
                                "required": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "workNameId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Work Name",
                                "required": true,
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "quantity",
                            "type": "input",
                            "templateOptions": {
                                "label": "Quantity",
                                "type": "number"
                            }
                        },
                    ]
                },
                {
                    "id": "row-3",
                    "className": "checkbox-outline-none",
                    "defaultValue": 0,
                    "key": "insertFromTemplate",
                    "type": "checkbox",
                    "templateOptions": {
                        "label": "Insert From Template"
                    }

                }
            ]
        },
        {
            "id": "material",
            "label": "Material Details",
            "hasTable": true,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "itemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Material",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "select",
                            "key": "masApproval",
                            "templateOptions": {
                                "label": "Mass Approval",
                                "options": [
                                    {
                                        "label": "True",
                                        "value": true
                                    },
                                    {
                                        "label": "False",
                                        "value": false
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "labour",
            "label": "Labour Details",
            "hasTable": true,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "itemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Labour",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type": "number"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "subcontr",
            "label": "Sub Contractor Details",
            "hasTable": true,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "itemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Sub Contractor",
                                "options": [
                                    {
                                        "label": "type1",
                                        "value": 1
                                    },
                                    {
                                        "label": "type2",
                                        "value": 2
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type": "number"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "other",
            "label": "Other Details",
            "hasTable": false,
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "key": "subTotal",
                            "type": "input",
                            "defaultValue": 0,
                            "disabled": true,
                            "templateOptions": {
                                "label": "Sub Total",
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
                            "key": "waterElectricityChargePer",
                            "type": "input",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Surcharge for Water & Electricity(%)",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "key": "waterElectricityCharge",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Surcharge for Water & Electricity Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "labourAdditionalChargeper",
                            "type": "input",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Additional Charges for Labour(%)",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "labourAdditionalCharge",
                            "type": "input",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Additional Charges for Labour Amount",
                                "required": true,
                                "type": "number"
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
                            "key": "subcontractAdditionalChargePer",
                            "type": "input",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Additional Charges for Sub Contract(%)",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "key": "subcontractAdditionalCharge",
                            "disabled": true,
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Additional Charges for Sub Contract Amount",
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "other_expense",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Other Expense",
                                "type": "number"
                            }
                        }
                    ]
                },
                {
                    "id": "row-4",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "key": "subTotalWithAdditionalCharges",
                            "type": "input",
                            "defaultValue": 0,
                            "disabled": true,
                            "templateOptions": {
                                "label": "Total",
                                "type": "number"
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
                            "key": "contractorProfitPer",
                            "templateOptions": {
                                "label": "Profit Percentage",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "defaultValue": 0,
                            "key": "contractorProfitAmt",
                            "disabled": true,
                            "templateOptions": {
                                "label": "Profit Amount",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "taxPer",
                            "defaultValue": 0,
                            "templateOptions": {
                                "label": "Tax",
                                "required": true,
                                "type": "number"
                            }
                        },
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "defaultValue": 0,
                            "key": "taxAmount",
                            "disabled": true,
                            "templateOptions": {
                                "label": "Tax Amount",
                                "required": true,
                                "type": "number"
                            }
                        }
                    ]
                },
                {
                    "id": "row-6",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "type": "input",
                            "defaultValue": 0,
                            "key": "netAmount",
                            "disabled": true,
                            "templateOptions": {
                                "label": "Grand Total",
                                "required": true,
                                "type": "number"
                            }
                        }
                    ]
                },
            ]
        }
    ],
    "specificationDetailsTable": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'itemName',
            "displayName": 'Material'
        },
        {
            "field": 'qtyRequired',
            "displayName": 'Qty'
        },
        {
            "field": 'rateOfItem',
            "displayName": 'Rate'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "templateTableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'templateNo',
            "displayName": 'Template No'
        },
        {
            "field": 'templateName',
            "displayName": 'Template Name'
        },
        {
            "field": 'workCategoryName',
            "displayName": 'Category'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        }
    ]
}