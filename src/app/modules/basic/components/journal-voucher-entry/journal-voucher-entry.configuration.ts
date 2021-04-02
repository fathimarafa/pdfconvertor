export const JournalVoucherEntryMetadata = {
    "moduleId": "journalvoucherentry",
    "moduleName": "Journal Voucher Entry",
    "displayName": "Basic / Voucher Entry",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/journal",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'journalDate',
            "displayName": 'Date'
        },
        {
            "field": 'debitHeadId',
            "displayName": 'Debit'
        },
        {
            "field": 'creditHeadId',
            "displayName": 'Credit'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        {
            "field": 'projectId',
            "displayName": 'ProjectId'
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
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                },
                {
                    "className": "flex-1",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "options": []
                    },
                    "hideExpression": true
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "journalDate",
                    "templateOptions": {
                        "label": "Date",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "amount",
                    "templateOptions": {
                        "label": "Amount",
                        "required": true,
                        "type": "number"
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
                    "fieldGroup": [
                        {
                            "key": "debitHeadId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Debit",
                                "required": true,
                                "options": []
                            }
                        },
                        {
                            "key": "creditHeadId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Credit",
                                "required": true,
                                "options": []
                            }
                        },
                    ]
                },
                {
                    "className": "flex-1",
                    "key": "description",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 10
                    }
                }
            ]
        },

    ]
}