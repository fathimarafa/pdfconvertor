export const LabourBulkAttendanceEntryMetadata = {
    "moduleId": "labourBulkAttendanceEntry",
    "moduleName": "labourBulkAttendanceEntry",
    "displayName": "Build/ HR / BulkAttendanceEntry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/AttendanceMonthly",
    "dropdownEndpoints": {
        "employeeBasedAttendance": "BuildExeHR/api/Employee", 
        "employeeCategory": "BuildExeHR/api/EmployeeCategory",
        "employeeDesignation": "BuildExeHR/api/EmployeeDesignation",
        "employeeWorkCategory": "BuildExeBasic/api/WorkCategory"
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'employeeId',
            "displayName": 'Employee Id'
        },
        {
            "field": 'dateWorked',
            "displayName": 'Date Worked'
        },
        {
            "field": 'loginTime',
            "displayName": 'Log In'
        },
        {
            "field": 'logoutTime',
            "displayName": 'Log Out'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'overTime',
            "displayName": 'OT'
        },
        {
            "field": 'approvedBy',
            "displayName": 'Approved By'
        },
        {
            "field": 'category',
            "displayName": 'Category'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "employeeTableColmns": [
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'unitId',
            "displayName": 'Unit ID'
        },
        {
            "field": 'unitName',
            "displayName": 'Unit Name '
        },
        {
            "field": 'workingdays',
            "displayName": 'No. Of Work Days'
        },


        {
            "field": 'wage',
            "displayName": 'Wage'
        },
        {
            "field": 'overtime',
            "displayName": 'OT(hrs)'
        },
        {
            "field": 'oTAmount',
            "displayName": 'OT Amount'
        },
        {
            "field": 'employeeCategoryName',
            "displayName": 'Category'
        },
        // {
        //     "field": 'employeeDepartmentName',
        //     "displayName": 'Department'
        // },
        // {
        //     "field": 'employeeDesignationName',
        //     "displayName": 'Designation'
        // },
        // {
        //     "field": 'employeeLabourGroupName',
        //     "displayName": 'labour Group'
        // },
        // {
        //     "field": 'relaxation',
        //     "displayName": 'relaxation'
        // }
        
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                //     {
                //         "className": "flex-1",
                //         "key": "category",
                //         "type": "select",
                //         "templateOptions": {
                //             "label": "Category",
                //             "required": true,
                //             "options": []
                //         }
                // },
                {
                    "className": "flex-1",
                    "key": "employeeGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Employee Group",
                        "required": true,
                        "options": []
                    }
                },
                // {
                //     "className": "flex-1",
                //     "key": "labourHeadId",
                //     "type": "select",
                //     "templateOptions": {
                //         "label": "Labour Head",
                //         "required": true,
                //         "options": []
                //     }
                // },
                {
                    "className": "flex-1",
                    "key": "dateWorked",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "From",
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
                //     "key": "projectId",
                //     "type": "select",
                //     "templateOptions": {
                //         "label": "Project ID",
                //         "required": true,
                //         "options": []
                //     }
                // },
                // {
                //     "className": "flex-1",
                //     "key": "blockId",
                //     "type": "select",
                //     "templateOptions": {
                //         "label": "Block ID",
                //         "required": true,
                //         "options": []
                //     }
                // },
                // {
                //     "className": "flex-1",
                //     "key": "floorId",
                //     "type": "select",
                //     "templateOptions": {
                //         "label": "Floor ID",
                //         "required": true,
                //         "options": []
                //     }
                // },
                // {
                //     "className": "flex-1",
                //     "key": "unitId",
                //     "type": "select",
                //     "templateOptions": {
                //         "label": "unit ID",
                //         "required": true,
                //         "options": []
                //     }
                // },
                {
                    "className": "flex-1",
                    "key": "employeeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Employee",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "dateWorked",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "To",
                        "required": true
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
                    "key": "workCategoryId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Work Category",
                        "required": true,
                    }
                },
                // {
                //     "className": "flex-3",
                //     "key": "remarks",
                //     "type": "textarea",
                //     "templateOptions": {
                //         "label": "Remarks",
                //         "required": true,
                //         "rows": 4
                //     }
                // } 
            ]
        },
    ]
}