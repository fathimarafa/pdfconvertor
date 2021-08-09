export const SubcontractorBulkApprovalMetadata= {
    "moduleId": "Subcontractor Attendance Bulk Approval",
    "moduleName": "Subcontractor Attendance Bulk Approval",
    "displayName": "HR /Subcontractor Attendance Bulk Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorAttendance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'billNumber',
            "displayName": 'Bill Number'
        },
        {
            "field": 'subId',
            "displayName": 'SubContractor Id'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}