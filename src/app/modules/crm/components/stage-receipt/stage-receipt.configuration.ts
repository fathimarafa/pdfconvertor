export const StageReceiptMetadata = {
    "moduleId": "stagereceipt",
    "moduleName": "StageReceipt",
    "displayName": "CRM / Stage Receipt",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": {
        "receipt": "BuildExeCRM/api/Reciept",
        "pendingClientBills": "BuildExeCRM/api/PendingClientBills"
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'recieptDate',
            "displayName": 'Reciept Date'
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
                    "type": "select",
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "unitId",
                    "templateOptions": {
                        "label": "Unit",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "recieptDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Date"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "nextRecieptDate",
                    "type": "datepicker",
                    "templateOptions": {
                        "label": "Next Receipt On"
                    }
                }
            ]
        },
        {
            "id": "row-2",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "fieldGroupClassName": "display-flex",
                            "fieldGroup": [
                                {
                                    "className": "flex-1 readonly",
                                    "type": "input",
                                    "key": "firstName",
                                    "templateOptions": {
                                        "label": "First Name",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className": "flex-1 readonly",
                                    "type": "input",
                                    "key": "lastName",
                                    "templateOptions": {
                                        "label": "Last Name",
                                        "readonly": true
                                    }
                                }
                            ]
                        },
                        {
                            "fieldGroupClassName": "display-flex",
                            "fieldGroup": [
                                {
                                    "className": "flex-1 readonly",
                                    "type": "input",
                                    "key": "phoneNumber",
                                    "templateOptions": {
                                        "label": "Phone Number",
                                        "readonly": true
                                    }
                                },
                                {
                                    "className": "flex-1 readonly",
                                    "type": "input",
                                    "key": "mobileNumber",
                                    "templateOptions": {
                                        "label": "Mobile Number",
                                        "readonly": true
                                    }
                                }
                            ]
                        }

                    ]
                },
                {
                    "className": "flex-1 readonly",
                    "type": "textarea",
                    "key": "address",
                    "templateOptions": {
                        "label": "Address",
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
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentMode",
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
                    "className": "flex-1",
                    "type": "select",
                    "key": "paymentId",
                    "templateOptions": {
                        "label": "Bank",
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "paymentNo",
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
                },
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className":"flex-1",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "rows": 1
                    }
                }
            ]
        }
    ],
    "stageTableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'stageName',
            "displayName": 'Stage Name'
        },
        {
            "field": 'netAmount',
            "displayName": 'Net Amount'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'billAmount',
            "displayName": 'Receipt Amount'
        },
        {
            "field": 'select',
            "displayName": ''
        }
    ],
    "billTableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'totalAmount',
            "displayName": 'Total Amount'
        },
        {
            "field": 'netAmount',
            "displayName": 'Net Amount'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'billAmount',
            "displayName": 'Receipt Amount'
        },
        {
            "field": 'select',
            "displayName": ''
        }
    ],
    "amountFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "projectId",
                            "templateOptions": {
                                "label": "Net Amount",
                                "type": "number"
                            }
                        },
                        {
                            "type": "input",
                            "key": "projectId",
                            "templateOptions": {
                                "label": "Total Paid Amount",
                                "type": "number"
                            }
                        },
                        {
                            "type": "input",
                            "key": "projectId",
                            "templateOptions": {
                                "label": "Balance to Pay",
                                "type": "number"
                            }
                        }
                    ]
                },
                {
                    "className": "flex-1",
                    "fieldGroup": [
                        {
                            "type": "input",
                            "key": "projectId",
                            "templateOptions": {
                                "label": "Current Receipt Amount",
                                "type": "number"
                            }
                        },
                        {
                            "fieldGroupClassName": "display-flex",
                            "fieldGroup": [
                                {
                                    "className": "flex-1",
                                    "type": "radio",
                                    "key": "projectId",
                                    "templateOptions": {
                                        "label": "Type",
                                        "options": [
                                            {
                                                "label": "Discount",
                                                "value": "Discount"
                                            },
                                            {
                                                "label": "Advance",
                                                "value": "Advance"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "className": "flex-1",
                                    "type": "input",
                                    "key": "projectId",
                                    "templateOptions": {
                                        "label": "Amount",
                                        "type": "number"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "input",
                            "key": "projectId",
                            "templateOptions": {
                                "label": "Net Amount",
                                "type": "number"
                            }
                        }
                    ]
                }
            ]
        },
    ]
}