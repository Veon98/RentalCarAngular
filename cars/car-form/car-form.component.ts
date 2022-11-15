import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../Car";
import {CarService} from "../Cars-Service";
import {NewCar} from "../NewCar";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  formCar!: FormGroup;
  ida_tmp!: any;
  auto!: Car;
  ruolo!: any;


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private carService: CarService, private router: Router) {}


  ngOnInit(): void {
    this.ruolo = sessionStorage.getItem("Role");

    //snapshot permette di recuperare quel valore in quel determinato istante, param invece restituisce un observable
    const routeParams = this.route.snapshot.paramMap;
    this.ida_tmp = routeParams.get('id_a');  //nel get va il nome dell'attributo coerente a quello del path nel routing

    //costruzione del form, cono senza pre-compilazione, a seconda che si tratti di un add o un upd
    if (this.ida_tmp){
      this.carService.getCar(this.ida_tmp).subscribe((car) => {
        this.auto = car;

        this.formCar = this.fb.group({  //creo il json
          'targa': [this.auto.targa, Validators.required],
          'marca': [this.auto.marca, Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
          'modello': [this.auto.modello, Validators.required],
          'isDisponibile': [this.auto.disponibile, Validators.required]
        });

      });
    }
    else if (!this.ida_tmp) {
      this.formCar = this.fb.group({  //creo il json
        'targa': ["", Validators.required],
        'marca': ["", Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
        'modello': ["", Validators.required],
        'isDisponibile': [true, Validators.required]
      });
    }
  }


  sendData(): void{
    if (!this.formCar.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    else{
      let targa = this.formCar.controls['targa'].value
      let marca = this.formCar.controls['marca'].value
      let modello = this.formCar.controls['modello'].value
      let isDisponibile = this.formCar.controls['isDisponibile'].value
      if (!this.ida_tmp){
        //add --> costruisco un nuovo oggetto con i dati recuperati dal form
        let newCar_tmp = new NewCar(targa, marca, modello, isDisponibile);
        this.carService.addNewCar(newCar_tmp);
        alert("Nuova auto aggiunta");
        this.router.navigate(['/cars']);
      }
      else {
        //update --> costruisco un nuovo oggetto con i dati recuperati dal form, ma aggiungendo anche l'id
        let updCar_tmp = new Car(this.ida_tmp, targa, marca, modello, isDisponibile);
        this.carService.updCar(updCar_tmp);
        alert("Auto modificata");
        this.router.navigate(['/cars']);
      }
    }
  }

  checkTarga(){
    let targa = this.formCar.controls['targa'].value
    if (targa.length!=7){
      this.formCar.controls['targa'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formCar.controls['targa'].setErrors(null)  //eventualmente passa il controllo
    }
  }

}
