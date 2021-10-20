import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from 'src/app/routes/editor/editor.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {

  form : FormGroup;
  fields : FormlyFieldConfig[];
  model: any = {};

  constructor(public dialogRef: MatDialogRef<EditorComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: MatSnackBar) { 
    this.form = new FormGroup({});
    this.fields = data;
    console.log('DATA: ',data);
  }

  ngOnInit(): void {
  }

  
  submit(){
    let pippo = JSON.stringify(this.model)
    this.dialogRef.close(pippo);
  }
  

}

// {
//   key: 'name',
//   type: 'input',
//   templateOptions: {
//     type: 'text',
//     label: 'Name',
//     placeholder: 'Name',
//     required: true,
//   }
// }
