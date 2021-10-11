export const SubcontractorBillMetadata = {
    "moduleId": "subcontractorworkbill",
    "moduleName": "subcontractorworkbill",
    "displayName": "HR/ SubcontractorBill",
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
                "field": 'subContractorWorkOrderDetailsId',
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
                "field": 'Total Qty',
                "displayName": 'Totalqty'
            },
            {
                "field": 'Total Amount',
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
                        "type": "input",
                        "key": "remarks",
                        "templateOptions": {
                            "label": "Remarks",
                            "options": [],
                            // "required": true
                        }
                    },
                ]
            },       
            {
                "id": "row-2",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
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
                            // "required": true
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
                        "type": "input",
                        "key": "itemDescription",
                        "templateOptions": {
                            "label": "Status of Work",
                            "rows": 1
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "retentionBalanceAmount",
                        "templateOptions": {
                            "label": "Retension Amount",
                            "rows": 1
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "retentionStatus",
                        "templateOptions": {
                            "label": "",
                            "rows": 1
                        }
                    },
                    {
                        "className": "flex-1 field-size-small",
                        "type": "input",
                        "key": " tax",
                        "templateOptions": {
                            "label": "Tax(%)"
                        }
                    },
                   
                   
                ]
            },
            {
                "id": "row-4",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "amountPaidAdvance",
                        "templateOptions": {
                            "label": "Advance recovery",
                            "rows": 1
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
                            // "readonly": true
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
                "id": "row-5",
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
                    },
                   

                ]
            },
            {
                "id": "row-6",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                  
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        // "defaultValue": 0,
                        "key": "netAmount",
                        "templateOptions": {
                            "label": "Net Payable",
                            "type": "number",
                            "readonly": true
                        }
                    },
                ]
            }
        ]
    }
}