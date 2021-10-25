export const SubcontractorBillApprovalMetadata = {
    "moduleId": "subcontractorworkbill",
    "moduleName": "subcontractorworkbill",
    "displayName": "HR/ SubContractorBill Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    // "serviceEndPoint": "BuildExeHR/api/SubcontractorBill",
    // "serviceEndPoint1": "BuildExeHR/api/SubContractorWorkOrder",
    "serviceEndPoint": "BuildExeHR/api/SubcontractorBill",
    // "serviceEndPoint1": "BuildExeHR/api/ForemanWorkOrderList",
    "dropdownEndpoints": {
        // "employeeforeman": "BuildExeHR/api/Employee",
        "workno": "BuildExeHR/api/SubContractorWorkOrder",
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Id'
        },
        {
            "field": 'fullName',
            "displayName": 'Subcontractor Name'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'billno',
            "displayName": 'Bill No'
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
                    "key": "subContractorId",
                    "templateOptions": {
                        "label": "SubContractor Name",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workOrderId",
                    "templateOptions": {
                        "label": "Work order",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "billno",
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
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "billDateFrom",
                    "templateOptions": {
                        "label": "From"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "billDateTo",
                    "templateOptions": {
                        "label": "To"
                    }
                } 
            ]
        },
    ],
    "subcontractorBillDetails": {
        "tableColumns": [
            {
                "field": 'workOrderDetailsId',
                "displayName": 'Indent No'
            },
            {
                "field": 'labourWorkName',
                "displayName": 'Work Name'
            },
            {
                "field": 'quantityOrdered',
                "displayName": 'Quantity'
            },
            {
                "field": 'workRate',
                "displayName": 'Rate'
            },
            {
                "field": 'previousBillQty',
                "displayName": 'Previous Sub Bill'
            },
            {
                "field": 'currentQuantity',
                "displayName": 'Current Qty'
            },
            {
                "field": 'category',
                "displayName": 'Current Amount'
            },
            {
                "field": 'negotiatedAmount',
                "displayName": 'Negotiate Amount'
            },
            {
                "field": 'totalqty',
                "displayName": 'Totalqty'
            },
            {
                "field": 'netAmount',
                "displayName": 'Amount'
            },
            // {
            //     "field": 'action',
            //     "displayName": 'Action'
            // }
        ],
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": "remarks",
                        "templateOptions": {
                            "label": "Remarks",
                            "options": [],
                            // "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": "amountAsPerAttendance",
                        "templateOptions": {
                            "label": "Payment As per Atttendance",
                            "options": [],
                            // "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": "othercharge",
                        "templateOptions": {
                            "label": "Other Charges",
                            "options": [],
                            "type": "number",
                            // "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": "tax",
                        "templateOptions": {
                            "label": "Tax Percentage",
                            "options": [ ],
                            // "required": true
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "select",
                        "key": "taxtype",
                        "templateOptions": {
                            "label": "Tax Area",
                            "options": [
                                {
                                    "label": "INTER STATE",
                                    "value": "INTER STATE"
                                },
                                {
                                    "label": "INTRA STATE",
                                    "value": "INTRA STATE"
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
                    // {
                    //     "className": "flex-1",
                    //     "type": "textarea",
                    //     "key": "itemDescription",
                    //     "templateOptions": {
                    //         "label": "Particular",
                    //         "rows": 1
                    //     }
                    // },
                    // {
                    //     "className": "flex-1",
                    //     "type": "textarea",
                    //     "key": "workDescription",
                    //     "templateOptions": {
                    //         "label": "Description",
                    //         "rows": 1
                    //     }
                    // },
                    // {
                    //     "className": "flex-1 field-size-small",
                    //     "type": "input",
                    //     "key": "saccode",
                    //     "templateOptions": {
                    //         "label": "SAC Code"
                    //     }
                    // },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "amountRetensionPercent",
                        "templateOptions": {
                            "label": "Retension (%)",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "amountRetensionAmount",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Retension Amount",
                            "type": "number",
                            // "readonly": true
                        }
                    },
                    // {
                    //     "className": "flex-1",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "amount",
                    //     "templateOptions": {
                    //         "label": "Amount",
                    //         "type": "number",
                    //         // "readonly": true
                    //     }
                    // },
                   
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
                    // {
                    //     "className": "flex-1 field-size-small",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "kfcper",
                    //     "templateOptions": {
                    //         "label": "KFC (%)",
                    //         "type": "number"
                    //     }
                    // },
                    // {
                    //     "className": "flex-1 readonly field-size-small",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "kfcAmt",
                    //     "templateOptions": {
                    //         "label": "KFC Amount",
                    //         "type": "number",
                    //         "readonly": true
                    //     }
                    // },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "amountTdsPercent",
                        "templateOptions": {
                            "label": "TDS (%)",
                            "type": "number",
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "amountTdsAmount",
                        "templateOptions": {
                            "label": "TDS Amount",
                            "type": "number",
                            // "readonly": true
                        }
                    },
                    // {
                    //     "className": "flex-1 field-size-small",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "labourWelfarePercent",
                    //     "templateOptions": {
                    //         "label": "LW (%)",
                    //         "type": "number",
                    //     }
                    // },
                    // {
                    //     "className": "flex-1 readonly field-size-small",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "labourWelfareAmount",
                    //     "templateOptions": {
                    //         "label": "LW Amount",
                    //         "type": "number",
                    //         "readonly": true
                    //     }
                    // }
                ]
            },
            {
                "id": "row-5",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    // {
                    //     "className": "flex-1",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "discount",
                    //     "templateOptions": {
                    //         "label": "Discount (%)",
                    //         "type": "number"
                    //     }
                    // },
                    // {
                    //     "className": "flex-1",
                    //     "type": "input",
                    //     "defaultValue": 0,
                    //     "key": "discountAmt",
                    //     "templateOptions": {
                    //         "label": "Discount Amount",
                    //         "type": "number"
                    //     }
                    // },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        // "defaultValue": 0,
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