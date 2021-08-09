export const LabourBulkAttendanceEntryApprovalMetadata = {
    "moduleId": "labourbulkattendanceentryapproval",
    "moduleName": "labourbulkattendanceentryapproval",
    "displayName": "Bulk Attendance Entry Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/AttendanceMonthly",
    "tableColumns": [
        {
            "field": 'id',
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
    ]
}