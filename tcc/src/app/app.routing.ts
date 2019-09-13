import { Routes } from '@angular/router';

import { ProcessosComponent }   from './processos/processos.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { CadastrarProcessoComponent }   from './criar-processo/cadastrar-processo.component';

import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { fluxogramaComponent } from './fluxograma/fluxograma.component';
import { SetorComponent } from './setor/setor.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'processos',
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
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'cadastrar-processos',
        component: CadastrarProcessoComponent
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
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'fluxograma/:id',
        component: fluxogramaComponent
    }
]
