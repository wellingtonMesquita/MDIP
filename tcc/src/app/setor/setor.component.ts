import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Setor } from 'app/models/setor';
import { MapeamentoService } from 'app/services/mapeamento.service';


@Component({
    moduleId: module.id,
    selector: 'setor-cmp',
    templateUrl: 'setor.component.html'
})

export class SetorComponent implements OnInit {
    formCliente: FormGroup;
    constructor(private formBuilder: FormBuilder, private service: MapeamentoService) { }
    ngOnInit() {
        this.createForm(new Setor);
    }

    createForm(setor: Setor) {
        this.formCliente = this.formBuilder.group({
            nomeSetor: [setor.nomeSetor],
            responsavelSertor: [setor.responsavelSertor],
        })
      }
     
      onSubmit() {
        this.service.cadastrarSetor(this.formCliente.value).subscribe(data => console.log(data));
        console.log(this.formCliente.value);
     
        // Usar o método reset para limpar os controles na tela
        this.formCliente.reset(new Setor());
      }

}
