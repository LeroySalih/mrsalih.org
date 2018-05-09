import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-module-dialog-component',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.css']
})
export class ModuleDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<ModuleDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;

   }


  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
