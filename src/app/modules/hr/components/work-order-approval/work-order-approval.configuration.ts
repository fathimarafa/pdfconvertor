export const WorkOrderApprovalMetadata = {
    "moduleId": "SubContractor Work Order Approval",
    "moduleName": "SubContractor Work Order Approval",
    "displayName": "HR /SubContractor Work Order Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorWorkOrder",
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
            "field": 'dateOrdered',
            "displayName": 'Assigning Date'
        },
        {
            "field": 'fullName',
            "displayName": 'Subcontractor Name'
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work Order No'
        },
        {
            "field": 'remarks',
            "displayName": 'Description'
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
        // {
        //     "id": "row-2",
        //     "fieldGroupClassName": "display-flex",
        //     "fieldGroup": [
        //         {
        //             "className": "flex-1 readonly",
        //             "key": "blockId",
        //             "type": "select",
        //             "templateOptions": {
        //                 "label": "Select block",
        //                 "options": [],
        //                 "disabled": true,
        //                 "required": true
        //             },
        //         },
        //         {
        //             "className": "flex-1 readonly",
        //             "key": "floorId",
        //             "type": "select",
        //             "templateOptions": {
        //                 "label": "Select floor",
        //                 "disabled": true,
        //                 "options": [],
        //                 "required": true
        //             }
        //         },
        //         // {
        //         //     "className": "flex-1 readonly",
        //         //     "key": "unitId",
        //         //     "type": "select",
        //         //     "templateOptions": {
        //         //         "label": "Select unit",
        //         //         "disabled": true,
        //         //         "options": [],
        //         //         "required": true
        //         //     }
        //         // }
        //     ]
        // },
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
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "workOrderNo",
                    "templateOptions": {
                        "label": "Work Order no",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "category",
                    "templateOptions": {
                        "label": "Work Category",
                        "options": [
                           
                        ],
                        "required": true
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
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Description",
                        "required": true
                    }
                }
            ]
        }
    ],
    "subContractorWorkOrderDetails": {
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
                        "type": "select",
                        "key": "workId",
                        "templateOptions": {
                            "label": "Work Name",
                            "options": [],
                            "required": true
                        }
                    },
                    // {
                    //     "className": "flex-1",
                    //     "type": "input",
                    //     "key": "subContractorWorkOrderId",
                    //     "templateOptions": {
                    //         "label": "Unit",
                    //         "required": true,
                    //         "type": "number"
                    //     }
                    // },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantityOrdered",
                        "templateOptions": {
                            "label": "Quantity",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "workRate",
                        "templateOptions": {
                            "label": "Rate",
                            "required": true,
                            "type": "number"
                        }
                    }
                ]
            }
        ],

    },
       
   
}