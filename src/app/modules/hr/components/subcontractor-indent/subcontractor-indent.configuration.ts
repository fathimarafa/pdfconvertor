export const SubcontractorIndentMetadata = {
    "moduleId": "Indent",
    "moduleName": "Indent",
    "displayName": "HR / Subcontractor Indent Creation",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Indent",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
        },
        {
            "field": 'indentedDate',
            "displayName": 'Indented Date'
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
                    "className": "flex-1 readonly",
                    "type": "input",
                    "key": "indentTypeId",
                    "templateOptions": {
                        "label": "Indent Type : Sub-Contract",
                        
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "projectId",
                    "templateOptions": {
                        "label": "Project",
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "subContractorId",
                    "templateOptions": {
                        "label": "SubContractor Name",
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
                    "className": "flex-1 readonly",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "options": [],
                        "disabled": true,
                        "required": true
                    },
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "disabled": true,
                        "options": [],
                        "required": true
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "disabled": true,
                        "options": [],
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
                    "type": "datepicker",
                    "key": "indentedDate",
                    "templateOptions": {
                        "label": "Enter date",
                        "required": true
                    }
                },
                {
                    "className": "flex-2 checkbox-outline-none",
                    "type": "checkbox",
                    "key": "quotation",
                    "defaultValue": 0,
                    "templateOptions": {
                        "label": "For Quotation",
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
                    "type": "select",
                    "key": "indentCategoryId",
                    "templateOptions": {
                        "label": "Category",
                        "options": [
                            {
                                "label": "capital",
                                "value": 1
                            },
                            {
                                "label": "consumable",
                                "value": 2
                            }
                        ],
                        "required": true
                    }
                },
              
               
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
               
                {
                    "className": "flex-2",
                    "type": "textarea",
                    "key": "remarks",
                    "templateOptions": {
                        "label": "Remarks",
                        "required": true,
                        "rows": 5
                    }
                }
            ]
        },
        {
            "className":"checkbox-outline-none",
            "type": "checkbox",
            "key": "nextLevel",
            "defaultValue": 0,
            "templateOptions": {
                "label": "Next Level",
            }
        },
    ],

    "indentDetails": {
        "tableColumns": [
            {
                "field": 'indentDetailsId ',
                "displayName": 'Indent No'
            },
            {
                "field": 'materialId',
                "displayName": 'Work'
            },
          
            {
                "field": 'quantityRequired',
                "displayName": 'Required Quantity'
            },
            {
                "field": 'requiredDate',
                "displayName": 'Urgency'
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
                        "key": "materialId",
                        "templateOptions": {
                            "label": "Work",
                            "required": true,
                            "options": []
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "input",
                        "key": "quantityRequired",
                        "templateOptions": {
                            "label": "Requested Quantity",
                            "required": true,
                            "type":"number"
                        }
                    },
                    {
                        "className": "flex-1",
                        "type": "datepicker",
                        "key": "requiredDate",
                        "templateOptions": {
                            "label": "Urgency",
                            "required": true
                        }
                    }
                ]
            }
          
        ]
    }

}



// "tableColumns": [
//     {
//         "field": 'id',
//         "displayName": 'SNo'
//     },
//     {
//         "field": 'projectId',
//         "displayName": 'Project'
//     },
//     {
//         "field": 'usageDate',
//         "displayName": 'Usage Date'
//     },
//     {
//         "field": 'usageType',
//         "displayName": 'Usage Type'
//     },
//     {
//         "field": 'workCategory',
//         "displayName": 'Work Category'
//     },
//     {
//         "field": 'action',
//         "displayName": 'Action'
//     }
// ],
// "formFields": [
//     {
//         "id": "row-1",
//         "fieldGroupClassName": "display-flex",
//         "fieldGroup": [
//             {
//                 "className": "flex-1",
//                 "type": "select",
//                 "key": "projectId",
//                 "templateOptions": {
//                     "label": "Project",
//                     "options": [],
//                     "required": true
//                 }
//             },
//             {
//                 "className": "flex-1",
//                 "type": "datepicker",
//                 "key": "usageDate",
//                 "templateOptions": {
//                     "label": "Usage Date",
//                     "required": true
//                 }
//             }
//         ]
//     },
//     {
//         "id": "row-2",
//         "fieldGroupClassName": "display-flex",
//         "fieldGroup": [
//             {
//                 "className": "flex-1",
//                 "key": "blockId",
//                 "type": "select",
//                 "templateOptions": {
//                     "label": "Select block",
//                     "required": true,
//                     "options": []
//                 }
//             },
//             {
//                 "className": "flex-1",
//                 "key": "floorId",
//                 "type": "select",
//                 "templateOptions": {
//                     "label": "Select floor",
//                     "required": true,
//                     "options": []
//                 }
//             }
//         ],
//         "hideExpression": true
//     },
//     {
//         "id": "row-3",
//         "fieldGroupClassName": "display-flex",
//         "fieldGroup": [
//             {
//                 "className": "flex-1",
//                 "key": "unitId",
//                 "type": "select",
//                 "templateOptions": {
//                     "label": "Select unit",
//                     "required": true,
//                     "options": []
//                 },

//             }
//         ],
//         "hideExpression": true
//     },
//     {
//         "id": "row-4",
//         "fieldGroupClassName": "display-flex",
//         "fieldGroup": [
//             {
//                 "className": "flex-1",
//                 "type": "select",
//                 "key": "usageType",
//                 "templateOptions": {
//                     "label": "Usage Type",
//                     "options": [
//                         {
//                             "label": "contractor",
//                             "value": "CONTRACTOR"
//                         },
//                         {
//                             "label": "labour",
//                             "value": "LABOUR"
//                         }
//                     ],
//                     "required": true
//                 }
//             },
//             {
//                 "className": "flex-1",
//                 "type": "select",
//                 "key": "workCategory",
//                 "templateOptions": {
//                     "label": "Work Category",
//                     "options": [
//                         {
//                             "label": "type1",
//                             "value": 1
//                         },
//                         {
//                             "label": "type2",
//                             "value": 2
//                         }
//                     ],
//                     "required": true
//                 }
//             }
//         ]
//     }
// ],
// "materialUsageDetails": {
//     "tableColumns": [
//         {
//             "field": 'materialUsageDetailsId',
//             "displayName": 'SNo'
//         },
//         {
//             "field": 'materialId',
//             "displayName": 'Material'
//         },
//         {
//             "field": 'quantity',
//             "displayName": 'Quantity'
//         },
//         {
//             "field": 'rate',
//             "displayName": 'Rate'
//         },
//         {
//             "field": 'total',
//             "displayName": 'Total'
//         },
//         {
//             "field": 'action',
//             "displayName": 'Action'
//         }
//     ],
//     "formFields": [
//         {
//             "id": "row-1",
//             "fieldGroupClassName": "display-flex",
//             "fieldGroup": [
//                 {
//                     "className": "flex-1",
//                     "type": "select",
//                     "key": "materialId",
//                     "templateOptions": {
//                         "label": "Material",
//                         "options": [],
//                         "required": true
//                     }
//                 },
//                 {
//                     "className": "flex-1",
//                     "type": "input",
//                     "key": "quantity",
//                     "templateOptions": {
//                         "label": "Stock",
//                         "required": true,
//                         "type": "number"
//                     }
//                 },
//                 {
//                     "className": "flex-1",
//                     "type": "input",
//                     "key": "rate",
//                     "templateOptions": {
//                         "label": "Unit Rate",
//                         "required": true,
//                         "type": "number"
//                     }
//                 }
//             ]
//         }
//     ]
// }

