export const RefundingMetadata = {
    "moduleId": "refunding",
    "moduleName": "Refunding",
    "displayName": "CRM / Refunding",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Refund",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'refundTypeName',
            "displayName": 'Refund Type'
        },
        {
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'refundAmount',
            "displayName": 'Refund Amount'
        },
        {
            "field": 'refunddate',
            "displayName": 'Refund Date'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": {
        "type-1": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "refundType",
                        "type": "select",
                        "defaultValue": 1,
                        "templateOptions": {
                            "label": "Type",
                            "required": true,
                            "options": [
                                {
                                    "value": 1,
                                    "label": "EMD"
                                },
                                {
                                    "value": 2,
                                    "label": "SECURITY DEPOSIT"
                                },
                                {
                                    "value": 3,
                                    "label": "RETENSION"
                                },
                                {
                                    "value": 4,
                                    "label": "LD"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "projectId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Project ID",
                            "required": true,
                            "options": []
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "projectName",
                        "templateOptions": {
                            "label": "Project Name",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "departmentId",
                        "templateOptions": {
                            "label": "Department",
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
                        "type": "input",
                        "key": "refundAmount",
                        "templateOptions": {
                            "label": "EMD",
                            "type":"number",
                            "required":true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "tenderNo",
                        "templateOptions": {
                            "label": "Tender No",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "performanceguarantee",
                        "templateOptions": {
                            "label": "Performance Guarantee",
                            "readonly": true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "type": "input",
                        "key": "clientName",
                        "templateOptions": {
                            "label": "Client Name",
                            "readonly": true
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
                        "fieldGroup": [
                            {
                                "className":"readonly",
                                "key":"paymentMode",
                                "type": "input",
                                "templateOptions": {
                                    "label": "Refund Type",
                                    "readonly": true
                                }
                            },
                            {
                                "type": "datepicker",
                                "key": "refunddate",
                                "templateOptions": {
                                    "label": "Refund Date",
                                    "required": true
                                }
                            }
                        ]
                    },
                    {
                        "className": "flex-1",
                        "type": "textarea",
                        "key": "narration",
                        "templateOptions": {
                            "label": "Narration",
                            "rows": 6
                        }
                    }
                ]
            }
        ],
        "type-2": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "refundType",
                        "type": "select",
                        "templateOptions": {
                            "label": "Type",
                            "required": true,
                            "options": [
                                {
                                    "value": 1,
                                    "label": "EMD"
                                },
                                {
                                    "value": 2,
                                    "label": "SECURITY DEPOSIT"
                                },
                                {
                                    "value": 3,
                                    "label": "RETENSION"
                                },
                                {
                                    "value": 4,
                                    "label": "LD"
                                }
                            ]
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "billType",
                        "type": "radio",
                        "defaultValue": 2,
                        "templateOptions": {
                            "label": "Bill Type",
                            "required": true,
                            "options": [
                                {
                                    "value": 1,
                                    "label": "PercentageWiseBill"
                                },
                                {
                                    "value": 2,
                                    "label": "PartBill"
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
                        "key": "projectId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Project ID",
                            "required": true,
                            "options": []
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "firstName",
                        "templateOptions": {
                            "label": "Client Name"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "totalAmount",
                        "templateOptions": {
                            "label": "Total Amount",
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "balanceAmount",
                        "templateOptions": {
                            "label": "Balance Amount",
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
                        "type": "input",
                        "key": "refundAmount",
                        "templateOptions": {
                            "label": "Refund Amount",
                            "type": "number",
                            "required":true
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "refunddate",
                        "templateOptions": {
                            "label": "Refund Date",
                            "required":true
                        }
                    },
                    {
                        "className": "flex-1 readonly",
                        "key": "paymentMode",
                        "type": "select",
                        "templateOptions": {
                            "label": "Payement Mode"
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
                    }
                ]
            },
            {
                "id": "row-4",
                "fieldGroupClassName": "display-flex",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "paymentNo",
                        "templateOptions": {
                            "label": "Cheque/DD No"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "paymentModeId",
                        "type": "select",
                        "templateOptions": {
                            "label": "Bank Name",
                            "options": []
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
            }
        ]
    }
}