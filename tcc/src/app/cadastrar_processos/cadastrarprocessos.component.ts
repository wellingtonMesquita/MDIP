
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cadastrarprocessos-cmp',
    moduleId: module.id,
    templateUrl: 'cadastrarprocessos.component.html'
})

export class CadastrarProcessosComponent{
    valid = false;
    idprocesso;
    modo = 0;
    nomeprocesso = "";

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(res => {
        this.idprocesso =res.id
        console.log(this.idprocesso);
        this.valid = true;
    });
  }
}