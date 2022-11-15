import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {DateService} from "../Date-Service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-pren-form',
  templateUrl: './pren-form.component.html',
  styleUrls: ['./pren-form.component.css']
})

//QUESTO COMPONENTE NON VIENE UTILIZZATO PERCHE' APPROVAZIONE ED ELIMINAZIONE AVVENGONO DIRETTAMENTE DALLA TABELLA
export class PrenFormComponent implements OnInit {

  formPren!: FormGroup;
  dataI_tmp!: any;
  dataF_tmp!: any;
  dataP_tmp!:any;
  id_p!: any;
  id_a!: any;
  id_u!: any;
  isApprovata!: boolean;


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private router: Router, private dateService: DateService) {}


  sendData(): void{
    if (!this.formPren.valid){
      alert("Errore nella compilazione del form")
      return;
    }

    else{
      alert("Modifica effettuata")
      this.router.navigate(['/prens']);
    }
  }



  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id_p = routeParams.get('id_p');

    this.formPren = this.fb.group({  //creo il json
      'dataI': [this.dataI_tmp, Validators.required],
      'dataF': [this.dataF_tmp, Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
      'dataP': [this.dataP_tmp, Validators.required],
      'id_user': [this.id_u, Validators.required],
      'id_car': [this.id_a, Validators.required],
      'isApprovata': [this.isApprovata, Validators.required]
    });
  }

}
