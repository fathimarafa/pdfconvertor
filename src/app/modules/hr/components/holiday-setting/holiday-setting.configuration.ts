export const HolidaySettingMetadata = {
    "moduleId": "holidaySetting",
    "moduleName": "Holiday Setting",
    "displayName": "Build / Working Hours Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "holidaySetting",
    "tableColumns": [
        {
            "field": 'employeeDesignationId',
            "displayName": 'S.No'
        },
        {
            "field": 'employeeCategoryId',
            "displayName": 'Designation'
        },
        {
            "field": 'employeeDesignationName',
            "displayName": 'Time In'
        },
        {
            "field": 'description',
            "displayName": 'Time Out'
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
                "options": [
                    {
                        "label": "type 1",
                        "value": "type 1"
                    },
                    {
                        "label": "type 2",
                        "value": "type 2"
                    },
                    {
                        "label": "type 3",
                        "value": "type 3"
                    }
                ],
                "required": true
            }
        },
        {
            "type": "input",
            "key": "designation_id",
            "templateOptions": {
                "label": "Select Designation",
                "options": [
                    {
                        "label": "type 1",
                        "value": "type 1"
                    },
                    {
                        "label": "type 2",
                        "value": "type 2"
                    },
                    {
                        "label": "type 3",
                        "value": "type 3"
                    }
                ],
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