
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cadastrarfluxograma-cmp',
    moduleId: module.id,
    templateUrl: 'cadastrarfluxograma.component.html'
})

export class CadastrarFluxogramaComponent{
    valid = false;
    idfluxograma;
    modo = 1;

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(res => {
        this.idfluxograma =res.id
        console.log(this.idfluxograma);
        this.valid = true;
    });
    
    
  }
}