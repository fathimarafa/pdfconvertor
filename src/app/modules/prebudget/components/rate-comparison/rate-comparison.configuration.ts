export const RateComparisonMetadata = {
    "moduleId": "ratecomparison",
    "moduleName": "Rate Comaprison",
    "displayName": "Prebudget / Rate Comaprison",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/RateComparison",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'specName',
            "displayName": 'Name'
        },
        {
            "field": 'quantityRequired',
            "displayName": 'Quantity'
        },
        {
            "field": 'specUnit',
            "displayName": 'Unit'
        },
        {
            "field": 'deptRatePerUnit',
            "displayName": 'Dept Rate'
        },
        {
            "field": 'deptAmt',
            "displayName": 'Dept Amount'
        },
        {
            "field": 'specRatePerUnit',
            "displayName": 'Spec Rate'
        },
        {
            "field": 'specAmt',
            "displayName": 'Spec Amount'
        },
        {
            "field": 'quotedRatePerUnit',
            "displayName": 'Negotiated Rate'
        },
        {
            "field": 'quotedAmt',
            "displayName": 'Negotiated Amount'
        },
        {
            "field": 'marktRatePerUnit',
            "displayName": 'Market Rate'
        },
        {
            "field": 'marktAmt',
            "displayName": 'Market Amount'
        }
    ],
    "formFields": [
        {
            "id": "row-1",
            "fieldGroupClassName": "display-flex",
            "fieldGroup": [
                {
                    "className": "flex-1",
                    "key": "projectId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Project",
                        "required": true,
                        "options": []
                    }
                },
                {
                    "className": "flex-1 readonly",
                    "key": "blockId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select block",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                },
                {
                    "className": "flex-1 readonly",
                    "key": "floorId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select floor",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                },
                {
                    "className": "flex-1 readonly",
                    "key": "unitId",
                    "type": "select",
                    "templateOptions": {
                        "label": "Select unit",
                        "required": true,
                        "disabled":true,
                        "options": []
                    },
                    
                }
            ]
        }
    ]
}