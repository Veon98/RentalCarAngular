import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './generic-components/home/home.component';
import { ProfileCComponent } from './generic-components/profile/profile-c/profile-c.component';
import { HeaderCComponent } from './generic-components/header-c/header-c.component';
import { ErrorPageComponent } from './generic-components/error-page/error-page.component';
import { UsersCComponent } from './users/users-c/users-c.component';
import {RouterOutlet} from "@angular/router";
import { FooterCComponent } from './generic-components/footer-c/footer-c.component';
import { AppRoutingModule } from './app-routing.module';
import {TabellaRComponent} from "./reusable-components/tabella-r/tabella-r.component";
import {BottoneComponent} from "./reusable-components/bottone-r/bottone.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortingPipe} from "./reusable-components/tabella-r/Pipes/sorting.pipe";
import {FilterPipe} from "./reusable-components/tabella-r/Pipes/filter.pipe";
import {PaginationPipe} from "./reusable-components/tabella-r/Pipes/pagination.pipe";
import { CarsCComponent } from './cars/cars-c/cars-c.component';
import { PrensCComponent } from './prens/prens-c/prens-c.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CarFormComponent } from './cars/car-form/car-form.component';
import { PrenFormComponent } from './prens/pren-form/pren-form.component';
import { LoginComponent } from './generic-components/login/login.component';
import { CarsDispComponent } from './cars/cars-disp/cars-disp.component';
import { RiepilogoPrensComponent } from './prens/riepilogo-prens/riepilogo-prens.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./security/AuthInterceptor-Service";


@NgModule({
  //componenti e pipes
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileCComponent,
    HeaderCComponent,
    ErrorPageComponent,
    UsersCComponent,
    FooterCComponent,
    TabellaRComponent,
    BottoneComponent,
    SortingPipe,
    FilterPipe,
    PaginationPipe,
    CarsCComponent,
    PrensCComponent,
    UserFormComponent,
    CarFormComponent,
    PrenFormComponent,
    LoginComponent,
    CarsDispComponent,
    RiepilogoPrensComponent,
  ],
  //moduli
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //interceptors
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
