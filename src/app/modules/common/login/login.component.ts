import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];


  constructor(
    private router: Router
  ) {
    this.fields = [
      {
        "key": "Usertype",
        "type": "select",
        "templateOptions": {
          "label": "Select type",
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
        "type": "input",
        "key": "Login",
        "templateOptions": {
          "label": "Login",
          "required": true
        }
      },
      {
        "type": "input",
        "key": "Password",
        "templateOptions": {
          "label": "Password",
          "required": true
        }
      }
    ]
  }

  ngOnInit(): void {
  }

  onLoginBtnClick() {
    this.router.navigate(['/home'])
  }
  
}
