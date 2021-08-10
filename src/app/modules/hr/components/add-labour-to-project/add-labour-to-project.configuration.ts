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
            "field": 'employeeId',
            "displayName": 'Employee Id'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
        },
        {
            "field": 'dateAssigned',
            "displayName": 'Date Assigned'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "employeeTableColmns": [
        {
            "field": 'fullName',
            "displayName": 'Employee Name'
        },
        {
            "field": 'labourHeadName',
            "displayName": 'labour head'
        },
        

        {
            "field": 'salaryAmount',
            "displayName": 'Wage'
        },
        
        {
            "field": 'jobStatus',
            "displayName": 'Status'
        },
       
        
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "category",
                        "type": "select",
                        "templateOptions": {
                            "label": "Category",
                            "required": true,
                            "options": []
                        }
                },
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
    ]
}