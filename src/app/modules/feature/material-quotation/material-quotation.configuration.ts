export const MaterialQuotationMetadata = {
    "moduleId": "materialquotation",
    "moduleName": "Material Quotation",
    "displayName": "Material / Material Quotation",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/ItemQuotation",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'quotationNumber',
            "displayName": 'Quotation No:'
        },
        {
            "field": 'quotationType',
            "displayName": 'Quotation Type'
        },
        {
            "field": 'validFrom',
            "displayName": 'Valid From'
        },
        {
            "field": 'validTo',
            "displayName": 'Valid To'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
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
                    "key": "quotationType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Quotation Type",
                        "options":[
                            {
                                "label":"Based On Indent",
                                "value":"Based On Indent"
                            },
                            {
                                "label":"Based On Project And Material",
                                "value":"Based On Project And Material"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "quotationNumber",
                    "type": "input",
                    "templateOptions": {
                        "label": "Quotation No:",
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
                    "className": "flex-1",
                    "key": "validFrom",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Valid From",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "validTo",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Valid To",
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
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "materialId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select material",
                        "required": true,
                        "options": []
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
                    "key": "quantity",
                    "type": "input",
                    "templateOptions": {
                        "label": "Quantity",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "termsAndCondition",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "Terms and Condition",
                    }
                }
            ]
        }
    ]
}