import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editarfluxograma-cmp',
    moduleId: module.id,
    templateUrl: 'editarfluxograma.component.html'
})

export class EditarFluxogramaComponent{
    valid = false;
    idfluxograma;
    modo = 3;

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(res => {
        this.idfluxograma =res.id
        this.valid = true;
    });
    
    
  }
}