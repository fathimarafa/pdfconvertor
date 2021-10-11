export const SubcontractorlaboutgroupMetadata = {
    "moduleId": "Subcontractorlabourgroup",
    "moduleName": "SubcontractorlabourgroupComponent",
    "displayName": "HR/Subcontractor Labour Group",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorAttendanceSetting",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'fullName',
            "displayName": 'SubContractor Name'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        },
        {
            "field": 'description',
            "displayName": 'Description'
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
                        "label": "Project",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "dateOrdered",
                    "templateOptions": {
                        "label": "Assigning Date",
                        "required": true
                    }
                }
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
                    "key": "subContractorId",
                    "templateOptions": {
                        "label": "SubContractor Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "workTypeId",
                    "templateOptions": {
                        "label": "Work Type",
                        "options": [
                           
                        ],
                        "required": true
                    }
                }

            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "description",
                    "templateOptions": {
                        "label": "Description",
                        "required": true
                    }
                }
              

            ]
        }
    ],
    "attendanceSettingDetails": {
        "tableColumns": [
            {
                "field": 'indentId',
                "displayName": 'Indent No'
            },
            {
                "field": 'labourWorkName',
                "displayName": 'Work Name'
            },
            {
                "field": 'workRate',
                "displayName": 'Rate'
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
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "select",
                        "key": "labourWorkId",
                        "templateOptions": {
                            "label": "Work Name",
                            "options": [
                              
                            ],
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
                        "type": "input",
                        "key": "workRate",
                        "templateOptions": {
                            "label": " Work Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "otRate",
                        "templateOptions": {
                            "label": " OT Rate",
                            "required": true,
                            "type": "number"
                        }
                    }

                ]
            }
        ]
    }

}