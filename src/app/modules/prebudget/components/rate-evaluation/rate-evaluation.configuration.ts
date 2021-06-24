export const RateEvalutationMetadata = {
    "moduleId": "rateevalutation",
    "moduleName": "RateEvalutation",
    "displayName": "Prebudget / Rate Evalutation",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/RateEvaluation",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'specItemName',
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
            "field": 'marketRate',
            "displayName": 'Market Rate'
        }
    ],
    "tabs": [
        {
            "id": "material",
            "label": "Material"
        },
        {
            "id": "labour",
            "label": "Labour"
        },
        {
            "id": "subcontr",
            "label": "Sub Contractor"
        },
        {
            "id": "evaluation",
            "label": "Evaluation"
        }
    ],
    "formfields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1 test",
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
        }
    ],
    "evaluationFormfields": [
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
                    "key": "waterElectricityCharge",
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
                    "key": "waterElectricityChargeAmt",
                    "disabled": true,
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Surcharge for Water & Electricity Amount",
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "labourAdditionalCharge",
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
                    "key": "labourAdditionalChargeAmt",
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
                    "key": "subcontractAdditionalCharge",
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
                    "key": "subcontractAdditionalChargeAmt",
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
                    "key": "contractorProfit",
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
                    "key": "tax",
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
                    "key": "netamount",
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