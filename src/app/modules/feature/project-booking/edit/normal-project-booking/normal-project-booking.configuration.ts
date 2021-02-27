export const NormalProjectBookingMetadata = {
    "moduleId": "project-booking",
    "moduleName": "Project Booking",
    "displayName": "CRM / Project Booking",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "ProjectBooking",
    "tableColumns": [],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select project type",
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
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateEntered",
                    "templateOptions": {
                        "label": "Date Entered",
                        "required": true
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select project id",
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
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "projectStatusId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Current Status",
                        "options": [
                            {
                                "label": "ACTIVE",
                                "value": "active"
                            },
                            {
                                "label": "COMPLETED",
                                "value": "completed"
                            }
                        ]
                    }
                },
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Project Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "changedProjectStatusId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Change Status To",
                        "options": [
                            {
                                "label": "ACTIVE",
                                "value": "active"
                            },
                            {
                                "label": "COMPLETED",
                                "value": "completed"
                            }
                        ]
                    }
                },
            ]
        },
        {
            "type": "textarea",
            "key": "narration",
            "templateOptions": {
                "label": "Narration",
                "required": true,
                "rows": 10
            }
        }
    ]


}