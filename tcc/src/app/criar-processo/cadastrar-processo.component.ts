import { Component, OnInit,EventEmitter } from '@angular/core';
import { MapeamentoService } from 'app/services/mapeamento.service';
import { Setor } from 'app/models/setor';
import { EventEmitterService } from "../services/event-emmiter.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { processosModel } from 'app/models/processosModel';
import { ProcessosSetor } from 'app/models/processosSetor';
declare var $:any;

@Component({
    selector: 'cadastrar-processo-cmp',
    moduleId: module.id,
    templateUrl: 'cadastrar-processo.component.html'
})

export class CadastrarProcessoComponent implements OnInit{
    public loading = false;
    formCliente: FormGroup;
    router: Router;
    varprocessosmodel:processosModel;
    setores:Array<Setor> = new Array;
    setoresSelecionados:Array<Setor> = new Array;
    valid = false;
    validSelecionados = false;
    idProcesso: number;
    processosSetorModel:ProcessosSetor;
    
    constructor(private service: MapeamentoService, router: Router, private formBuilder: FormBuilder){this.router = router}
    ngOnInit(): void {
       this.varprocessosmodel = new processosModel();
       this.processosSetorModel = new ProcessosSetor();
       this.processosSetorModel.processosModel = new processosModel();
       this.processosSetorModel.setorModel = new Setor();
       this.loading =true;
       this.service.buscarSetores().subscribe(data => {
           this.setores = data
           this.loading = false;
           this.valid = true;
           
        
        });
        this.formCliente = this.formBuilder.group({
            nomeProcesso: [this.varprocessosmodel.nomeProcesso], 
        });
      }
     
    

    

    adicionarSetor(setor:Setor){
        let verifica = false;
        this.setoresSelecionados.forEach(x=>{
         if(x.nomeSetor == setor.nomeSetor){
            verifica = true;
         }   
        
        });
        if(!verifica){
            this.validSelecionados = true;
            this.setoresSelecionados.push(setor);
        }
        
       
           
        
    }

    excluirSetor(setor: Setor){
        const index = this.setoresSelecionados.indexOf(setor);
        this.setoresSelecionados.splice(index, 1);
    }

    gerar(){
        EventEmitterService.get("setores").emit(this.setoresSelecionados);
        this.cadastrarProcesso();   
    }
    cadastrarProcesso(){
        this.service.cadastrarProcesso(this.formCliente.value).subscribe(data => {
            this.idProcesso = data.id;
            this.cadastrarSetorProcesso();   
        });
    }

    cadastrarSetorProcesso(){
        
            this.setoresSelecionados.forEach(data=>{
                this.processosSetorModel.processosModel.id = this.idProcesso;
                this.processosSetorModel.setorModel = data;
                console.log(this.processosSetorModel);
                this.service.cadastrarProcessoSetor(this.processosSetorModel).subscribe(data=>{
                    console.log(data);
                
                });
            });
            this.showNotification('top','left','Cadastro feito com sucesso',2);
            //this.router.navigate(['**', 'cadastrarfluxograma',this.idProcesso]);
            window.location.replace('http://localhost:4201/cadastrarfluxograma/'+ this.idProcesso);
        }



        showNotification(from, align,mensagem,tipo){
            var type = ['','info','success','warning','danger'];
    
            var color = Math.floor((Math.random() * 4) + 1);
    
            $.notify({
                icon: "ti-gift",
                message: mensagem
            },{
                type: type[tipo],
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            });
        }
        
        
    }







