import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './fluxograma.component';

@Component({
    selector: 'texto',
    templateUrl: 'texto.component.html',
  })
  export class TextoSelector {
  
    constructor(
      public dialogRef: MatDialogRef<TextoSelector>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}