export const ForemanWorkBillMetadata = {
    "moduleId": "foremanworkbill",
    "moduleName": "ForemanWorkBill",
    "displayName": "HR / Foreman Work Bill",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanWorkBill",
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
            "field": 'unitId',
            "displayName": 'Unit Id'
        },
        {
            "field": 'foremanId',
            "displayName": 'Foreman Name'
        },
        {
            "field": 'category',
            "displayName": 'Work Category'
        },
        {
            "field": 'workOrderMasterId',
            "displayName": 'Work No'
        },
        {
            "field": 'voucherTypeId',
            "displayName": 'Work Type'
        },
         {
            "field": 'billDate',
            "displayName": 'Date'
        },
        {
            "field": 'billNumber',
            "displayName": 'Bill Number'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        
    ],
    "foremanWorkBillDetails": {
        "tableColumns": [
            {
                "field": 'foremanWorkBillDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'noOfLabours',
                "displayName": 'No. Of Labours'
            },
            
            {
                "field": 'wage',
                "displayName": 'Daily Wage'
            },
            
            {
                "field": 'otRate',
                "displayName": 'Rate'
            },
            {
                "field": 'otHours',
                "displayName": 'OT Hours'
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
                            "label": "Project Id",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "workOrderMasterId",
                        "templateOptions": {
                            "label": "Work Order No.",
                            "options": [],
                            "required": true
                            
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
                        "key": "voucherTypeId",
                        "type": "input",
                        "templateOptions": {
                            "label": "Work Type",
                            "required": true,
                            
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
                        "type": "select",
                        "key": "foremanId",
                        "templateOptions": {
                            "label": "Foreman Name",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "dateOrdered",
                        "templateOptions": {
                            "label": "Date",
                            "required": true
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
                        "type": "select",
                        "key": "category",
                        "templateOptions": {
                            "label": "Work Category",
                            "options": [],
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "billNumber",
                        "templateOptions": {
                            "label": "Bill No",
                            "required": true,
                            "type":"number"
                            
                        }
                    }
                ]
            }
    

        ]
    }
    }