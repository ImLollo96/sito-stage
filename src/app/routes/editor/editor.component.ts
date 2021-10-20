import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { DialogEditorComponent } from "src/app/components/dialog/dialog-editor/dialog-editor.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
}) 
export class EditorComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.doAce();
  }

  doAce(){
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    //aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    aceEditor.setTheme("ace/theme/tomorrow");
    aceEditor.session.setMode("ace/mode/json");
    aceEditor.resize();
    aceEditor.on("change", () => {
      //console.log(aceEditor.getValue());
    });
    
    let code = aceEditor.getValue();
    code = JSON.parse(code);
    return code;
    
  }

  openDialog(){
    let code = this.doAce();
    console.log('CODE: ',code);
    const dialogRef = this.dialog.open(DialogEditorComponent, {  /** Apertura Dialog con passaggio dati */
  		data:code
  	});

    dialogRef.afterClosed().subscribe((result) => {   /** Chiusura Dialog */
  		alert(result);
  	});
  }
  
}
