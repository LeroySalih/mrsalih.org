import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModuleId } from '../models/module';

interface ModuleEditEvent {
  module: ModuleId;
}


@Component({
  selector: 'app-module-dialog-component',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.css']
})
export class ModuleDialogComponent implements OnInit {

  form: FormGroup;
  module: ModuleId;

  title: string;
  subtitle: string;
  category: string;
  bodyText: string;
  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<ModuleDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data) {

    console.log(`[Constructor] received: `, data);

    if (data.module) {
      this.module = data.module;
    } else {
      this.module = {id: null, title: '', category: '', subtitle: '', bodyText: '', thumbnailUrl: null, order: 0};
    }
    

   }


  ngOnInit() {

    this.form = this.fb.group({
      title: [this.module.title, []],
      subtitle: [this.module.title, []],
      category: [this.module.category, []],
      bodyText: [this.module.bodyText, []]
    });


  }

  save() {
    console.log(`[save] Sending `, this.module);
    console.log(`[save] form values are: `, this.form.value);

    this.module.title = this.form.value.title;
    this.module.subtitle = this.form.value.subtitle;
    this.module.bodyText = this.form.value.bodyText;
    this.module.category = this.form.value.category;

    this.dialogRef.close(this.module);
  }

  close() {
    this.dialogRef.close();
  }

}
