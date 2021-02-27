import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NormalProjectMetadata } from './normal-project.configuration';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.css']
})
export class NormalProjectComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  tabs = {
    first: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: NormalProjectMetadata["formFields-tab1"]
    },
    second: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: NormalProjectMetadata["formFields-tab2"]
    },
    third: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: NormalProjectMetadata["formFields-tab3"]
    }
    // last: {
    //   form: new FormGroup({}),
    //   model: {},
    //   options: {},
    //   fields: []
    // },
  }

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NormalProjectComponent>,
    ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  onSubmitBtnClick(stepper){
    stepper.reset();
  }

}
