import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from 'src/app/routes/editor/editor.component';

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {

  form : FormGroup;
  fields : FormlyFieldConfig[];
  model: any = {};

  constructor(public dialogRef: MatDialogRef<EditorComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.form = new FormGroup({}); /** creazione form */
    this.fields = data; /** configurazione del form in base a ciò che gli è stato passato */
  }

  ngOnInit(): void {
  }

  
  submit(){
    let content = JSON.stringify(this.model) /** conversione in stringa */
    this.dialogRef.close(content);  /** passa il risultato e chiude il Dialog */
  }
  

}

// [
// 	{
//         	"key": "name",
//         	"type": "input",
//         	"templateOptions": {
//           		"type": "text",
//           		"label": "Name",
//           		"placeholder": "Name",
//           		"required": true
//         	}
// 	},
// 	{
//         	"key": "lastName",
//         	"type": "input",
//         	"templateOptions": {
//           		"type": "text",
//           		"label": "Last Name",
//           		"placeholder": "Last Name",
//           		"required": true
//         	}
// 	}   
// ]
