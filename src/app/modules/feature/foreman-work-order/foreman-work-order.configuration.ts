export const ForemanWorkOrderMetadata = {
    "moduleId": "foremanworkorder",
    "moduleName": "Foreman WorkOrder",
    "displayName": "Build/ HR / Foreman Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "ForemanWorkorder",
    "tableColumns": [
        {
            "field": 'companyId',
            "displayName": 'S.No'
        },
        {
            "field": 'companyName',
            "displayName": 'Name'
        },
        {
            "field": 'mobileNumber',
            "displayName": 'Mobile'
        },
        {
            "field": 'emailId',
            "displayName": 'Email'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "datepicker",
            "key": "dateOrdered",
            "templateOptions": {
                "label": "Assigning Date",
                "required": true
            }
        },
        {
            "key": "projectId",
            "type": "select",
            "templateOptions": {
                "label": "Select Project",
                "required": true,
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
            "key": "unitId",
            "type": "select",
            "templateOptions": {
                "label": "Select Unit",
                "required": true,
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
            "key": "foremanId",
            "type": "select",
            "templateOptions": {
                "label": "Select Foreman Name",
                "required": true,
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
            "type": "input",
            "key": "workOrderNo",
            "templateOptions": {
                "label": "Work Order No.",
                "required": true
            }
        },
        {
            "key": "workTypeId",
            "type": "select",
            "templateOptions": {
                "label": "Select Work Type",
                "required": true,
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
            "type": "textarea",
            "key": "description",
            "templateOptions": {
                "label": "Description",
                "required": true,
                "rows": 10
            }
        },
        {
            "key": "workStatus",
            "type": "select",
            "templateOptions": {
                "label": "Select Status",
                "required": true,
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
        }
    ],
    "childForm": {
        "tableColumns": [
            {
                "field": 'companyId',
                "displayName": 'SNo'
            },
            {
                "field": 'workName',
                "displayName": 'Work Name'
            },
            {
                "field": 'workRate',
                "displayName": 'Work Rate'
            },
            {
                "field": 'otRate',
                "displayName": 'OT Rate'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "formFields": [
            {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "workName",
                        "templateOptions": {
                            "label": "Select work",
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
                        "className": "flex-1",
                        "type": "input",
                        "key": "workRate",
                        "templateOptions": {
                            "label": "Wage",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "otRate",
                        "templateOptions": {
                            "label": "OT Rate(Hrs)",
                            "required": true
                        }
                    }
                ]
            }
        ]
    }
}