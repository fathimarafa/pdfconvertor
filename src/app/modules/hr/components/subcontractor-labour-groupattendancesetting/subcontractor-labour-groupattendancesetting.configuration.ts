export const SubcontractorlaboutgroupattendanceMetadata = {
    "moduleId": "Subcontractorlaboutgroupattendance",
    "moduleName": "Subcontractorlaboutgroupattendance",
    "displayName": "HR/Subcontractorlabour group attendance",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubcontractorAttendance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'companyId',
            "displayName": ' Company Name'
        },
        {
            "field": 'financialYearId',
            "displayName": 'Finantiatial year Id'
        },
        {
            "field": 'branchId',
            "displayName": 'Branch Id'
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
                    "key": "subId",
                    "templateOptions": {
                        "label": "SubContractor Name",
                        "options": []
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
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workOrderMasterId",
                    "templateOptions": {
                        "label": "Work Order No",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "billNumber",
                    "templateOptions": {
                        "label": "Bill No",
                        "options": []
                    }
                },
            ]
        }
    ],
    "attendanceDetails": {
        "tableColumns": [
            {
                "field": 'attendanceDetailsId',
                "displayName": 'SNo'
            },
            {
                "field": 'labourWorkName',
                "displayName": 'Work Name'
            },
            {
                "field": 'noOfLabours',
                "displayName": 'No of Labours'
            },
            {
                "field": 'wage',
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