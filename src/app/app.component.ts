import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import entityData from "../assets/data/entityData.json";
import entityMeta from "../assets/data/entityMeta.json";
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Manage Entity';
  entityData: any = entityData;
  entityMeta: any = entityMeta;
  labelArr: any = [];
  form: FormGroup;
  dataArr: any = [];
  constructor(private fb: FormBuilder, public dialog: MatDialog) { }
  ngOnInit() {
    this.labelArr = entityMeta.field;
    this.dataArr = entityData;
    this.form = this.createControl();
    // this.onChange();
  }


  onSave() {
    let jsonObj = {
      $original: {}
    }


    console.log("Form Submitted!");
    this.labelArr.forEach(field => {
      if (!field.system) {
        if (this.dataArr[field.name] !== this.form.controls[field.name].value) {
          jsonObj[field.name] = this.form.controls[field.name].value;
          jsonObj.$original[field.name] = this.dataArr[field.name] ? this.dataArr[field.name] : null;
        }
      }

    });
    this.openDialog(jsonObj);
  }

  createControl() {
    const group = this.fb.group({});
    this.labelArr.forEach(element => {
      const control = this.fb.control(this.dataArr[element.name], Validators.required);
      group.addControl(element.name, control);
    });
    return group;

  }

  openDialog(jsonObj) {
    this.dialog.open(DialogComponent, {
      data: {
        jsonObj
      }
    });
  }

}
