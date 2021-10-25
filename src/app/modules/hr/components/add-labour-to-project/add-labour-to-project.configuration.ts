export const AddLabourToProjectMetadata = {
    "moduleId": "addLabourToProject",
    "moduleName": "addlabourtoproject",
    "displayName": "Build/ HR / Add Labour To Project",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/LaboursInProject",
    "dropdownEndpoints": {
        "employeeBasedAttendance": "BuildExeHR/api/Employee", 
        "employeeCategory": "BuildExeHR/api/EmployeeCategory",
        "employeeDesignation": "BuildExeHR/api/EmployeeDesignation",
        "employeeWorkCategory": "BuildExeBasic/api/WorkCategory"
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'employeeCategoryName',
            "displayName": 'Category Name'
        },
        {
            "field": 'employeeLabourGroupName',
            "displayName": 'Labour Group Name'
        },
        {
            "field": 'dateAssigned',
            "displayName": 'Date Assigned'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'blockName',
            "displayName": 'Block Name'
        },
        {
            "field": 'floorName',
            "displayName": 'Floor Name'
        },
        {
            "field": 'unitName',
            "displayName": 'Unit Name'
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
                        "key": "employeeCategoryId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Category",
                            "required": true,
                            "options": []
                        }
                },
                {
                    "className": "flex-1",
                    "key": "employeeLabourGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Employee Group",
                        "required": true,
                        "options": []
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "![1].includes(model.employeeCategoryId)",
                    },
                },
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project ID",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Block ID",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Floor ID",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "unit ID",
                        "required": true,
                        "options": []
                    }
                },
            ]
        }  
    

        
    ],
    "laboursInProjectDetail": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'Id'
            },
            {
                "field": 'fullName',
                "displayName": 'Employee Name'
            },
            {
                "field": 'salaryAmount',
                "displayName": 'Wage/Salary'
            },
            {
                "field": 'labourHeadName',
                "displayName": 'labour head'
            },
            {
                "field": 'action',
                "displayName": 'action'
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