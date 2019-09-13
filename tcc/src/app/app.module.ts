import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import {  CadastrarProcessoComponent }   from './criar-processo/cadastrar-processo.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { fluxogramaComponent } from './fluxograma/fluxograma.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { Teste } from './fluxograma/teste.component';
import { FormsModule } from '@angular/forms';
import { ScrollingModule, ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { SetorComponent } from './setor/setor.component';
import { ProcessosComponent } from './processos/processos.component';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { MapeamentoService } from './services/mapeamento.service';
import { PaginationComponent } from './pagination/paginacao.component';
import { NgxLoadingModule } from 'ngx-loading';




@NgModule({
  declarations: [
    AppComponent,
    ProcessosComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    CadastrarProcessoComponent,
    SetorComponent,
    NotificationsComponent,
    UpgradeComponent,
    fluxogramaComponent,
    Teste,
    PaginationComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
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
