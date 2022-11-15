import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../../users/User-Service";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {User} from "../../users/User";
import {PrenService} from "../Pren-Service";
import {Pren} from "../Pren";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {filter, interval, map} from "rxjs";
import {CarService} from "../../cars/Cars-Service";

@Component({
  selector: 'app-prens-c',
  templateUrl: './prens-c.component.html',
  styleUrls: ['./prens-c.component.css']
})
export class PrensCComponent implements OnInit {


  constructor(private prenService: PrenService, private router: Router, private userService: UserService, private carService: CarService) { }


  tabConfSpec !:tableConfig;

  loggedRole = sessionStorage.getItem('Role');

  user!: any;
  idU!: any;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "utente", label: "Utente"},
    {key: "auto", label: "Auto"},
    {key: "dataInizio", label: "Data inizio"},
    {key: "dataFine", label: "Data fine"},
    {key: "dataPren", label: "Data prenotazione"},
    {key: "isApprovata", label: "Approvata"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "auto", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "auto"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 5, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //permette di far apparire il tasto di approvazione solo all'admin
  getActions(): myActions[]{
    let myActionsTmp: myActions[];
    if(this.loggedRole=='ADMIN') {
      myActionsTmp =
        [
          {
            action: myActionEnum.APPROVA,
            showInRow: true
          },

          {
            action: myActionEnum.DELETE_ROW,

            showInRow: true
          }
        ];
    } else {
      myActionsTmp =
        [
          {
            action: myActionEnum.APPROVA,
            showInRow: false
          },

          {
            action: myActionEnum.DELETE_ROW,

            showInRow: true
          }
        ];
    }
    return myActionsTmp;
  }


  actionShower(tmpObj: any): any {   //recupera i dati passati dal child, sfruttando $event nel parent.html, che li intercetta (è così che funziona @Output)
    switch (tmpObj.action) {

      case "Approva":
        if (tmpObj.dataSpec.isApprovata == true){
          alert("La prenotazione è già stata approvata!");
        } else{
          if(!confirm("Vuoi davvero approvare la prenotazione?")){
            return false
          }else {
            let pren_tmp: Pren;
            this.prenService.getPren(tmpObj.dataSpec.idPren).subscribe((pren) => {
              pren_tmp = pren;
              this.prenService.approvaPren(pren_tmp);
              window.location.reload();
            });
          }
        }
        break;

      case "Elimina":
        let dataInizio = moment(tmpObj.dataSpec.dataInizio).date();    //.date() recupera solo il giorno dalla data
        //per prelevare la data odierna (necessarie per effettuare il check)
        let dataOggi_tmp = moment();
        let dataOggi = moment(dataOggi_tmp).date();
        let check = dataInizio-dataOggi;

        if (check>=2){
          if(!confirm("Vuoi davvero eliminare la prenotazione")){
            return false
          }else {
            this.prenService.deletePren(tmpObj.dataSpec.idPren);
            this.prenotazioni = this.prenotazioni.filter(item=>item.idPren !== tmpObj.dataSpec.idPren)
          }
        }
        else {
          alert("Eliminazione rifiutata")
        }
    }
  }


  prenotazioni!: Pren[];
  prenTmp: any[] = []


  async loadData(){
    let logUser = sessionStorage.getItem('User');
    let logRole = sessionStorage.getItem('Role');
    if (logRole != "ADMIN") {
      //recupero la lista delle prenotazioni
      let prens: any = await this.prenService.getUserPrens(logUser).toPromise();
      for (let el of prens){
        //per ogni record della lista prens popola un nuovo record con i valori recuperati sia direttamente sia attraverso altre due funzioni che mi recuperano i dati specifici di utente e auto attraverso le id quando tutta la lista è stata caricata (await)
        let record: any = {idPren: el.idPren, auto: this.getAuto(el.auto).then(data=>record.auto = data), utente: this.getUtente(el.utente).then(data=>record.utente=data), dataInizio: el.dataInizio, dataFine: el.dataFine, dataPren: el.dataPren, isApprovata: el.isApprovata}
        //man mano, con tali record popolo un nuovo array, che infine verrà assegnato a this.prenotazioni
        this.prenTmp.push(record)
      }
      this.prenotazioni = this.prenTmp
    } else {
      let prens: any = await this.prenService.getAllPrens().toPromise();
      for (let el of prens){
        let record: any = {idPren: el.idPren, auto: this.getAuto(el.auto).then(data=>record.auto = data), utente: this.getUtente(el.utente).then(data=>record.utente=data), dataInizio: el.dataInizio, dataFine: el.dataFine, dataPren: el.dataPren, isApprovata: el.isApprovata}
        this.prenTmp.push(record)
      }
      this.prenotazioni = this.prenTmp
    }
  }


  //le due funzioni che recuperano i dati specifidi di utente e auto
  async getAuto(idA: any){
    let car: any = await this.carService.getCar(idA).toPromise();
    return car.marca + " " + car.modello;
  }


  async getUtente(idU: any){
    let user: any = await this.userService.getUser(idU).toPromise();
    return user.nome + " " + user.cognome;
  }



  /*loadData(){
    let logUser = sessionStorage.getItem('User');
    let logRole = sessionStorage.getItem('Role');
    if (logRole != "ADMIN") {
      this.prenService.getUserPrens(logUser).subscribe((prens) => {
        this.prenotazioni = prens;
      })
    } else {
      this.prenService.getAllPrens().subscribe((prens) => {
        this.prenotazioni = prens;
      });
    }
  }*/



  ngOnInit(): void {
    this.loadData();
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.getActions()}
  }


}
