export const SubconntractorattendanceApprovalMetadata = {
    "moduleId": "Subcontractorlaboutgroupattendance",
    "moduleName": "Subcontractorlaboutgroupattendance",
    "displayName": "HR/Subcontractorlabour group attendance Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorAttendance",
    "tableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'subId',
            "displayName": 'Subcontractor Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'attendanceDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'labourWorkName',
            "displayName": 'Item'
        },
        {
            "field": 'noOfLabours',
            "displayName": 'No of Labours'
        },
        {
            "field": 'oTRate',
            "displayName": 'OT Rate'
        },
        {
            "field": 'oTHours',
            "displayName": 'OT Hours'
        }
    ]
}