export const BillReceiptsMetadata = {
    "moduleId": "bill-receipts",
    "moduleName": "Bill Receipts",
    "displayName": "CRM / Bill Receipts",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
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
            "field": 'billAmount',
            "displayName": 'Bill Amount'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'description',
            "displayName": 'Description'
        }
    ],
    "formFields": [
        {
            "id": "client-details",
            "label": "Client Details",
            "fields": [
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
                        }
                    ]
                },
                {
                    "id": "row-2",
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
                    "id": "row-3",
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
                },
                {
                    "id": "row-4",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1 readonly",
                            "type": "textarea",
                            "key": "address",
                            "templateOptions": {
                                "label": "Address",
                                "readonly": true,
                                "rows": 2
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "payment-details",
            "label": "Payment Details",
            "fields": [
                {
                    "id": "row-1",
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
                        }
                    ]
                },
                {
                    "id": "row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
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
                        }
                    ]
                },
                {
                    "id": "row-3",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "textarea",
                            "key": "remarks",
                            "templateOptions": {
                                "label": "Remarks",
                                "rows": 2
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id": "bill-details",
            "label": "Bill Details",
            "fields": [
                {
                    "id": "row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "id":"row-1",
                            "className": "flex-1 readonly",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "billAmount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Net Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "paidAmount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Total Paid Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "balanceAmount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Balance to Pay",
                                        "type": "number",
                                        "readonly": true
                                    }
                                }
                            ]
                        },
                        {
                            "id":"row-2",
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "amount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Current Receipt Amount",
                                        "type": "number"
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "discount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Discount",
                                        "type": "number"
                                    }
                                },
                                {
                                    "className":"readonly",
                                    "type": "input",
                                    "key": "netamount",
                                    "defaultValue":0,
                                    "templateOptions": {
                                        "label": "Net Amount",
                                        "type": "number",
                                        "readonly": true
                                    }
                                }
                            ]
                        }
                    ]
                },
            ]
        },
    ]
}