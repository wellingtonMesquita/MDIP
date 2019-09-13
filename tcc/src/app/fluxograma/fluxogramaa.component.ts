import { Component, OnInit } from "@angular/core";
import { Linha } from "./formas/linha";
import { Figura } from "./formas/figura";


@Component({
    selector: 'fluxogramaa-cmp',
    moduleId: module.id,
    templateUrl: 'fluxogramaa.component.html'
})


export class fluxogramaaComponent implements OnInit{
    width = 1000;
    height = 400;
    desenhos = [];
    ctx: CanvasRenderingContext2D;
    numero = 0;
  x = 400;//posição horizontal do objeto (com valor inicial)
  y = 400;//posição vertical do objeto (com valor inicial)
  imageObj = new Image();
  imageName = 'assets/img/formas/inicio.png';
  canvas:any;
  dados:any
  px = 0;
  py = 1;
  atual:string;


  init(ctx: CanvasRenderingContext2D,width,height){
      this.ctx = ctx;
      this.width = width;
      this.height = height;
  }


  atualizarFigura(figura){
    if(this.atual == "figura"){
      figura.imagem.onload = ()=>{
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(figura.imagem, figura.posicaoX, figura.posicaoY);
        this.limpar();
      }
      
       }
  
     if(this.atual == "bolinha"){
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.arc(figura.posicaoX, figura.posicaoY, 5, 0, Math.PI*2, true);
      this.ctx.fill();
      this.limpar();
      if(this.numero == 0){
          this.px = figura.posicaoX;
          this.py = figura.posicaoY;
      }
      if(this.numero == 2){
        this.ligarPontos(1,1);
        let linha = new Linha();
        linha.nome = "linha";
        linha.posicaoX = figura.posicaoX;
        linha.posicaoY = figura.posicaoY;
        linha.posicaoIX = this.px;
        linha.posicaoIY = this.py;
        this.desenhos.push(linha);
        this.numero = 1;
        this.px = figura.posicaoX;
        this.py = figura.posicaoY;
      }
  
     }  
  
    }


    limpar(){
        this.desenhos.forEach(element => {
          if(element.nome == "figura"){
            this.ctx.drawImage(element.imagem, element.posicaoX, element.posicaoY); 
          }
          if(element.nome == "bolinha"){
            this.ctx.beginPath();
            this.ctx.arc(element.posicaoX, element.posicaoY, 5, 0, Math.PI*2, true);
            this.ctx.fill();
          }
          if(element.nome == "linha"){
            
            this.ctx.beginPath();
            this.ctx.moveTo(element.posicaoIX,element.posicaoIY);
            this.ctx.lineTo(element.posicaoX, element.posicaoY);
            this.ctx.stroke();
          }
          
       });
       
       }


       desenharPontos(event){
        this.ctx.beginPath();
        this.ctx.arc((event.clientX- 305), (event.clientY- 170), 5, 0, Math.PI*2, true);
        this.ctx.fill();
        this.numero = this.numero  + 1;
        if(this.numero == 2){
          this.numero =0;
          this.ligarPontos((event.clientX- 305),(event.clientY- 170))
        }
        this.px = (event.clientX- 305);
        this.py = (event.clientY- 170); 
        
      }


       ligarPontos(x,y){
        this.ctx.beginPath();
        this.ctx.moveTo(this.px,this.py);
        this.ctx.quadraticCurveTo(10, 20, x, y);
        this.ctx.stroke();
        
      }

      desenharNaTela(e){
        if(this.atual == "figura"){
        let figura  =  new Figura();
        figura.nome = "figura";
        figura.urlImagem = this.imageName;
        figura.posicaoX = (e.clientX - 350);
        figura.posicaoY = (e.clientY - 170);
        figura.height = this.height;
        figura.width = this.width;
        figura.desenharObjeto();
        this.atualizarFigura(figura);
        this.dados = figura;
        }
        if(this.atual == "bolinha"){
          let figura  =  new Figura();
          figura.posicaoX = (e.clientX- 305);
          figura.posicaoY = (e.clientY- 170);
          figura.nome = "bolinha";
          this.atualizarFigura(figura);
          this.dados = figura;
        }
       
      }
      salvar(){
        if(this.dados.nome == "bolinha"){
          this.numero = this.numero  + 1;
        }
        this.desenhos.push(this.dados);
      }
    


    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }



}