export const ClientAdvanceMetadata = {
    "moduleId": "client-advance",
    "moduleName": "Client Advance",
    "displayName": "Pyament and Receipt / Client Advance",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ClientAdvance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'advanceAmount',
            "displayName": 'Advance Amount'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
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
                    "className": "flex-1 project-type-radio",
                    "key": "projectType",
                    "type": "radio",
                    "templateOptions": {
                        "label": "Project Type",
                        "required": true,
                        "options": [
                            {
                                "label": "Villas and Apartment",
                                "value": "OP"
                            },
                            {
                                "label": "Private Projects",
                                "value": "CP"
                            },
                            {
                                "label": "Govt Project",
                                "value": "CG"
                            },
                            {
                                "label": "Consultancy",
                                "value": "CN"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "date",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date",
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
                    },

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
                    },

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
                    },

                }
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex readonly",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "firstName",
                    "templateOptions": {
                        "label": "Client Name"
                    }
                },
                {
                    "className": "flex-1 ",
                    "type": "input",
                    "key": "firstName",
                    "templateOptions": {
                        "label": "Last Name"
                    }
                },
                {
                    "className": "flex-2",
                    "type": "textarea",
                    "key": "address",
                    "templateOptions": {
                        "label": "Client Address",
                        "rows": 1
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
                    "key": "paymentMode",
                    "type": "select",
                    "templateOptions": {
                        "label": "Payment Mode",
                        "required": true,
                        "options": [
                            {
                                "label": "BANK",
                                "value": "BANK"
                            },
                            {
                                "label": "CASH",
                                "value": "CASH"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1 field-size-small checkbox-outline-none",
                    "key": "withClear",
                    "type": "checkbox",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "With Clear"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "paymentModeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Deposit Bank",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "paymentModeNo",
                    "templateOptions": {
                        "label": "Cheque No:"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "datepicker",
                    "key": "chequeDate",
                    "templateOptions": {
                        "label": "Cheque Date"
                    }
                }
            ]
        },
        {
            "id": "row-5",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "advanceAmount",
                    "templateOptions": {
                        "label": "Amount",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "tdsAmountPer",
                    "templateOptions": {
                        "label": "TDS Per(%)",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "type": "input",
                    "key": "tdsAmount",
                    "templateOptions": {
                        "label": "TDS Amount",
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "type": "input",
                    "key": "netAmount",
                    "templateOptions": {
                        "label": "Net Amount",
                        "type": "number"
                    }
                }
            ]
        },
        {
            "id": "row-6",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key": "remarks",
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