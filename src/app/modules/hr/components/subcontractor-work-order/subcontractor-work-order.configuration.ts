export const SubcontractorWorkOrderMetadata = {
    "moduleId": "Subcontractorworkorder",
    "moduleName": "Subcontractor WorkOrder",
    "displayName": "Build/ HR / Subcontractor Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorWorkOrder",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'companyId',
            "displayName": ' Name'
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work Oder No'
        },
        {
            "field": 'category',
            "displayName": 'Work Category'
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
                        "label": "Project",
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
            "id": "row-3",
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
            "id": "row-4",
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
                "field": 'workId',
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
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "subContractorWorkOrderId",
                        "templateOptions": {
                            "label": "Unit",
                            "required": true,
                            "type": "number"
                        }
                    },
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
                        "className": "flex-1",
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

