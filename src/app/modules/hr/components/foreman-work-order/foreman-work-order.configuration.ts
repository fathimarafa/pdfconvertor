export const ForemanWorkOrderMetadata = {
    "moduleId": "foremanworkorder",
    "moduleName": "ForemanWorkOrder",
    "displayName": "HR / Foreman Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanWorkOrder",
    // "serviceEndPoint1": "BuildExeHR/api/ForemanWorkOrderList",
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
            "displayName": 'Foreman Name'
        },
        {
            "field": 'workName',
            "displayName": 'Work Order No'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        // {
        //     "field": 'workStatus',
        //     "displayName": 'Status'
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
                    "type": "datepicker",
                    "key": "dateOrdered",
                    "templateOptions": {
                        "label": "Assigning Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Project Id",
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
                    "key": "foremanId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Foreman Name",
                        "required": true,
                        "options": []
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
                    "key": "workName",
                    "templateOptions": {
                        "label": "Work Order No",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workTypeId",
                    "templateOptions": {
                        "label": "Work Type",
                        "options": [],
                        "required": true
                    }
                },
               
               
            ]
        },
        {
            "id": "row-6",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-2",
                    "key": "description",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 6
                    }
                }
                ]
            },
            {
                "id": "row-7",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "workStatus",
                        "templateOptions": {
                            "label": "Status",
                            "options": [
                                { "label": 'Active', "value": 1 },
                                { "label": 'Pending', "value": 2 },
                                { "label": 'Completed', "value": 3 },
                            ],
                            "required": true
                        }
                    },
                    ]
                }
        
    ],
    "foremanWorkOrderDetails": {
        "tableColumns": [
            {
                "field": 'foremanWorkOrderDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'labourWorkName',
                "displayName": 'Work Name'
            },
            {
                "field": 'workRate',
                "displayName": 'Work Rate'
            },
            
            {
                "field": 'otRate',
                "displayName": 'OT Rate(Hrs)'
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
                        "key": "labourWorkId",
                        "templateOptions": {
                            "label": "Work Name",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "workRate",
                        "templateOptions": {
                            "label": "Wage",
                            // "type":"number",
                            // "required": true,
                            "readonly": true
                            
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "otRate",
                        "templateOptions": {
                            "label": "OT Rate",
                            "required": true,
                            "type":"number"
                        }
                    
                    },
                ]
            },
           
        ]
    }

}