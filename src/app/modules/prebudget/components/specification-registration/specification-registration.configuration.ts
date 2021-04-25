export const SpecificationRegistrationMetadata = {
    "moduleId": "specificationregistration",
    "moduleName": "Specification Registration",
    "displayName": "Prebudget / Specificaiton Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/SpecificationMaster",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'specName',
            "displayName": 'Spec Name'
        },
        {
            "field": 'specNumber',
            "displayName": 'Spec Number'
        },
        {
            "field": 'sacCode',
            "displayName": 'SAC Code'
        },
        {
            "field": 'specDescription',
            "displayName": 'Description'
        },
        {
            "field": 'departmentId',
            "displayName": 'Department'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id":"spec",
            "label": "Specification",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "departmentId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Department",
                                "options": [],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "workTypeId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Type of work",
                                "options": [],
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "id":"row-2",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "unitId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Unit",
                                "options": [],
                                "required": true
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "specNumber",
                            "templateOptions": {
                                "label": "Spec Number",
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "id":"row-3",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "fieldGroup": [
                                {
                                    "type": "input",
                                    "key": "sacCode",
                                    "templateOptions": {
                                        "label": "SAC Code",
                                        "required": true
                                    }
                                },
                                {
                                    "type": "input",
                                    "key": "specName",
                                    "templateOptions": {
                                        "label": "Short Name",
                                        "required": true
                                    }
                                }
                            ]
                        },
                        {
                            "className": "flex-1",
                            "type": "textarea",
                            "key": "specDescription",
                            "templateOptions": {
                                "label": "Description",
                                "required": true,
                                "rows":6
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id":"material",
            "label": "Material",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "specItemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Material",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfConveyance",
                            "templateOptions": {
                                "label": "Conv. Rate",
                                "type":"number"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id":"labour",
            "label": "Labour",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "specItemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Labour",
                                "options": []
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type":"number"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id":"subcontr",
            "label": "Sub Contractor",
            "fields": [
                {
                    "id":"row-1",
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "specItemId",
                            "type": "select",
                            "templateOptions": {
                                "label": "Sub Contractor",
                                "options": [
                                    {
                                        "label":"type1",
                                        "value":1
                                    },
                                    {
                                        "label":"type2",
                                        "value":2
                                    }
                                ]
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "rateOfItem",
                            "templateOptions": {
                                "label": "Rate",
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "qtyRequired",
                            "templateOptions": {
                                "label": "Quantity",
                                "type":"number"
                            }
                        }
                    ]
                }
            ],
        },
        {
            "id":"profit",
            "label": "Profit",
            "fields": [
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "labourAdditionalCharge",
                            "type": "input",
                            "templateOptions": {
                                "label": "Additional Charges for Labour(%)",
                                "required": true,
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "key": "subcontractAdditionalCharge",
                            "type": "input",
                            "templateOptions": {
                                "label": "Additional Charges for Sub Contract(%)",
                                "required": true,
                                "type":"number"
                            }
                        }
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "key": "waterElectricityCharge",
                            "type": "input",
                            "templateOptions": {
                                "label": "Surcharge for Water Electricity(%)",
                                "required": true,
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "contractorProfit",
                            "templateOptions": {
                                "label": "Contractor Profit",
                                "required": true,
                                "type":"number"
                            }
                        }
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "other_expense",
                            "templateOptions": {
                                "label": "Other Expenses",
                                "required": true,
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "tax",
                            "templateOptions": {
                                "label": "GST(%)",
                                "required": true,
                                "type":"number"
                            }
                        }
                    ]
                },
                {
                    "fieldGroupClassName": "display-flex",
                    "fieldGroup": [
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "ratePerUnit",
                            "templateOptions": {
                                "label": "Rate Per Unit",
                                "required": true,
                                "type":"number"
                            }
                        },
                        {
                            "className": "flex-1",
                            "type": "input",
                            "key": "deptRatePerUnit",
                            "templateOptions": {
                                "label": "Department Rate",
                                "required": true,
                                "type":"number"
                            }
                        }
                    ]
                },
            ],
        }
    ],
    "specificationDetailsTable": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'specItemId',
            "displayName": 'Material'
        },
        {
            "field": 'qtyRequired',
            "displayName": 'Qty'
        },
        {
            "field": 'rateOfItem',
            "displayName": 'Rate'
        },
        {
            "field": 'rateOfConveyance',
            "displayName": 'Conveyance'
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
}