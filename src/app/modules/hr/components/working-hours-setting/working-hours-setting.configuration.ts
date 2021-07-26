export const WorkingHoursSettingMetadata = {
    "moduleId": "workinghourssetting",
    "moduleName": "Working Hours Setting",
    "displayName": "Build / Working Hours Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/WorkingHours",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'Id'
        },
        {
            "field": 'designationid',
            "displayName": 'Designation'
        },
        {
            "field": 'time_in',
            "displayName": 'Time In'
        },
        {
            "field": 'time_out',
            "displayName": 'Time Out'
        },
        {
            "field": 'relaxation',
            "displayName": 'Relaxation'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "key": "employeeCategoryId",
            "type": "select",
            "templateOptions": {
                "label": "Select Category",
                "options": [],
                "required": true
            }
        },
        {
            "type": "select",
            "key": "designation_id",
            "templateOptions": {
                "label": "Select Designation",
                "options": [],
                "required": true
            }
        },
        {
            "type": "input",
            "key": "time_in",
            "templateOptions": {
                "label": "Time In",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "time_out",
            "templateOptions": {
                "label": "Time Out",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "workingHours",
            "templateOptions": {
                "label": "Working Hours",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "relaxation",
            "templateOptions": {
                "label": "Relaxation( minutes )",
                "required": true
            }
        }
    ]

}