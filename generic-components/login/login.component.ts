import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtService} from "../../security/Jwt-Service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserService} from "../../users/User-Service";
import {LoginService} from "./Login-Service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  loggato: boolean = false;
  private bcrypt: any;


  constructor(private loginService: LoginService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router, private jwtService: JwtService, private userService: UserService) { //istanzia il servizio formbuilder
  }


  ngOnInit(): void {
    this.formLogin = this.fb.group({  //creo il json
      'username': ["", Validators.required],
      'password': ["", Validators.required]   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
    });
  }


  sendData(): void{
    if (!this.formLogin.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    else{
      let username = this.formLogin.controls['username'].value
      let password = this.formLogin.controls['password'].value

      this.jwtService.loginService(username, password).subscribe({
        next: (response) => {
          this.loggato = true;
          //invio le credenziali attraverso un'api con la quale effettuerò un'ulteriore controllo sulle credenziali. L'api restituisce un booleano (res)
          this.userService.getUserByCodFis().subscribe(user=> {
           this.loginService.getCheck(username, password).subscribe(res=>{
             if (res == true){
               alert("Benvenuto su RentalCar!")
               this.router.navigate(['/home']).then(()=>{window.location.reload()})
             }else{
               alert("Credenziali errate!")
             }
           })
          })
        },
        error: (error) => {
          this.loggato = false;
          alert("Credenziali errate");
        }
      })
    }
  }


  /*checkCodFis(){
    let codF = this.formLogin.controls['username'].value
    if (codF.length!=10){
      this.formLogin.controls['username'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formLogin.controls['username'].setErrors(null)  //eventualmente passa il controllo
    }
  }*/




}
