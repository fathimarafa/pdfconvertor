export const LabourAttendanceEntryApprovalMetadata = {
    "moduleId": "labourAttendanceentryapproval",
    "moduleName": "labourAttendanceentryapproval",
    "displayName": "HR/ Attendance Entry Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/Attendance",
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
            "field": 'attendanceType',
            "displayName": 'Attendance Type'
        },
        {
            "field": 'financialYearId',
            "displayName": 'Financial Year Id'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'attendanceMonthlyDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'fullName',
            "displayName": 'Name'
        },
        {
            "field": 'workingdays',
            "displayName": 'Working Days'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        }
    ]
}