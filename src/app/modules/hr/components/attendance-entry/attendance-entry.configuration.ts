export const AttendanceEntryMetadata = {
    "moduleId": "attendanceEntry",
    "moduleName": "attendanceEntry",
    "displayName": "Build/ HR / AttendanceEntry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/Attendance",
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
            "field": 'fullName',
            "displayName": 'Name'
        },
        {
            "field": 'employeeCategoryName',
            "displayName": 'Category'
        },
        {
            "field": 'employeeDepartmentName',
            "displayName": 'Department'
        },
        {
            "field": 'employeeDesignationName',
            "displayName": 'Designation'
        },
        {
            "field": 'employeeLabourGroupName',
            "displayName": 'labour Group'
        },
        {
            "field": 'labourHeadName',
            "displayName": 'labour head'
        },
        {
            "field": 'time_in',
            "displayName": 'LogIn'
        },
        {
            "field": 'time_out',
            "displayName": 'Logout'
        },
        {
            "field": 'salaryAmount',
            "displayName": 'Salary'
        },
        {
            "field": 'overtime',
            "displayName": 'OT (hrs)'
        },
        {
            "field": 'relaxation',
            "displayName": 'relaxation'
        }
    ],
    "formFields": [
        {
            "id": "attendanceditrow1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "dateWorked",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Select Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "category",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select category",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Employee Group",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "labourHeadId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour Head",
                        "required": true,
                        "options": []
                    }
                },
            ]
        },
        {
            "id": "attendanceditrow2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
               
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Block",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Floor",
                        "required": true,
                        "options": []
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
                    }
                }
            ]
        },
        {
            "id": "attendanceditrow3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "workCategoryId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select Work Category"
                    }
                },
                {
                    "className": "flex-3",
                    "key": "remarks",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Remarks"
                    }
                }
            ]
        }
    ]
}