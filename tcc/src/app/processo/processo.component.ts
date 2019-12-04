import { Component, OnInit,EventEmitter, Input } from '@angular/core';
import { MapeamentoService } from 'app/services/mapeamento.service';
import { Setor } from 'app/models/setor';
import { EventEmitterService } from "../services/event-emmiter.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { processosModel } from 'app/models/processosModel';
import { ProcessosSetor } from 'app/models/processosSetor';
declare var $:any;

@Component({
    selector: 'processo-cmp',
    moduleId: module.id,
    templateUrl:  'processo.component.html'
})

export class ProcessoComponent implements OnInit{
    public loading = false;
    formCliente: FormGroup;
    router: Router;
    varprocessosmodel:processosModel;
    setores:Array<Setor> = new Array;
    setoresSelecionados:Array<Setor> = new Array;
    valid = false;
    validSelecionados = false;
    processosSetorModel:ProcessosSetor;
    idsetorProcesso;
    @Input() modo: number;
    @Input() idprocesso:  number;
    @Input() nomeprocesso: string;
    
    constructor(private service: MapeamentoService, router: Router, private formBuilder: FormBuilder){this.router = router}
    ngOnInit(): void {
       this.varprocessosmodel = new processosModel();
       this.processosSetorModel = new ProcessosSetor();
       this.processosSetorModel.processosModel = new processosModel();
       this.processosSetorModel.setorModel = new Setor();
       if(this.modo==1){
       this.loading =true;
       this.service.getProcessoSetor(this.idprocesso).subscribe(data=>{
           if(data != null){
                this.idsetorProcesso = data[0].id;
                this.validSelecionados = true;
           }
           data.forEach(x=>{
            this.prencherSetores(x.setorModel);
           })
      
           
       });
       
      
    }
       this.service.buscarSetores().subscribe(data => {
        console.log("setores",data);
           this.setores = data
           this.loading = false;
           this.valid = true;
           
        
        });
        if(this.modo == 1){
            this.service.getProcessoid(this.idprocesso).subscribe(data =>{
                console.log(data);
                this.nomeprocesso = data.nomeProcesso;
              });
            this.varprocessosmodel.nomeProcesso =this.nomeprocesso;
            this.formCliente = this.formBuilder.group({
                nomeProcesso: [this.varprocessosmodel.nomeProcesso],
                id: this.idprocesso
            });

        }else{
            this.formCliente = this.formBuilder.group({
                nomeProcesso: [this.varprocessosmodel.nomeProcesso],
                id: null
            });
        }
        

       

      }
     
    
prencherSetores(setor: Setor){
        this.setoresSelecionados.push(setor);

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
            console.log("pokemon",this.setoresSelecionados);
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
            this.idprocesso = data.id;
            this.cadastrarSetorProcesso();   
        });
    }

    cadastrarSetorProcesso(){
        let cont = 0;
            this.setoresSelecionados.forEach(data=>{
                this.processosSetorModel.processosModel.id = this.idprocesso;
                this.processosSetorModel.setorModel = data;
                console.log(this.processosSetorModel);
                      this.processosSetorModel.ordem = cont;
                      cont ++;
                this.service.cadastrarProcessoSetor(this.processosSetorModel).subscribe(data=>{
                    console.log(data);
                    
                    
                
                });
            });
            this.showNotification('top','left','Cadastro feito com sucesso',2);
            //this.router.navigate(['**', 'cadastrarfluxograma',this.idProcesso]);
            window.location.replace('http://localhost:4201/cadastrarfluxograma/'+ this.idprocesso);
        }



        showNotification(from: string, align: string,mensagem: string,tipo: number){
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







