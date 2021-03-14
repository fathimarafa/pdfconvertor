export const EmployeeRegistrationMetadata = {
    "moduleId": "employee",
    "moduleName": "Employee",
    "displayName": "Build / HR / Employee",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "Employee",
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
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "employeeCategoryId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select category",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeDesignationId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select designation",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "employeeLabourGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour group",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ]
                    }
                },
                {
                    "className": "flex-1",
                    "key": "labourHead",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour head",
                        "required": true,
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ]
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
                    "key": "employeeId",
                    "templateOptions": {
                        "label": "EmployeeID",
                        "required": true
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
                    "key": "employeeTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select employee type",
                        "options": [
                            {
                                "label": "type 1",
                                "value": "type 1"
                            },
                            {
                                "label": "type 2",
                                "value": "type 2"
                            },
                            {
                                "label": "type 3",
                                "value": "type 3"
                            }
                        ]
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
                    "key": "emaailId",
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
                                        "className": "flex-1",
                                        "type": "select",
                                        "key": "employeeSalaryTypeId",
                                        "templateOptions": {
                                            "label": "Select salary type",
                                            "options": [
                                                {
                                                    "label": "type 1",
                                                    "value": "type 1"
                                                },
                                                {
                                                    "label": "type 2",
                                                    "value": "type 2"
                                                }
                                            ],
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "salaryAmount",
                                        "templateOptions": {
                                            "label": "Salary",
                                            "required": true
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
                                        "key": "overtime",
                                        "templateOptions": {
                                            "label": "Overtime Amount",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1 datepicker-width",
                                        "type": "datepicker",
                                        "key": "dateOfJoining",
                                        "templateOptions": {
                                            "label": "Joining Date",
                                            "required": true
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
                                        "key": "esiNo",
                                        "templateOptions": {
                                            "label": "ESI number",
                                            "required": true
                                        }
                                    },
                                    {
                                        "className": "flex-1",
                                        "type": "input",
                                        "key": "pfNo",
                                        "templateOptions": {
                                            "label": "PF number",
                                            "required": true
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
                    "key": "bankName",
                    "templateOptions": {
                        "label": "Bank",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "branchName",
                    "templateOptions": {
                        "label": "Branch",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "acoountNumber",
                    "templateOptions": {
                        "label": "Account number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1 datepicker-width",
                    "type": "datepicker",
                    "key": "ifsccode",
                    "templateOptions": {
                        "label": "IFSC Code",
                        "required": true
                    }
                },
            ]
        }
    ]
}