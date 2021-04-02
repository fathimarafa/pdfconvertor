export const AccountHeadRegistrtaionMetadata = {
    "moduleId": "accountheadregistrtaion",
    "moduleName": "Account Head Registrtaion",
    "displayName": "Basic / Account Head Registrtaion",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/AccountHead",
    "dependentServiceEndpoints":{
        "accountType":"BuildExeBasic/api/AccountType",
        "accountGroup":"BuildExeBasic/api/AccountGroup",
        "accountSubGroup":"BuildExeBasic/api/AccountSubGroup"
    },
    "tableColumns": [
        {
            "field": 'accountHeadId',
            "displayName": 'SNo'
        },
        {
            "field": 'accountHeadName',
            "displayName": 'Account Head'
        },
        {
            "field": 'accountTypeId',
            "displayName": 'Account Type'
        },
        {
            "field": 'accountGroupId',
            "displayName": 'Account Group'
        },
        {
            "field": 'accountSubGroupId',
            "displayName": 'Account SubGroup'
        },
        {
            "field": 'description',
            "displayName": 'Description'
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
                    "key": "accountHeadName",
                    "type": "input",
                    "templateOptions": {
                        "label": "Head Name",
                        "required": true
                    }
                },
                {
                    "className": "flex-1",
                    "key": "accountTypeId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Account Type",
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
                    "key": "accountGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Account Group",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1",
                    "key": "accountSubGroupId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Account SubGroup",
                        "required": true,
                        "options": []
                    }
                },
               
            ]
        },
        {
            "id": "row-3",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "openingAmount",
                    "type": "input",
                    "templateOptions": {
                        "label": "Opening Amount",
                        "required": true,
                        "type": "number"
                    }
                },
                {
                    "className": "flex-1",
                    "key": "openingType",
                    "type": "select",
                    "templateOptions": {
                        "label": "Opening Type",
                        "required": true,
                        "options": [
                            {
                                "label":"Credit",
                                "value":"C"
                            },
                            {
                                "label":"Debit",
                                "value":"D"
                            }
                        ]
                    }
                },
            ]
        },
        {
            "id": "row-4",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "description",
                    "type": "textarea",
                    "templateOptions": {
                        "label": "Description",
                        "required": true,
                        "rows": 5
                    }
                }
            ]
        }
    ]
}