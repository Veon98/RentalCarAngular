import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../users/User-Service";
import {User} from "../../../users/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-c',
  templateUrl: './profile-c.component.html',
  styleUrls: ['./profile-c.component.css']
})
export class ProfileCComponent implements OnInit {

  utente!: User;
  loggedUser!: any;
  loggedRole!: any;

  updDatiUserBtn = {textP:'Modifica i tuoi dati', cssClass:'btn btn-outline-primary mt-4 ms-3'};
  showPrensBtn = {textP:'Guarda le prenotazioni', cssClass:'btn btn-outline-primary mt-4 ms-3'};
  showUsersBtn = {textP:'Guarda gli utenti', cssClass:'btn btn-outline-primary mt-4 ms-3'};
  showCarsBtn = {textP:'Guarda le auto', cssClass:'btn btn-outline-primary mt-4 ms-3'};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('User');
    this.loggedRole = sessionStorage.getItem('Role');
  }


  updDatiUser(){
    //recupero l'utente attraverso l'username (conservata nel session.storage)
    this.userService.getUserByCodFis().subscribe((user) => {
      this.utente = user;
      let idLoggedU = this.utente.idUtente;
      this.router.navigate(['/userForm', idLoggedU]);
    });
  }


  showPrens(){
    this.router.navigate(['/prens']);
  }

  showUsers(){
    this.router.navigate(['/users']);
  }

  showCars(){
    this.router.navigate(['/cars']);
  }

}
