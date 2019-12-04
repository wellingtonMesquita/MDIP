import { Routes } from '@angular/router';

import { ProcessosComponent }   from './processos/processos.component';
import { UserComponent }   from './user/user.component';

import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { fluxogramaComponent } from './fluxograma/fluxograma.component';
import { SetorComponent } from './setor/setor.component';
import { LoginComponent } from './login/login.component';
import { ProcessoComponent } from './processo/processo.component';
import { CadastrarProcessosComponent } from './cadastrar_processos/cadastrarprocessos.component';
import { EditarProcessosComponent } from './editar_processos/editarprocessos.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'processos',
        component: ProcessosComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'cadastrar-processos',
        component: ProcessoComponent
    },
    {
        path: 'setor',
        component: SetorComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'fluxograma/:id',
        component: fluxogramaComponent
    },
    {
        path: 'cadastrarprocessos',
        component: CadastrarProcessosComponent
    },
    {
        path: 'editarprocessos/:id',
        component: EditarProcessosComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]
