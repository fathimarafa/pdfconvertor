export const EmployeeRegistrationMetadata = {
    "moduleId": "employee",
    "moduleName": "Employee",
    "displayName": "Build / HR / Employee",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/Employee",
    "dropdownEndpoints": {
        "employeeCategory": "BuildExeHR/api/EmployeeCategory",
        "employeeDesignation": "BuildExeHR/api/EmployeeDesignation"
    },
    "tableColumns": [
        {
            "field": 'employeeId',
            "displayName": 'SNo'
        },
        {
            "field": 'fullName',
            "displayName": 'Name'
        },
        {
            "field": 'employeeDesignationId',
            "displayName": 'Designation'
        },
        {
            "field": 'mobileNo',
            "displayName": 'Mobile number'
        },
        {
            "field": 'salaryAmount',
            "displayName": 'Salary'
        },
        {
            "field": 'status',
            "displayName": 'Status'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "id": "employeerrow1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "employeeCategoryId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select category",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeDesignationId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select designation",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeLabourGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour group",
                        "options": [],
                        "required" : true
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "![1].includes(model.employeeCategoryId)",
                    },

                },
                {
                    "className": "flex-1",
                    "key": "labourHead",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour head",
                        "options": [],
                        "required": true
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "![1].includes(model.employeeCategoryId)",
                    },
                    "hideExpression": "[1].includes(model.employeeLabourGroupId)"
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1 readonly",
                    "type": "input",
                    "key": "id",
                    "templateOptions": {
                        "label": "EmployeeID",
                        // "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "fullName",
                    "templateOptions": {
                        "label": "Employee Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeCode",
                    "type": "input",
                    "templateOptions": {
                        "label": "Employee Code",
                    }
                },
                {
                    "className": "flex-1",
                    "type": "select",
                    "key": "status",
                    "templateOptions": {
                        "label": "Status",
                        "options": [
                            {
                                "label": "ACTIVE",
                                "value": "ACTIVE"
                            },
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1 datepicker-width",
                    "type": "datepicker",
                    "key": "dateOfBirth",
                    "templateOptions": {
                        "label": "Date of Birth",
                        "required": true
                    }
                },
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "radio",
                    "key": "sex",
                    "templateOptions": {
                        "label": "Sex",
                        "options": [
                            {
                                "label": "male",
                                "value": "male"
                            },
                            {
                                "label": "female",
                                "value": "female"
                            }
                        ],
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "emailId",
                    "templateOptions": {
                        "label": "Email ID",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "phoneNo",
                    "templateOptions": {
                        "label": "Phone number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "mobileNo",
                    "templateOptions": {
                        "label": "Mobile number",
                        "required": true
                    }
                },
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "textarea",
                    "key":"address",
                    "templateOptions": {
                        "label": "Address",
                        "required": true,
                        "rows": 11
                    }
                },
                {
                    "className": "flex-1",
                    "fieldGroup":
                        [
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1 readonly",
                                        "type": "input",
                                        "key": "employeeSalaryTypeId",
                                        // "defaultValue": 1,
                                        "templateOptions": {
                                            "label": "Salary type : Daily",
                                            "readonly": true,
                                          
                                        },
                                        // // "expressionProperties": {
                                        // //     "templateOptions.disabled": "![1].includes(model.employeeCategoryId)",
    
                                        // // },
                                        "hideExpression": "![1].includes(model.employeeCategoryId)",
                                     
                                    },
                                    {
                                        "className": "flex-1 readonly",
                                        "type": "input",
                                        "key": "employeeSalaryTypeId",
                                        // "defaultValue": 2,
                                        "templateOptions": {
                                            "label": "Salary type : Monthly",
                                            "readonly": true,
                                        },
                                        // "expressionProperties": {
                                        //     "templateOptions.disabled": "(model.employeeCategoryId == `6`)",
                                        // },
                                        "hideExpression": "![7].includes(model.employeeCategoryId)",
                                    },
                                    {
                                        "className": "flex-1 readonly",
                                        "type": "input",
                                        "key": "employeeSalaryTypeId",
                                        // "defaultValue" : 3,
                                        "templateOptions": {
                                            "label": "Salary type : Contract",
                                            "readonly": true,
                                           
                                        },
                                        // "expressionProperties": {
                                        //     "templateOptions.disabled": "(model.employeeCategoryId == `6`)",
                                        // },
                                        "hideExpression": "![3,4,5].includes(model.employeeCategoryId)",
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "salaryAmount",
                                        "templateOptions": {
                                            "type": 'number',
                                            "label": "Salary",
                                            "required": true
                                        },
                                        // "expressionProperties": {
                                        //     "templateOptions.disabled": "[3,4,5,6].includes(model.employeeCategoryId)",
                                        // },
                                        "hideExpression": "![7].includes(model.employeeCategoryId)",
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "salaryAmount",
                                        "templateOptions": {
                                            "type": 'number',
                                            "label": "Wage",
                                            "required": true
                                        },
                                        // "expressionProperties": {
                                        //     "templateOptions.disabled": "[3,4,5,6].includes(model.employeeCategoryId)",
                                        // },
                                        "hideExpression": "![1].includes(model.employeeCategoryId)",
                                    }
                                ]
                            },
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "overtime",
                                        "templateOptions": {
                                            "type": 'number',
                                            "label": "Overtime Amount",
                                            // "required": true
                                        },
                                        // "expressionProperties": {
                                        //     "templateOptions.disabled": "[3,4,5,6].includes(model.employeeCategoryId)",
                                        // }
                                        "hideExpression": "![1,7].includes(model.employeeCategoryId)",
                                    },
                                    {
                                        "className": "flex-1 datepicker-width",
                                        "type": "datepicker",
                                        "key": "dateOfJoining",
                                        "templateOptions": {
                                            "label": "Joining Date",
                                            "required": true
                                        }
                                    },
                                  
                                ]
                            },
                            {
                                "fieldGroupClassName": "display-flex",
                                "fieldGroup": [
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "esiNo",
                                        "templateOptions": {
                                            "label": "ESI number",
                                            
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "pfNo",
                                        "templateOptions": {
                                            "label": "PF number",
                                            
                                        }
                                    }
                                ]
                            }
                        ]
                }
            ]
        },
        {
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "bank",
                    "templateOptions": {
                        "label": "Bank",  
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "branch",
                    "templateOptions": {
                        "label": "Branch",
                       
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "accno",
                    "templateOptions": {
                        "label": "Account number",   
                    }
                },
                {
                    "className": "flex-1 datepicker-width",
                    "type": "input",
                    "key": "ifsc",
                    "templateOptions": {
                        "label": "IFSC Code",   
                    }
                },
            ]
        }
    ]
}