export const BasicSitemanagerTransactionMetadata = {
    "moduleId": "BasicSitemanagerTransaction",
    "moduleName": "Basic Sitemanager Transaction",
    "displayName": "Basic / Sitemanager Transaction",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/Sitemanager",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'transactionType',
            "displayName": 'Transaction Type'
        },
        {
            "field": 'transactionDate',
            "displayName": 'Date'
        },
        {
            "field": 'employeeId',
            "displayName": 'Site Manager'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
        {
            "field": 'narration',
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
                    "key": "employeeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Site Manager",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "transactionDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date",
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
                        "disabled": true,
                        "options": []
                    } 
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "disabled": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "disabled": true,
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
                    "className": "flex-2",
                    "key": "transactionType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Transaction Type",
                        "required": true,
                        "options": [
                            {
                                "label": "Money to Site Manager",
                                "value": 1
                            },
                            {
                                "label": "Money return from Site Manager",
                                "value": 2
                            },
                            {
                                "label": "Site Manager's site expense",
                                "value": 3
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "amount",
                    "type": "input",
                    "templateOptions": {
                        "label": "Amount",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "paymentModeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Payment Mode",
                        "required": true,
                        "options": [
                            {
                                "label": "Cash",
                                "value": 0
                            },
                            {
                                "label": "Bank",
                                "value": 3
                            },
                        ]
                    }
                },
                {
                    "className": "flex-1 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "withClear",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "With Clear"
                    }
                }
            ]
        },
        {
            "id": "row-5",
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
                }
            ]
        }
    ]
}