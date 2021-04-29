export const TemplateRegistrationMetadata = {
    "moduleId": "templateregistration",
    "moduleName": "Template Registration",
    "displayName": "Prebudget / Template Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Template",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'templateName',
            "displayName": 'Template Name'
        },
        {
            "field": 'templateNo',
            "displayName": 'Template No'
        },
        {
            "field": 'categoryId',
            "displayName": 'Work Category'
        },
        {
            "field": 'workTypeId',
            "displayName": 'Work Name'
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
                    "key": "workTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Work Name",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "categoryId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Work Category",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "templateName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Template Name",
                        "required": true,
                    }
                },
                {
                    "className": "flex-1",
                    "key": "templateNo",
                    "type": "input",
                    "templateOptions": {
                        "label": "Template Id",
                        "required": true
                    }
                }
            ]
        },
    ],
    "teamplateDetails": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'SNo'
            },
            {
                "field": 'itemId',
                "displayName": 'Item'
            },
            {
                "field": 'itemQty',
                "displayName": 'Qty'
            },
            {
                "field": 'itemRate',
                "displayName": 'Rate'
            },
            {
                "field": 'amount',
                "displayName": 'Amount'
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
                        "key": "itemId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Item",
                            "options": [
                                {
                                    "label": "type1",
                                    "value": 1
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "itemRate",
                        "templateOptions": {
                            "label": "Rate",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "itemQty",
                        "templateOptions": {
                            "label": "Quantity",
                            "type": "number"
                        }
                    }
                ]
            }
        ]
    }
}