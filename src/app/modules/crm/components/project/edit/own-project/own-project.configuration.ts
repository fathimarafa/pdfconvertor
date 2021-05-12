export const OwnProjectMetadata = {
    "moduleId": "ownproject",
    "moduleName": "Own Project",
    "displayName": "CRM / Own Project",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/OwnProject",
    "formFields": [
        {
            "key": "departmentId",
            "type": "select",
            "templateOptions": {
                "label": "Department",
                "required": true,
                "options": []
            }
        },
        {
            "key": "projectId",
            "type": "input",
            "templateOptions": {
                "label": "Project ID",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "projectName",
            "templateOptions": {
                "label": "Project Name",
                "required": true
            }
        },
        {
            "type": "textarea",
            "key": "projectDescription",
            "templateOptions": {
                "label": "Description",
                "required": true,
                "rows": 5
            }
        },
        {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
                "label": "Start Date",
                "required": true,
            }
        },
        {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
                "label": "End Date",
                "required": true,
            }
        },
    ],
    "unit": {
        "tableColumns": [
            {
                "field": 'id',
                "displayName": 'S.No'
            },
            {
                "field": 'unitId',
                "displayName": 'Unit'
            },
            {
                "field": 'description',
                "displayName": 'Description'
            },
            {
                "field": 'totalAreaCostWithTax',
                "displayName": 'Area Cost'
            },
            {
                "field": 'totalLandCost',
                "displayName": 'Land Cost'
            },
            {
                "field": 'totalAmount',
                "displayName": 'Total'
            },
            {
                "field": 'action',
                "displayName": 'Action'
            }
        ],
        "formFields": [
            {
                "id": "row-1",
                "fieldGroupClassName": "display-flex projectunit-formfield-row-divider",
                "fieldGroup": [
                    {
                        "id": "row-1",
                        "className": "flex-2",
                        "fieldGroup": [
                            {
                                "id": "row-1",
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "key": "unitId",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Unit No:",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "blockId",
                                        "type": "select",
                                        "templateOptions": {
                                            "label": "Block",
                                            "required": true,
                                            "options": []
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "floorId",
                                        "type": "select",
                                        "templateOptions": {
                                            "label": "Floor",
                                            "required": true,
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
                                        "key": "projectCategoryId",
                                        "type": "select",
                                        "templateOptions": {
                                            "label": "Type",
                                            "required": true,
                                            "options": []
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "datepicker",
                                        "key": "unitStartDate",
                                        "templateOptions": {
                                            "label": "Start Date",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "unitEndDate",
                                        "type": "datepicker",
                                        "templateOptions": {
                                            "label": "End Date",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "key": "buildUpArea",
                                        "type": "input",
                                        "templateOptions": {
                                            "label": "Build Up Area",
                                            "required": true,
                                            "type":"number"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "row-2",
                        "className": "flex-1",
                        "key": "description",
                        "type": "textarea",
                        "templateOptions": {
                            "label": "Description",
                            "required": true,
                            "rows": 6
                        }
                    }
                ]
            },
            {
                "id": "row-2",
                "fieldGroupClassName": "display-flex projectunit-formfield-row-divider",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "carpetArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Carpet Area",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "commonArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Common Area",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "balconyArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Balcony Area",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "workArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Work Area",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "scalableWorkArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Scalable Area",
                            "type": "number",
                            "readonly": "true"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "ratePerArea",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Rate Per Area",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "pad-right-10",
                        "key": "scalableWorkAreaCost",
                        "defaultValue": 0,
                        "type": "input",
                        "templateOptions": {
                            "label": "Total",
                            "type": "number",
                            "readonly": "true"
                        }
                    }
                ]
            },
            {
                "id": "row-3",
                "fieldGroupClassName": "display-flex projectunit-formfield-row-divider",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "privateTerrace",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Private Terrace",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "terraceRate",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Terrace Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "carParking",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Car Parking",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "pad-right-10",
                        "key": "terraceTotalCost",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Total",
                            "readonly": true,
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "id": "row-4",
                "fieldGroupClassName": "display-flex projectunit-formfield-row-divider",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "totalAreaCost",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Totol Area Cost",
                            "required": true
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "gst",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "GST Percentage",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "kfc",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "KFC Percentage",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "pad-right-10",
                        "key": "totalAreaCostWithTax",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Total",
                            "readonly": true,
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "id": "row-5",
                "fieldGroupClassName": "display-flex projectunit-formfield-row-divider",
                "fieldGroup": [
                    {
                        "className": "flex-1",
                        "key": "landCost",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Land(cent/sqft)",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "landRate",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Land Rate",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "landgst",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Land GST Percentage",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "key": "landkfc",
                        "type": "input",
                        "defaultValue": 0,
                        "templateOptions": {
                            "label": "Land KFC Percentage",
                            "required": true,
                            "type": "number"
                        }
                    },
                    {
                        "className": "pad-right-10",
                        "key": "totalLandCost",
                        "defaultValue": 0,
                        "type": "input",
                        "templateOptions": {
                            "label": "Total",
                            "readonly": true,
                            "type": "number"
                        }
                    }
                ]
            }
        ]
    }
}