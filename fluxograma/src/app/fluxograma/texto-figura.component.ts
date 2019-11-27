import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './fluxograma.component';

@Component({
    selector: 'texto-figura',
    templateUrl: 'texto-figura.component.html',
  })
  export class TextoFigura {
  
    constructor(
      public dialogRef: MatDialogRef<TextoFigura>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}