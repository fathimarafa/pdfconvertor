export const QuotationBaseRateFeedingMetadata = {
    "moduleId": "quotationbaseratefeeding",
    "moduleName": "Quotation BaseRate Feeding",
    "displayName": "CRM / Quotation BaseRate",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/itemquotationbaserate",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'quotationId',
            "displayName": 'Quotation'
        },
        {
            "field": 'supplierId',
            "displayName": 'Supplier'
        },
        {
            "field": 'baseRate',
            "displayName": 'Base Rate'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
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
                    "key": "quotationId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Quotation No:",
                        "options": [],
                        "required": true
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex readonly",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "quotationType",
                    "type": "input",
                    "templateOptions": {
                        "label": "Quotation Type",
                        "readonly": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "validFrom",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Valid From",
                        "readonly": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "validTo",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Valid To",
                        "readonly": true
                    }
                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1 readonly",
                    "key": "projectId",
                    "type": "input",
                    "templateOptions": {
                        "label": "Project",
                        "readonly": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "materialId",
                    "type": "input",
                    "templateOptions": {
                        "label": "Material",
                        "readonly": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "quantity",
                    "type": "input",
                    "templateOptions": {
                        "label": "Quantity",
                        "readonly": true
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
                    "key": "supplierId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Supplier",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "baseRate",
                    "type": "input",
                    "templateOptions": {
                        "label": "Base Rate",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "minimumOrderQuantity",
                    "type": "input",
                    "templateOptions": {
                        "label": "Minimum Order Quantity",
                        "required": true,
                        "type": "number"
                    }
                },
            ]
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "remarks",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 2
                    }
                }
            ]
        }
    ]
}