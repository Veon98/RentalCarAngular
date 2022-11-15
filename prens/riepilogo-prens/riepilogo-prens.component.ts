import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {Pren} from "../Pren";
import {Router} from "@angular/router";
import {DateService} from "../Date-Service";
import {UserService} from "../../users/User-Service";
import {NewPren} from "../NewPren";
import {Car} from "../../cars/Car";
import {User} from "../../users/User";
import {CarService} from "../../cars/Cars-Service";
import {PrenService} from "../Pren-Service";
import {async, asyncScheduler, map, Observable} from "rxjs";

@Component({
  selector: 'app-riepilogo-prens',
  templateUrl: './riepilogo-prens.component.html',
  styleUrls: ['./riepilogo-prens.component.css']
})
export class RiepilogoPrensComponent implements OnInit {

  id_a!: any;
  dataI_tmp!: any;
  dataF_tmp!: any;
  //dataP: any = new Date().toJSON().slice(0, 10);
  dataOggi_tmp: any = moment();
  dataP: any = moment(this.dataOggi_tmp).toJSON().slice(0, 10);
  utenteLog!: User;
  marca!: any
  modello!: any

  savePrenBtn = {textP:'Prenota', cssClass:'btn btn-primary btn-lg'}
  errorBtn = {textP:'Torna alla home', cssClass:'btn btn-primary btn-lg'}

  constructor(private router: Router, private dataService: DateService, private prenService: PrenService, private userService: UserService, private carService: CarService) {}


  addPren(){
    let dataOggi_tmp = moment();
    let dataPren = moment(dataOggi_tmp).format("YYYY-MM-DD").toString();
    let appr: boolean = false;

    //recupero l'id dell'utente loggato per inserirla nell'oggetto prenotazione che invierò al back-end
    this.userService.getUserByCodFis().subscribe(user => {
      this.utenteLog = user;
      let idULog = this.utenteLog.idUtente;
      let newPren = new NewPren(this.id_a, idULog, this.dataI_tmp.toString(), this.dataF_tmp.toString(), dataPren, appr);
      this.prenService.effettuaPren(newPren);
    });
    alert("Prenotazione effettuata con successo!")
    this.router.navigate(['/profilo']);
  }

  returnHome(){
    this.router.navigate(['/home']);
  }


  async loadSpecData(){
    //recupero i dati dell'auto così da poterli visualizzare a schermo al posto dell'id
    this.id_a = sessionStorage.getItem('id_a');
    let idA = parseInt(this.id_a);
    let car: any = await this.carService.getCar(idA).toPromise();
    this.marca = car.marca
    this.modello = car.modello
  }


  ngOnInit(): void {
    this.id_a = sessionStorage.getItem('id_a');
    this.dataI_tmp = sessionStorage.getItem('dataI');
    this.dataF_tmp = sessionStorage.getItem('dataF');

    this.loadSpecData()
}

}
