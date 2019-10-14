import { Routes } from '@angular/router';

import { NotificationsComponent }   from './notifications/notifications.component';
import { fluxogramaComponent } from './fluxograma/fluxograma.component';
import { DetalharFluxogramaComponent } from './detalhar_fluxograma/detalharfluxograma.component';
import { CadastrarFluxogramaComponent } from './cadastrar_fluxograma/cadastrarfluxograma.component';
import { EditarFluxogramaComponent } from './editar_fluxograma/editarfluxograma.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'processos',
        pathMatch: 'full',
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
        path: 'detalharfluxograma/:id',
        component: DetalharFluxogramaComponent
    },
    {
        path: 'cadastrarfluxograma/:id',
        component: CadastrarFluxogramaComponent
    },
    {
        path: 'editarfluxograma/:id',
        component: EditarFluxogramaComponent
    }
]
