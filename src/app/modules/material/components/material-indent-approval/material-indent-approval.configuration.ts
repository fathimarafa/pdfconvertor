export const MaterialIndentApprovalMetadata = {
    "moduleId": "MaterialIndentApprovalMetadata",
    "moduleName": "Material Indent Approval",
    "displayName": "Material / MaterialIndentApproval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Indent",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'mode',
            "displayName": 'Item'
        },
        {
            "field": 'id',
            "displayName": 'Required Date'
        },
        {
            "field": 'mode',
            "displayName": 'Quantity Required'
        },
        {
            "field": 'action',
            "displayName": 'Select All'
        }
    ],
    "formFields": [
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "companyName",
                    "templateOptions": {
                        "label": "Select type",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            },
                            {
                                "label": "type 3",
                                "value": "3"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Select project",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            },
                            {
                                "label": "type 3",
                                "value": "3"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "companyName",
                    "templateOptions": {
                        "label": "Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "materialId",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "1"
                            },
                            {
                                "label": "type 2",
                                "value": "2"
                            },
                            {
                                "label": "type 3",
                                "value": "3"
                            }
                        ]
                    }
                }
            ]
        },
    ]
}