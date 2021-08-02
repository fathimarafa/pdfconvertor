export const ForemanWorkOrderMetadata = {
    "moduleId": "foremanworkorder",
    "moduleName": "ForemanWorkOrder",
    "displayName": "HR / Foreman Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanWorkOrder",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
        },
        {
            "field": 'dateOrdered',
            "displayName": 'Assigning Date'
        },
        {
            "field": 'foremanId',
            "displayName": 'Foreman Name'
        },
        {
            "field": 'userId',
            "displayName": 'Work Order No'
        },
        {
            "field": 'workTypeId',
            "displayName": 'Work Type'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        {
            "field": 'workStatus',
            "displayName": 'Status'
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
                                { "label": 'Pending', "value": 1 },
                                    { "label": 'Tender Submitted', "value": 2 },
                                    { "label": 'Tender Opened', "value": 3 },
                                    { "label": 'Negotiated', "value": 4 },
                                    { "label": 'Work Order', "value": 5 },
                                    { "label": 'Active', "value": 6 },
                                    { "label": 'Silent', "value": 7 },
                                    { "label": 'Rejected', "value": 8 },
                                    { "label": 'Completed', "value": 9 },
                                    { "label": 'Enquiry', "value": 10 }
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
                "field": 'workName',
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
                        "key": "workName",
                        "templateOptions": {
                            "label": "Work Name",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "workRate",
                        "templateOptions": {
                            "label": "Wage",
                            "required": true,
                            
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