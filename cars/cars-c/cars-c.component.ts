import { Component, OnInit } from '@angular/core';
import {UserService} from "../../users/User-Service";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {CarService} from "../Cars-Service";
import {Car} from "../Car";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cars-c',
  templateUrl: './cars-c.component.html',
  styleUrls: ['./cars-c.component.css']
})
export class CarsCComponent implements OnInit {

  constructor(private carService: CarService, private router: Router) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "targa", label: "Targa"},
    {key: "marca", label: "Marca"},
    {key: "modello", label: "Modello"},
    {key: "disponibile", label: "Disponibilità meccanica"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "marca", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "marca"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 5, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //ACTION CONFIG
  actionsConf: myActions[] = [
    {
      action: myActionEnum.NEW_ROW,
      showInRow: false
    },

    {
      action: myActionEnum.EDIT_ROW,
      showInRow: true
    },

    {
      action: myActionEnum.DELETE_ROW,
      showInRow: true
    }];


  actionShower(tmpObj: any): any {   //recupera i dati passati dal child, sfruttando $event nel parent.html, che li intercetta (è così che funziona @Output)
    switch (tmpObj.action) {   //tmpObj.action contiene i valori del record legato al bottone cliccato
      case "Aggiungi":
        //alert("Aggiunta " + tmpObj.dataSpec);
        this.router.navigate(['/carForm']);
        break;

      case "Modifica":
        //alert("Modificata " + tmpObj.dataSpec.id_a);  //tmpObj.dataSpec contiene i dati dell'oggetto in quella specifica riga
        this.router.navigate(['/carForm', tmpObj.dataSpec.idAuto]);
        break;

      case "Elimina":
        if(!confirm("Vuoi davvero eliminare l'auto")){
          return false
        }else {
          this.carService.deleteCar(tmpObj.dataSpec.idAuto);
          //rimuove dalla lista di auto quella appena eliminata
          this.auto = this.auto.filter(item=>item.idAuto !== tmpObj.dataSpec.idAuto)
        }
    }
  }


  auto!: Car[];


  loadData(){
    this.carService.getAllCars().subscribe((cars) => {
      this.auto = cars;
      //console.log(this.auto)
    });
  }


  ngOnInit(): void {
    this.loadData();
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
