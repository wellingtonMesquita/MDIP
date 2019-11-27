import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'processos', title: 'Processos',  icon: 'ti-panel', class: '' },
    { path: 'user', title: 'Cadastrar Usuario',  icon:'ti-user', class: '' },
    { path: 'cadastrar-processos', title: 'Criar Processos',  icon:'ti-ruler-pencil', class: '' },
    { path: 'setor', title: 'Criar Setor',  icon:'ti-ruler-pencil', class: '' },
    
   
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
