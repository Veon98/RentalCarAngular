import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./generic-components/home/home.component";
import {ProfileCComponent} from "./generic-components/profile/profile-c/profile-c.component";
import {ErrorPageComponent} from "./generic-components/error-page/error-page.component";
import {UsersCComponent} from "./users/users-c/users-c.component";
import {CarsCComponent} from "./cars/cars-c/cars-c.component";
import {PrensCComponent} from "./prens/prens-c/prens-c.component";
import {UserFormComponent} from "./users/user-form/user-form.component";
import {CarFormComponent} from "./cars/car-form/car-form.component";
import {PrenFormComponent} from "./prens/pren-form/pren-form.component";
import {LoginComponent} from "./generic-components/login/login.component";
import {CarsDispComponent} from "./cars/cars-disp/cars-disp.component";
import {RiepilogoPrensComponent} from "./prens/riepilogo-prens/riepilogo-prens.component";
import {RouteAuthService} from "./security/RouteAuth-Service";
import {Roles} from "./security/Roles";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',   //path (dato da me)
    component: HomeComponent  //selettore della classe componente
  },
  {
    path: 'profilo',
    component: ProfileCComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator, Roles.customer]}
  },
  {
    path: 'users',
    component: UsersCComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  {
    path: 'cars',
    component: CarsCComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  {
    path: 'prens',
    component: PrensCComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator, Roles.customer]}  //coi lambda posso filtrare solo quelle dell'utente loggato

  },
  {
    path: 'userForm',   //creazione utente
    component: UserFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  {
    path: 'userForm/:id_u',   //modifica utente (id_u va utilizzato per recuperare il dato passato come parametro)
    component: UserFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.customer]}
  },
  {
    path: 'carForm',   //creazione auto
    component: CarFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  {
    path: 'carForm/:id_a',   //modifica auto
    component: CarFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  /*{
    path: 'prenForm',   //la prenotazione si inserisce da "riepilogoPren"
    component: PrenFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.customer]}
  },*/
  {
    path: 'prenForm/:id_p',  //per l'approvazione
    component: PrenFormComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.administrator]}
  },
  {
    path: 'riepilogoPren',
    component: RiepilogoPrensComponent,
    canActivate:[RouteAuthService],
    data: {roles: [Roles.customer]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dispCars',   //per trovare le auto disponibili
    component: CarsDispComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',    //nel caso in cui l'url non fosse valido: va inserito per ultimo
    component: ErrorPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],   //gestisce l'url a livello di root. Nel caso di divisione in moduli, si farà forChild
  exports: [RouterModule]
})
export class AppRoutingModule { }
