import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Setor } from 'app/models/setor';
import { processosModel } from 'app/models/processosModel';


@Injectable()
export class MapeamentoService {
    private _Url = 'http://127.0.0.1:8887/frete.json';
    desenhos = [];
    setores:Array<Setor> = new Array;


    constructor(private _http: HttpClient ) { }
    
      cadastrarSetor(file: any) {
        return this._http.post('http://localhost:8080/setor/cadastrar', file)
      }

      cadastrarProcesso(file: any) {
        return this._http.post<processosModel>('http://localhost:8080/processos/cadastrar', file)
      }


      cadastrarFluxograma(file: any) {
        return this._http.post('http://localhost:8080/fluxograma/cadastrar', file)
      }

      buscarSetores() {
        return this._http.get<Array<Setor>>('http://localhost:8080/setor/listar')
      }

      getProcessoPage(ProcessosFiltro){
        return this._http.post<any>('http://localhost:8080/processos/listar',ProcessosFiltro)
        
      }
      getProcessoid(id){
        return this._http.get<any>('http://localhost:8080/processos/'+ id)
        
      }

      getProcessoSetor(id){
        return this._http.get<any>('http://localhost:8080/setor_processos/' + id)
      }
      cadastrarProcessoSetor(file){
        return this._http.post('http://localhost:8080/setor_processos/cadastrar', file)
      }
}