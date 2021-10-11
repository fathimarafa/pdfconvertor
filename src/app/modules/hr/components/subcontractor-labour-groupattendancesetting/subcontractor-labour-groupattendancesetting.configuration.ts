export const SubcontractorlaboutgroupattendanceMetadata = {
    "moduleId": "Subcontractorlaboutgroupattendance",
    "moduleName": "Subcontractorlaboutgroupattendance",
    "displayName": "HR/Subcontractorlabour group attendance",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
       // "serviceEndPoint": "BuildExeHR/api/SubcontractorBill",
    // "serviceEndPoint1": "BuildExeHR/api/SubContractorWorkOrder",
    "serviceEndPoint": "BuildExeHR/api/SubcontractorAttendance",
    // "serviceEndPoint1": "BuildExeHR/api/ForemanWorkOrderList",
    "dropdownEndpoints": {
        // "employeeforeman": "BuildExeHR/api/Employee",
        "workno": "BuildExeHR/api/SubContractorWorkOrder",
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Id'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'fullName',
            "displayName": 'SubContractor Id'
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
               
              
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
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
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "subId",
                    "templateOptions": {
                        "label": "SubContractor Name",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workOrderMasterId",
                    "templateOptions": {
                        "label": "Work Order No",
                        "options": []
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
                    "type": "input",
                    "key": "billno",
                    "templateOptions": {
                        "label": "Bill Number"
                    }
                },
               
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "billDateFrom",
                    "templateOptions": {
                        "label": "Date"
                    }
                },
            ]
        },
      
    ],
    "attendanceDetails": {
        "tableColumns": [
            {
                "field": 'attendanceDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'labourWorkId',
                "displayName": 'Work Name'
            },
            {
                "field": 'noOfLabours',
                "displayName": 'No of Labours'
            },
            {
                "field": 'workRate',
                "displayName": 'Daily wage'
            },
            {
                "field": 'oTRate',
                "displayName": 'OT Rate'
            },
            {
                "field": 'oTHours',
                "displayName": 'OT Hours'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
       
    }
}