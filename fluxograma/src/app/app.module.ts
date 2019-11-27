import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { NotificationsComponent }   from './notifications/notifications.component';
import { fluxogramaComponent } from './fluxograma/fluxograma.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ScrollingModule, ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { MapeamentoService } from './services/mapeamento.service';
import { NgxLoadingModule } from 'ngx-loading';
import { DetalharFluxogramaComponent } from './detalhar_fluxograma/detalharfluxograma.component';
import { CadastrarFluxogramaComponent } from './cadastrar_fluxograma/cadastrarfluxograma.component';
import { EditarFluxogramaComponent } from './editar_fluxograma/editarfluxograma.component';
import * as $ from 'jquery';
import { BasicAuthHtppInterceptorService } from './services/BasicAuthHtppInterceptorService.service ';
import { TextoFigura } from './fluxograma/texto-figura.component';
import { TextoSelector } from './fluxograma/texto.component';





@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    fluxogramaComponent,
    TextoFigura,
    TextoSelector,
    DetalharFluxogramaComponent,
    CadastrarFluxogramaComponent,
    EditarFluxogramaComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FixedPluginModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    KeyboardShortcutsModule.forRoot(),
    ScrollingModule,
    ScrollDispatchModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
  
  
   
   

  ],
  providers: [ScrollDispatcher,MapeamentoService,{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [TextoFigura,TextoSelector]
})
export class AppModule { }
