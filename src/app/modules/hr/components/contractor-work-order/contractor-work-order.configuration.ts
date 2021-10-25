export const ContractorWorkOrderMetadata = {
    "moduleId": "contractorworkorder",
    "moduleName": "ContractorWorkOrder",
    "displayName": "HR / Contractor Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ContractorWorkOrder",
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
            "field": 'dateOrdered',
            "displayName": 'Work Date'
        },
        {
            "field": 'taxType',
            "displayName": 'Tax Type'
        },
        {
            "field": 'fullName',
            "displayName": 'Contractor'
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work No'
        },
        // {
        //     "field": 'category',
        //     "displayName": 'Work Category'
        // },
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
                        "label": "Project Id",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateOrdered",
                    "templateOptions": {
                        "label": "Work Date",
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
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
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
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "options": []
                    },

                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "taxType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Tax Type",
                        "required": true,
                        "options": [
                            {
                                "label": "INTRA STATE",
                                "value": "INTRA STATE"
                            },
                            {
                                "label": "INTER STATE",
                                "value": "INTER STATE"
                            }
                        ]
                    }

                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "category",
                    "templateOptions": {
                        "label": "Work Category",
                        "options": [],
                        "required": true
                    }
                },
            ]
            
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "contractorId",
                    "templateOptions": {
                        "label": "Contractor",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "workOrderNo",
                    "templateOptions": {
                        "label": "Work No",
                        "required": true,
                        
                    }
                }
               
            ]
        },
        {
            "id": "row-6",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 1
                    }
                },
            ]
        },
    ],
    "contractorWorkOrderDetails": {
        "tableColumns": [
            {
                "field": 'contractorWorkOrderDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'hsnCode',
                "displayName": 'Hsn/Sac Code'
            },
            
            {
                "field": 'workName',
                "displayName": 'Work Name'
            },
            {
                "field": 'qty',
                "displayName": 'Qty'
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
                "field": 'tax',
                "displayName": 'Tax%'
            },
            {
                "field": 'totalamount',
                "displayName": 'Total Amount'
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
                        "key": "hsnCode",
                        "templateOptions": {
                            "label": "HSN/SAC Code",
                            "required": true,
                            
                        }
                    },
                    // {
                    //     "className": "flex-1",
                    //     "type": "select",
                    //     "key": "category",
                    //     "templateOptions": {
                    //         "label": "Work Category",
                    //         "options": [],
                    //         "required": true
                    //     }
                    // },
                    {
                        "className": "flex-2",
                        "key": "workName",
                        "type": "input",
                        "templateOptions": {
                            "label": "Work Name",
                            "required": true,
                        
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
                        "type": "input",
                        "key": "qty",
                        "templateOptions": {
                            "label": "Qty",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "rate",
                        "templateOptions": {
                            "label": "Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "taxAmount",
                        "templateOptions": {
                            "label": "Amount",
                            "required": true,
                            "type": "number",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "tax",
                        "templateOptions": {
                            "label": "Tax%",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly field-size-small",
                        "type": "input",
                        "defaultValue": 0,
                        "key": "billAmount",
                        "templateOptions": {
                            "label": "Total Amount",
                            "required": true,
                            "type": "number",
                            "readonly": true
                        }
                    },
                ]
            }
        ]
    }

}