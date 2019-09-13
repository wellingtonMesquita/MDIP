import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './fluxograma.component';

@Component({
    selector: 'teste',
    templateUrl: 'teste.component.html',
  })
  export class Teste {
  
    constructor(
      public dialogRef: MatDialogRef<Teste>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}