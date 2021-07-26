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
                        "required": true,
                        "options": []
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "![1,2,3,4].includes(model.employeeCategoryId)",
                    }
                },
                {
                    "className": "flex-1",
                    "key": "labourHead",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select labour head",
                        "required": true,
                        "options": []
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": "!(model.employeeCategoryId == `1`)",
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
                    "key": "id",
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
                    "key": "employeeCode",
                    "type": "input",
                    "templateOptions": {
                        "label": "Employee Code",
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
                                        "className": "flex-1",
                                        "type": "select",
                                        "key": "employeeSalaryTypeId",
                                        "templateOptions": {
                                            "label": "Select salary type",
                                            "options": [
                                                {
                                                    "label": "Daily",
                                                    "value": 1
                                                },
                                                {
                                                    "label": "Monthly",
                                                    "value": 2
                                                },
                                                {
                                                    "label": "Contract",
                                                    "value": 3
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
                                            "type": 'number',
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
                                            "type": 'number',
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
                    "key": "bank",
                    "templateOptions": {
                        "label": "Bank",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "branch",
                    "templateOptions": {
                        "label": "Branch",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "type": "input",
                    "key": "accno",
                    "templateOptions": {
                        "label": "Account number",
                        "required": true
                    }
                },
                {
                    "className": "flex-1 datepicker-width",
                    "type": "input",
                    "key": "ifsc",
                    "templateOptions": {
                        "label": "IFSC Code",
                        "required": true
                    }
                },
            ]
        }
    ]
}