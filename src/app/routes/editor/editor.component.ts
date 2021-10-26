import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { DialogEditorComponent } from "src/app/components/dialog/dialog-editor/dialog-editor.component";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
}) 
export class EditorComponent implements AfterViewInit {

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.doAce(false);
  }

/** Editor ACE */
  doAce(check:boolean){
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme("ace/theme/tomorrow"); /** tema della box */
    aceEditor.session.setMode("ace/mode/json"); /** gestione della sintassi nel box */
    aceEditor.resize(); /** per modificare grandezza box */
    aceEditor.on("change", () => {
      //console.log(aceEditor.getValue());
    });
    if(check==true){
      let code = aceEditor.getValue();  /** prende ciò che è stato scritto nella box */
      if(code != ''){
        try{
          code = JSON.parse(code);  /** lo converte */
          return code;
        }catch(err){
          this.openSnackBar('errore');
          return false;
        }
      }else{
        this.openSnackBar('niente');
        return false;
      }
    }else{
      let pippo = JSON.stringify(localStorage.getItem('editorOutput'));
      let app = JSON.parse(pippo);
      aceEditor.session.setValue(app);
      return;
    }
  }

/** Dialog con form generata dal codice scritto su box ACE*/
  openDialog(){
    let code = this.doAce(true);  /** raccolta nella variabela del contenuto del box da passare al dialog */
    if(code != false){
      const dialogRef = this.dialog.open(DialogEditorComponent, {  /** Apertura Dialog con passaggio dati */
        data:code
      });

      dialogRef.afterClosed().subscribe((result) => { /** Chiusura Dialog */  
        alert(result);
      });
    }else{
      
    }
    
    
  }
  
  /** Snackbar */
	openSnackBar(/** string passata da funzioni per selezionare evento */check:string){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check=='niente'){
			this.snackBar.open('Inserisci il codice', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='errore'){
			this.snackBar.open('Errore nella scrittura del codice', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else{
			alert('Errore');
		}
	}
}
