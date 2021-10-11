export const ForemanWorkBillApprovalMetadata = {
    "moduleId": "foremanworkbillapproval",
    "moduleName": "ForemanWorkBillApproval",
    "displayName": "HR / Foreman Work Bill Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanWorkBill",
    // "serviceEndPoint1": "BuildExeHR/api/ForemanWorkOrderList",
    "dropdownEndpoints": {
        // "employeeforeman": "BuildExeHR/api/Employee",
        "workno": "BuildExeHR/api/ForemanWorkOrder"
    },
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
            "field": 'unitName',
            "displayName": 'Unit Name'
        },
        {
            "field": 'fullName',
            "displayName": 'Foreman Name'
        },
        // {
        //     "field": 'category',
        //     "displayName": 'Work Category'
        // },
        {
            "field": 'workOrderMasterId',
            "displayName": 'Work No'
        },
        // {
        //     "field": 'voucherTypeId',
        //     "displayName": 'Work Type'
        // },
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
        // {
        //     "id": "row-3",
        //     "fieldGroupClassName": "display-flex",
        //     "fieldGroup": [
        //         {
        //             "className": "flex-1",
        //             "key": "unitId",
        //             "type": "select",
        //             "templateOptions": {
        //                 "label": "Select unit",
        //                 "required": true,
        //                 "options": []
        //             },

        //         }
        //     ]
        // },
        {
            "id": "row-4",
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
        // {
        //     "id": "row-5",
        //     "fieldGroupClassName": "display-flex",
        //     "fieldGroup": [
                // {
                //     "className": "flex-1  readonly",
                //     "key": "voucherTypeId",
                //     "type": "input",
                //     "templateOptions": {
                //         "label": "Work Type",
                //         // "required": true,
                        
                //     }

                // },
        //         {
        //             "className": "flex-1",
        //             "type": "datepicker",
        //             "key": "dateOrdered",
        //             "templateOptions": {
        //                 "label": "Date",
        //                 "required": true
        //             }
        //         }
               
        //     ]
        // },
        {
            "id": "row-6",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateOrdered",
                    "templateOptions": {
                        "label": "Date",
                        "required": true
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
        "id": "row-7",
        "fieldGroupClassName": "display-flex",
        "fieldGroup": [
        {
            "className": "flex-1",
            "type": "input",
            "key": "billNumber",
            "templateOptions": {
                "label": "Bill No",
                "required": true,
                
                
            }
        }
        ]
    }

        
    ],
    "foremanWorkBillDetails": {
        "tableColumns": [
            {
                "field": 'labourWorkName',
                "displayName": 'Work Name'
            },
            {
                "field": 'noOfLabours',
                "displayName": 'No Of Labours'
            },
            {
                "field": 'workRate',
                "displayName": 'Daily Wage'
            },
            {
                "field": 'amount',
                "displayName": 'Amount'
            },
            {
                "field": 'oTRate',
                "displayName": 'OT Rate'
            },
            {
                "field": 'oTHours',
                "displayName": 'OT Rate(Hrs)'
            },
            {
                "field": 'oTAmount',
                "displayName": 'OT Amount'
            },
            {
                "field": 'total',
                "displayName": 'Total'
            },

        ],
    //     "formFields": [
    //         {
    //             "id": "row-1",
    //             "fieldGroupClassName": "display-flex",
    //             "fieldGroup": [
                   
    //                 {
    //                     "className": "flex-1",
    //                     "type": "select",
    //                     "key": "labourWorkId",
    //                     "templateOptions": {
    //                         "label": "Work Name",
    //                         "options": [],
    //                         "required": true
    //                     }
    //                 },
    //                 {
    //                     "className": "flex-1 readonly",
    //                     "type": "input",
    //                     "key": "workRate",
    //                     "templateOptions": {
    //                         "label": "Wage",
    //                         // "type":"number",
    //                         // "required": true,
    //                         "readonly": true
                            
    //                     }
    //                 },
    //                 {
    //                     "className": "flex-1",
    //                     "type": "input",
    //                     "key": "otRate",
    //                     "templateOptions": {
    //                         "label": "OT Rate",
    //                         "required": true,
    //                         "type":"number"
    //                     }
                    
    //                 },
    //             ]
    //         },
           
    //     ]
    }

}