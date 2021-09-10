export const EmployeeDesignationRegistrationMetadata = {
  "moduleId": "EmployeeDesignationRegistration",
  "moduleName": "EmployeeDesignationRegistration",
  "displayName": "Build / HR / Employee Designation Registration",
  "hasAddNew": true,
  "hasEdit": true,
  "hasDelete": true,
  "useMultiStepForm": false,
  "serviceEndPoint": "BuildExeHR/api/EmployeeDesignation",
  "dropdownEndpoints": {
      "employeeCategory": "BuildExeHR/api/EmployeeCategory",
     
  },
  "tableColumns": [
      {
          "field": 'id',
          "displayName": 'SNo'
      },
      {
          "field": 'employeeCategoryId',
          "displayName": 'Category'
      },
      {
          "field": 'employeeDesignationName',
          "displayName": 'Designation'
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
          "id": "employeerrow1",
          "fieldGroupClassName": "display-flex",
          "fieldGroup": [
              {
                  "className": "flex-1",
                  "key": "employeeCategoryId",
                  "type": "select",
                  "templateOptions": {
                      "label": "Category",
                      "required": true,
                      "options": []
                  }
              },
             
          ]
      },
      {
        "id": "employeerrow2",
          "fieldGroupClassName": "display-flex",
          "fieldGroup": [
            {
              "className": "flex-1",
              "key": "employeeDesignationName",
              "type": "input",
              "templateOptions": {
                  "label": "Designation",
                  "required": true
                 
              }
          }
          ]
      },
      {
        "id": "employeerrow3",
          "fieldGroupClassName": "display-flex",
          "fieldGroup": [
              {
                  "className": "flex-1",
                  "type": "textarea",
                  "key": "description",
                  "templateOptions": {
                      "label": "Description",
                      "required": true,
                      "rows":6
                  }
              }
              
          ]
      },
      {
        "id": "employeerrow4",
          "fieldGroupClassName": "display-flex",
          "fieldGroup": [
              {
                "className": "is-siteManager checkbox-outline-none",
                "type": "checkbox",
                "key": "marketing",
                "defaultValue": 0,
                "templateOptions": {
                    "label": "Marketing",
                }
              },
            //   {
            //     "className": "is-siteManager checkbox-outline-none",
            //     "type": "checkbox",
            //     "key": "siteEngineer",
            //     "defaultValue": 0,
            //     "templateOptions": {
            //         "label": "Site Engineer",
            //     }
            //   }
             
          ]
      },
      
  ]
}