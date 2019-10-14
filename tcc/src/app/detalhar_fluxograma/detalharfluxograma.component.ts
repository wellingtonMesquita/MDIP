import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'detalharfluxograma-cmp',
    moduleId: module.id,
    templateUrl: 'detalharfluxograma.component.html'
})

export class DetalharFluxogramaComponent{
    valid = false;
    idfluxograma;
    modo = 2;

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(res => {
        this.idfluxograma = res.id
        console.log(this.idfluxograma);
        this.valid = true;
    });
    
    
  }
}