import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, AfterViewInit } from "@angular/core";
import { Imagem } from "app/desenhos";
import { Figura } from "./formas/figura";
import { Linha } from "./formas/linha";

import {MatDialog} from '@angular/material/dialog';
import { Teste } from './teste.component';
import { Texto } from './formas/texto';
import { ShortcutInput, AllowIn, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { Setores } from './formas/setores';
import { MapeamentoService } from 'app/services/mapeamento.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';


export interface DialogData {
  titulo: string;
  descricao: string;
}



@Component({
    selector: 'fluxograma-cmp',
    moduleId: module.id,
    templateUrl: 'fluxograma.component.html'
})


export class fluxogramaComponent implements OnInit, AfterViewInit{
  @Input() idFluxograma;
  @Input() modo;

  @ViewChild("canvas") myCanvas;
  ctx:CanvasRenderingContext2D;
 width = 1000;
 height = 480;
  numero  =  0;
  valid = false;
  componentes = false;
  w = 0;
  s = 0;
  a = 0;
  d = 0;
  x = 400;//posição horizontal do objeto (com valor inicial)
  y = 400;//posição vertical do objeto (com valor inicial)
  imageObj = new Image();
  imageName = 'assets/img/formas/inicio.png';
  desenhos = [];
  canvas:any;
  dados:any
  px = 0;
  py = 1;
  xx = 0;
  yy = 0;
  atual:string;
  balaceamentox;
  balaceamentoy;
  titulo: string;
  descricao: string;
  figuraTexto:Texto;
  total: number;
  objetoColisao: Figura;
  setores = [];
  aux = [];
  mover = false;
  linha = false;
  
  


  closeResult: string;
  constructor(public dialog: MatDialog, public service: MapeamentoService, private route: ActivatedRoute) {
    this.service.desenhos.length = 0;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Teste, {
      width: '400px',
      height:'300px',
      data: {titulo: this.titulo, descricao: this.descricao}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result != null && result != undefined){
     this.figuraTexto = result;
     this.titulo = result.titulo;
     this.descricao = result.descricao;
     this.salvarEdicao();
      }
    });
  }

  
  
  shortcuts: ShortcutInput[] = [];  
    @ViewChild('input') input: ElementRef;  
  ngAfterViewInit() {
    this.shortcuts.push(
      {  
        key: "ctrl + z",  
        preventDefault: true,  
        allowIn: [AllowIn.Textarea, AllowIn.Input],  
        command: e => { 
          console.log(e);
            if(this.service.desenhos.length>0){
              this.service.desenhos.pop();
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.limpar();
            }

        } 
    },
    {  
      key: "shift + d",  
      preventDefault: true,  
      allowIn: [AllowIn.Textarea, AllowIn.Input],  
      command: e => { 
        console.log(e);
          this.d  = this.d + 10;
          this.w = 0;
          this.s = 0;
          this.a = 0;
          this.mover = true;
          this.ctx.clearRect(0, 0, this.width, this.height);
          this.limpar();

      } 
  },
  {  
    key: "shift + a",  
    preventDefault: true,  
    allowIn: [AllowIn.Textarea, AllowIn.Input],  
    command: e => { 
      console.log(e);
        this.a  = this.a - 10;
        this.w = 0;
        this.s = 0;
        this.d = 0;
        this.mover = true;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.limpar();
    } 
},
{  
  key: "shift + s",  
  preventDefault: true,  
  allowIn: [AllowIn.Textarea, AllowIn.Input],  
  command: e => { 
    console.log(e);
      this.s  = this.s + 10;
          this.w = 0;
          this.d = 0;
          this.a = 0;
      this.mover = true;
      this.ctx.clearRect(0, 0, this.width, this.height);
        this.limpar();

  } 
},
{  
  key: "shift + w",  
  preventDefault: true,  
  allowIn: [AllowIn.Textarea, AllowIn.Input],  
  command: e => { 
    console.log("w");
      this.w  = this.w - 10;
          this.s = 0;
          this.d = 0;
          this.a = 0;
      this.mover = true;
      this.ctx.clearRect(0, 0, this.width, this.height);
        this.limpar();

  } 
},
{  
  key: "ctrl + v",  
  preventDefault: true,  
  allowIn: [AllowIn.Textarea, AllowIn.Input],  
  command: e => { 
    console.log(e);
     this.linha = true;
  } 
}
    );
    this.keyboard.select("cmd + f").subscribe(e => console.log(e));  
  }
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;


  getSetores(){
    this.service.getProcessoSetor(Number.parseInt(this.idFluxograma)).subscribe(data=>{
      this.incluirSetores(data);
    });
  }

  getFluxograma(){
    this.service.getFluxograma(Number.parseInt(this.idFluxograma)).subscribe(data=>{
      this.service.desenhos = data;
      this.getSetores();
      this.componentes = true;
    });
  }

  ngOnInit(): void {
    this.afs();
    this.getFluxograma();
    this.imageObj.src = this.imageName;
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.atual = "";
    this.imageName = 'assets/img/formas/inicio.png';
    this.balaceamentox = 350;
    this.balaceamentoy = 190;
    this.figuraTexto = new Texto();
    this.figuraTexto.titulo = '';
    this.figuraTexto.descricao = '';
    this.total = 0;
    this.objetoColisao = new Figura();
    this.limpar();
  }

  incluirSetores(data){
    let valor = 160;
    data.forEach(x => {
      this.desenharSetores(valor,valor,x.setorModel.nomeSetor);
      valor = (valor + 160);
    });
      
    }
   
  
  desenharc(event){
    this.ctx.beginPath();
    this.ctx.arc((event.clientX- this.balaceamentox), (event.clientY- this.balaceamentoy), 5, 0, Math.PI*2, true);
    this.ctx.fill();
    this.px = (event.clientX- this.balaceamentox);
    this.py = (event.clientY- this.balaceamentoy); 
    
  }



  limpar(){ 
    this.objetoColisao = null;
    
    this.service.desenhos.forEach(element => {
      if(element.nome == "figura"){
        if(this.mover){
        element.posicaoX = element.posicaoX + this.d;
        element.posicaoX = element.posicaoX + this.a;
        element.posicaoY = element.posicaoY + this.w;
        element.posicaoY = element.posicaoY + this.s;
        }
        this.ctx.drawImage(this.adicionarImagem(element.urlImagem), element.posicaoX, element.posicaoY);
        this.detectarObjeto(element,this.xx,this.yy);
        this.criarTexto(element); 
      }
      if(element.nome == "bolinha"){
        element.posicaoX = element.posicaoX + this.d;
        element.posicaoX = element.posicaoX + this.a;
        element.posicaoY = element.posicaoY + this.w;
        element.posicaoY = element.posicaoY + this.s;
        this.ctx.beginPath();
        this.ctx.arc(element.posicaoX, element.posicaoY, 5, 0, Math.PI*2, true);
        this.ctx.fill();
      }
      if(element.nome == "linha"){
        element.posicaoX = element.posicaoX + this.d;
        element.posicaoX = element.posicaoX + this.a;
        element.posicaoY = element.posicaoY + this.w;
        element.posicaoY = element.posicaoY + this.s;
        element.posicaoIX = element.posicaoIX + this.d;
        element.posicaoIX = element.posicaoIX + this.a;
        element.posicaoIY = element.posicaoIY + this.w;
        element.posicaoIY = element.posicaoIY + this.s;
        
      this.ctx.beginPath();
      this.ctx.moveTo(element.posicaoIX,element.posicaoIY);
      this.ctx.lineTo(element.posicaoX, element.posicaoY);
      this.ctx.stroke();
      }
      if(element.nome == "linhaSetor"){
        element.posicaoY = element.posicaoY + this.w;
        element.posicaoY = element.posicaoY + this.s;
        element.posicaoIY = element.posicaoIY + this.w;
        element.posicaoIY = element.posicaoIY + this.s;
        
      this.ctx.beginPath();
      this.ctx.moveTo(element.posicaoIX,element.posicaoIY);
      this.ctx.lineTo(element.posicaoX, element.posicaoY);
      this.ctx.stroke();
      }

      if(element.nome == "setor"){
        console.log("setor setor");
        element.y = element.y  + this.w;
        element.y = element.y + this.s;
        this.ctx.font = "20px Arial";
        this.ctx.fillText(element.texto, element.x, element.y -3);
        }
      
   });
  
   this.mover = false;
   this.s = 0;
    this.d = 0;
    this.a = 0;
    this.w = 0;
}

   criarTexto(element){
    this.ctx.font = "15px Arial";
    
    this.ctx.fillText(element.titulo, element.posicaoX + 14, element.posicaoY + 50);
   }

   detectarObjeto(element,xx,yy){
        if((element.posicaoX > (xx-30) && element.posicaoX < (xx+30)) && (element.posicaoY > (yy-20) && element.posicaoY < (yy+20))){
          this.objetoColisao = element;
          
         
        }
      
   }

   desenharSetores(x,y,texto){
       let linha  = new Linha;
       linha.nome = "linhaSetor"
       linha.posicaoIX = 0;
       linha.posicaoIY = x;
       linha.posicaoX = 1000;
       linha.posicaoY = y;
       this.service.desenhos.push(linha);
       let setor = new Setores();
      this.ctx.beginPath();
      this.ctx.moveTo(0,x);
      this.ctx.lineTo(1000, y);
      this.ctx.stroke();
      setor.texto = texto;
      setor.nome = "setor"
      setor.x = 11;
      setor.y = x;
      this.service.desenhos.push(setor);
      this.limpar();
   }
  
  editarFigura(){
          this.titulo = this.objetoColisao.titulo;
          this.descricao = this.objetoColisao.descricao;
          this.openDialog();
      }
    
salvarEdicao(){
  for(let i = 0; i<this.service.desenhos.length;i++){
      if(this.service.desenhos[i].identificador == this.objetoColisao.identificador){
        this.service.desenhos[i].titulo = this.titulo;
        this.service.desenhos[i].descricao = this.descricao;
      }
    } this.objetoColisao = null;
}

  inicio(){
    this.imageName = 'assets/img/formas/inicio.png'
    this.atual = "figura"
    console.log("aqui jas");
    this.s = 0;
    this.d = 0;
    this.a = 0;
    this.w = 0;
  }

  bolinha(){
    this.atual = "bolinha"
    this.s = 0;
    this.d = 0;
    this.a = 0;
    this.w = 0;
  }

  etapa(){
    this.imageName = 'assets/img/formas/etapa.png'
    this.atual = "figura"
    this.s = 0;
    this.d = 0;
    this.a = 0;
    this.w = 0;
    
  }

  fim(){
    this.imageName = 'assets/img/formas/Fim.png'
    this.atual = "figura"
    this.s = 0;
    this.d = 0;
    this.a = 0;
    this.w = 0;
  
  }

  desicao(){
    this.imageName = 'assets/img/formas/desicao.png'
    this.atual = "figura"
  }

  criar(figura){
    
  if(this.atual == "figura"){
   figura.imagem = this.adicionarImagem(figura.urlImagem);
    figura.imagem.onload = ()=>{
      console.log("ola");
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(figura.imagem, figura.posicaoX, figura.posicaoY);
      this.limpar();
    }
    
     }

   if(this.atual == "bolinha"){
    this.ctx.beginPath();
    this.ctx.moveTo(figura.posicaoX,figura.posicaoY);
    this.ctx.lineTo(100,75);
    this.ctx.lineTo(100,25);
    this.ctx.fill();

   // this.ctx.clearRect(0, 0, this.width, this.height);
    //this.ctx.beginPath();
    //this.ctx.arc(figura.posicaoX, figura.posicaoY, 5, 0, Math.PI*2, true);
    //this.ctx.fill();
    //this.limpar();
   }  

  }

adicionarImagem(url){
  console.log("entrou aqui");
  let imagem =  new Image();
  imagem.src = url;
  return imagem;
}

  desenharLinhas(figura){
    if(this.numero == 0){
      this.linha = false;
      this.px = figura.posicaoX;
      this.py = figura.posicaoY;
     
  }
  if(this.numero == 1){
    this.desenhar(figura.posicaoX,figura.posicaoY);
    let linha = new Linha();
    linha.nome = "linha";
    linha.posicaoX = figura.posicaoX;
    linha.posicaoY = figura.posicaoY;
    linha.posicaoIX = this.px;
    linha.posicaoIY = this.py;
    this.service.desenhos.push(linha);
    this.linha = true;
    
    
  }
  if(this.numero == 0){
      this.numero = this.numero+1;
     }else{
       this.numero = 0;
  }
}

  desenhar4(e){
    if(this.componentes){
    this.xx = (e.x );
    this.yy = (e.y);
    if(this.atual != ""){
       if(this.atual == "figura"){
            let figura  =  new Figura();
            figura.nome = "figura";
            figura.titulo = this.figuraTexto.titulo;
            figura.descricao = this.figuraTexto.descricao;
            figura.urlImagem = this.imageName;
            figura.posicaoX = (e.x);
            figura.posicaoY = (e.y);
            figura.height = this.height;
            figura.width = this.width;
            this.criar(figura);
            this.dados = figura;
    }
    if(this.atual == "bolinha"){
      let figura  =  new Figura();
      figura.posicaoX = (e.x + 45);
      figura.posicaoY = (e.y  +26);
      figura.nome = "bolinha";
      this.criar(figura);
      this.dados = figura;
    }
   
   }else{
   this.ctx.clearRect(0, 0, this.width, this.height);
   this.limpar();
   }
    }
  }

  
  salvar(){
    if(this.atual != ""){
      if(this.dados.nome == "bolinha"){
          this.desenharLinhas(this.dados);
          this.atual = "";
          if(this.linha){
            this.dados.identificador = this.total;
            this.service.desenhos.push(this.dados);
            this.total = this.total + 1;
          }
          
    }else{

      this.dados.identificador = this.total;
      this.service.desenhos.push(this.dados);
      this.total = this.total + 1;
      this.atual = "";
    }
    
  }
  this.limpar();
 
}

  desenhar(x,y){
    this.ctx.beginPath();
    this.ctx.moveTo(this.px,this.py);
    this.ctx.lineTo(y, x); ;
    this.ctx.stroke();
  }

  salvarFluxograma(){
   let  idProcessos = {nome:'',idProcesso:''};
   idProcessos.nome = "processoid"
    idProcessos.idProcesso = this.idFluxograma;
    this.service.desenhos.push(idProcessos);
    if(this.modo == 3){
      let  editar = {nome:'editar',idProcesso:''};
      editar.idProcesso = this.idFluxograma;
      this.service.desenhos.push(editar);
    }
    this.service.cadastrarFluxograma(this.service.desenhos).subscribe(data => {
    });
  }

 
afs(){
 let canvas2 = $('canvas');
    canvas2.mousemove(e => {
      this.desenhar4(this.getMousePos(this.canvas,e));
    });

    }

     getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - (rect.left+50),
        y: evt.clientY - (rect.top+30)
      };
  }
 
}