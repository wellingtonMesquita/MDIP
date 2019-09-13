import { Component, OnInit } from '@angular/core';
import { Page, Processos } from 'app/models/processos';
import { MapeamentoService } from 'app/services/mapeamento.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  ProcessosFiltro } from 'app/models/processosFiltro';
import { ProcessosSetor } from 'app/models/processosSetor';
import { Setor } from 'app/models/setor';


declare var $:any;
declare interface TableData {
  headerRow: string[];
}


@Component({
    selector: 'processos-cmp',
    moduleId: module.id,
    templateUrl: 'processos.component.html'
})



    export class ProcessosComponent implements OnInit{
      public loading = false;
        formCliente: FormGroup;
        setores:Array<Setor> = new Array;
        private processosSetor: Array<ProcessosSetor> = []
        private page : Page;
        public tableData1: TableData;
        private filtro: ProcessosFiltro;

        constructor(private formBuilder: FormBuilder, private service: MapeamentoService) {this.filtro = new ProcessosFiltro() }



          ngOnInit(){
            this.getSetores();
            this.createForm(new ProcessosFiltro);

            this.tableData1 = {
                headerRow: [ 'nomeProcesso', 'dataCriacao', 'situacao','Ação'],
            };
            this.pageProcessos(0,10);
          }

          createForm(processos: ProcessosFiltro) {
            this.formCliente = this.formBuilder.group({
              nomeProcesso: [processos.nomeProcesso],
              dataCriacao: [processos.dataCriacao],
              ordem: [processos.ordem],
              setor: [processos.setor],
              situacao: [processos.situacao],
            })
          }

          pesquisarProcessos(){
            this.filtro = this.formCliente.value;
            this.pageProcessos(0,10);
          }

          getSetores(){
            this.service.buscarSetores().subscribe(data => {
              this.setores = data
            
              
           
           });
          }
    
          pageProcessos(page, size){
          
            this.filtro.page = page;
            this.filtro.size = size;
            this.loading = true;
            this.service.getProcessoPage(this.filtro).subscribe(res => {
              console.log("resposta",res);
              this.page = res
              this.processosSetor =  this.page.content;
              this.loading = false;
              console.log("resposta",this.processosSetor);
            });
          }
        
          changePage(event){
           this.pageProcessos(event.page, event.size);
          }

          pesquisar(){

          }
        }
    

