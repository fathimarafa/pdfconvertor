export const BasicDocumentUploadMetadata = {
    "moduleId": "BasicDocumentUpload",
    "moduleName": "Basic Document Upload",
    "displayName": "Basic / Document Upload",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/DocumentManagement",
    "tableColumns": [
        {
            "field": 'accountHeadId',
            "displayName": 'SNo'
        },
        {
            "field": 'documentName',
            "displayName": 'Name'
        },
        {
            "field": 'enteredDate',
            "displayName": 'Date'
        },
        {
            "field": 'category',
            "displayName": 'Category'
        },
        {
            "field": 'documentGroupId',
            "displayName": 'Document Group'
        },
        {
            "field": 'documentTypeId',
            "displayName": 'Document Type'
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
                    "key": "documentName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Document Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "fileNo",
                    "type": "input",
                    "templateOptions": {
                        "label": "File Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "rackNo",
                    "type": "input",
                    "templateOptions": {
                        "label": "Rack Number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "category",
                    "type": "select",
                    "templateOptions": {
                        "label": "Category",
                        "options": [
                            {
                                "label": "with project",
                                "value": "with project"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "documentGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Document Group",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "documentTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Document Type",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "documentStatus",
                    "type": "select",
                    "templateOptions": {
                        "label": "Status",
                        "required": true,
                        "options": [
                            {
                                "label": "with company",
                                "value": "with company"
                            }
                        ]
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
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                }
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-2",
                    "key": "description",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 6
                    }
                },
                {
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "enteredDate",
                            "type": "datepicker",
                            "templateOptions": {
                                "label": "Date",
                                "required": true,
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "documentPath",
                            "type": "input",
                            "templateOptions": {
                                "label": "Document Path",
                            }
                        }
                    ]
                }
            ]
        }
    ]
}