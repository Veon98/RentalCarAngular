import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CarService} from "../Cars-Service";
import {ActivatedRoute, Router} from "@angular/router";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {Car} from "../Car";
import {DateService} from "../../prens/Date-Service";
import {UserService} from "../../users/User-Service";
import {User} from "../../users/User";


@Component({
  selector: 'app-cars-disp',
  templateUrl: './cars-disp.component.html',
  styleUrls: ['./cars-disp.component.css']
})
export class CarsDispComponent implements OnInit, OnChanges {

  constructor(private utenteService: UserService, private carService: CarService, private router: Router, private route: ActivatedRoute, private dateService: DateService) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "targa", label: "Targa"},
    {key: "marca", label: "Marca"},
    {key: "modello", label: "Modello"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "marca", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "marca"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 5, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //ACTION CONFIG
  actionsConf: myActions[] = [    //l'oggetto myActions[] racchiude l'enum myActionEnum e il boolean che

    {
      action: myActionEnum.NOLEGGIA,
      showInRow: true
    }
  ];


  actionShower(tmpObj: any) {   //recupera i dati passati dal child, sfruttando $event nel parent.html, che li intercetta (è così che funziona @Output)
    switch (tmpObj.action) {

      case "Noleggia":
        //per non perdere i dati dopo che la pagina viene ricaricata
        sessionStorage.setItem('id_a', tmpObj.dataSpec.idAuto)
        sessionStorage.setItem('dataI', this.dataI)
        sessionStorage.setItem('dataF', this.dataF)
        //se la pagina viene ricaricata i dati vengono persi
        /*this.dateService.id_auto = tmpObj.dataSpec.id_a;
        this.dateService.dataInizio = this.dataI;
        this.dateService.dataFine = this.dataF;*/
        if (!sessionStorage.getItem("User")){
          alert("Devi essere loggato per prenotare!")
        }else {
          this.router.navigate(['/riepilogoPren']);
        }
        break;
    }
  }


  autoDisp!: Car[];
  dataI!: any;
  dataF!: any;

  @Input() arrDateIn!: any[];  //in arrivo dal form della home


  loadData(){
    this.carService.getCarsDisp(this.dataI, this.dataF).subscribe((cars) => {
      this.autoDisp = cars;
    });
  }


  //aggiorna la tabella se vengono inserite nuove date
  ngOnChanges(changes: SimpleChanges) {
    this.arrDateIn = changes['arrDateIn'].currentValue
    this.ngOnInit()
  }


  ngOnInit(): void {
    this.dataI=this.arrDateIn[0];  //nel primo elemento dell'array è contenuta la data di inizio e nel secondo quella di fine
    this.dataF=this.arrDateIn[1];
    //console.log(this.arrDateIn)

    this.loadData();
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
