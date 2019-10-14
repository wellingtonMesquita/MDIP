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
import { Teste } from './fluxograma/teste.component';
import { FormsModule } from '@angular/forms';
import { ScrollingModule, ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { MapeamentoService } from './services/mapeamento.service';
import { NgxLoadingModule } from 'ngx-loading';
import { DetalharFluxogramaComponent } from './detalhar_fluxograma/detalharfluxograma.component';
import { CadastrarFluxogramaComponent } from './cadastrar_fluxograma/cadastrarfluxograma.component';
import { EditarFluxogramaComponent } from './editar_fluxograma/editarfluxograma.component';
import * as $ from 'jquery';




@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    fluxogramaComponent,
    Teste,
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
  providers: [ScrollDispatcher,MapeamentoService],
  bootstrap: [AppComponent],
  entryComponents: [Teste]
})
export class AppModule { }
