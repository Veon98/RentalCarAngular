import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../User";
import {NewUser} from "../NewUser";
import {UserService} from "../User-Service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser!: FormGroup;
  idu_tmp!: any;
  utente!: User;
  ruolo!: any;


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.ruolo = sessionStorage.getItem("Role");

    const routeParams = this.route.snapshot.paramMap;
    this.idu_tmp = routeParams.get('id_u');  //nel get va il nome dell'attributo coerente a quello del path nel routing

    //recupero i dati dell'utente per vedere se esiste ed eventualmente pre-compilare il form, altrimenti mi ritrovo in modalità di aggiunta
    if (this.idu_tmp){
      this.userService.getUser(this.idu_tmp).subscribe((user) => {
        this.utente = user;

        this.formUser = this.fb.group({  //creo il json
          'codFiscale': [this.utente.codFiscale, Validators.required],
          'nome': [this.utente.nome, Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
          'cognome': [this.utente.cognome, Validators.required],
          'pwd': [this.utente.pwd, Validators.required],
          'isAdmin': [false, Validators.required]
        });
      });
    }
    else if (!this.idu_tmp) {
      this.formUser = this.fb.group({  //creo il json
        'codFiscale': ["", Validators.required],
        'nome': ["", Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
        'cognome': ["", Validators.required],
        'pwd': ["", Validators.required],
        'isAdmin': [false, Validators.required]
      });
    }
  }


  sendData(): void{
    if (!this.formUser.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    else{
      let codFiscale = this.formUser.controls['codFiscale'].value
      let nome = this.formUser.controls['nome'].value
      let cognome = this.formUser.controls['cognome'].value
      let pwd = this.formUser.controls['pwd'].value
      let isAdmin = this.formUser.controls['isAdmin'].value
      if (!this.idu_tmp){
        //add --> costruisco un nuovo oggetto con i dati recuperati dal form
        let newUser_tmp = new NewUser(codFiscale, nome, cognome, pwd, isAdmin);
        this.userService.addNewUser(newUser_tmp);
        alert("Nuovo utente aggiunto");
        this.router.navigate(['/users']);
      }
      else {
        //update --> costruisco un nuovo oggetto con i dati recuperati dal form aggiungendo anche l'id
        let updUser_tmp = new User(this.idu_tmp, codFiscale, nome, cognome, pwd, isAdmin);
        this.userService.updUser(updUser_tmp);
        //altrimenti si hanno problemi con le api che sfruttano l'username
        sessionStorage.setItem('User', codFiscale);
        if (sessionStorage.getItem('Role') == "ADMIN") {
          alert("Utente modificato");
          this.router.navigate(['/users']);
        } else {
          //per evitare problemi con la ricerca di auto disponibili
          alert("Utente modificato, effettua nuovamente il login");
          this.router.navigate(['/login']).then(()=>{sessionStorage.clear()});
        }
      }
    }
  }


  //i codici fiscali devono avere 10 caratteri
  checkCodFis(){
    /*let codF = this.formUser.controls['codFiscale'].value
    if (codF.length!=10){
      this.formUser.controls['codFiscale'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formUser.controls['codFiscale'].setErrors(null)  //eventualmente passa il controllo
    }*/
  }

}
