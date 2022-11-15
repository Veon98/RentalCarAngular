import {Component, Input, OnInit,Output, EventEmitter} from '@angular/core';
import {BottoneConfig} from "./BottoneConfig";


@Component({
  selector: 'app-bottone',
  templateUrl: './bottone.component.html',
  styleUrls: ['./bottone.component.css']
})
export class BottoneComponent implements OnInit {

  //proprietà componente dichiarate direttamente qui
  //@Input() text ?: string;   //in questo modo definisco le proprietà del bottone direttamente qui
  //@Output() OnClickTrigger = new EventEmitter<string>();  //crea un custom onclick



  //così invece uso le proprietà della classe wrapper BottoneConfig. In tale modo potrei creare altre classi (tipo Bottone2) e dichiarare un altro bottone, ma avrebbe poco senso nel bottone.component.html, a meno che non si vogliano definire contemporaneamente due bottoni con differenti proprietà-->
  @Input() reusableBtn !: BottoneConfig;  //!: evita il possibly undefined problem

  @Output() customOnClick = new EventEmitter();

  customClick() {
    this.customOnClick.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
