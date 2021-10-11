export const SubContractorIndentApprovalComponentMetadata = {
    "moduleId": "SubContractorIndentApproval",
    "moduleName": "SubContractorIndentApproval",
    "displayName": "HR / SubContractorIndentApproval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/Indent",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Id'
        },
        {
            "field": 'indentedDate',
            "displayName": 'Indented Date'
        },
        {
            "field": 'fullName',
            "displayName": 'SubContractor Name'
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
                    "type": "datepicker",
                    "key": "indentedDate",
                    "templateOptions": {
                        "label": "Enter date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "indentCategoryId",
                    "templateOptions": {
                        "label": "Category",
                        "required": true
                    }
                },
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
               
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 1
                    }
                }
            ]
        },
        {
            "className": "flex-2 checkbox-outline-none",
            "type": "checkbox",
            "key": "quotation",
            "defaultValue": 0,
            "templateOptions": {
                "label": "For Quotation",
            }
        }
    ],

    "indentDetails": {
        "tableColumns": [
            {
                "field": 'indentDetailsId',
                "displayName": 'Indent No'
            },
            {
                "field": 'labourWorkName',
                "displayName": 'Work'
            },
          
            {
                "field": 'quantityRequired',
                "displayName": 'Required Quantity'
            },
            {
                "field": 'requiredDate',
                "displayName": 'Urgency'
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
                        "key": "workId",
                        "templateOptions": {
                            "label": "Work",
                            "required": true,
                            "options": []
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantityRequired",
                        "templateOptions": {
                            "label": "Requested Quantity",
                            "required": true,
                            "type":"number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "requiredDate",
                        "templateOptions": {
                            "label": "Urgency",
                            "required": true
                        }
                    }
                ]
            }
          
        ]
    }

}
    // "itemDetailstableColumns": [
    //     {
    //         "field": 'indentDetailsId',
    //         "displayName": 'Id'
    //     },
    //     {
    //         "field": 'labourWorkName',
    //         "displayName": 'Work Name'
    //     },
    //     {
    //         "field": 'quantityRequired',
    //         "displayName": 'Required Quantity'
    //     },
    //     {
    //         "field": 'requiredDate',
    //         "displayName": 'Required Date'
    //     }
//     ]
