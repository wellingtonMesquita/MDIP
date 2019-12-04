import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapeamentoService } from 'app/services/mapeamento.service';

@Component({
    selector: 'editarprocessos-cmp',
    moduleId: module.id,
    templateUrl: 'editarprocessos.component.html'
})

export class EditarProcessosComponent{
    valid = false;
    idprocesso;
    modo = 1;
    nomeprocesso;

constructor(private route: ActivatedRoute,private service: MapeamentoService,){
    
    this.route.params.subscribe(res => {
        this.idprocesso =res.id
        this.valid = true;
        
    })

     
   
    
    
  }
}