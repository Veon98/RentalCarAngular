import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import {tableConfig} from "./Config/tableConfig";
import {myHeaders} from "./Config/myHeaders";
import {myOrder} from "./Config/myOrder";
import {myFilter} from "./Config/myFilter";
import {myPagination} from "./Config/myPagination";
import {myActionEnum} from "./Config/myActionEnum";
import {myActions} from "./Config/myActions";
import {Subscription} from "rxjs";
import {User} from "../../users/User";
import {Pren} from "../../prens/Pren";


@Component({
  selector: 'app-tabella-r',
  templateUrl: './tabella-r.component.html',
  styleUrls: ['./tabella-r.component.css']
})
export class TabellaRComponent implements OnInit {


  //BOTTONI
  sortBtn = {textP:'Ordina in senso inverso', cssClass:'btn btn-secondary btn-sm', type:'button'};
  firstPageBtn = {textP:'First', cssClass:'btn btn-outline-secondary btn-sm me-1 mt-2'};
  prevPageBtn = {textP:'<-', cssClass:'btn btn-outline-secondary btn-sm me-1 mt-2'};
  nextPageBtn = {textP:'->', cssClass:'btn btn-outline-secondary btn-sm me-1 mt-2'};
  lastPageBtn = {textP:'Last', cssClass:'btn btn-outline-secondary btn-sm mt-2'};



  //SORTING
  changeSortType() {
    if (this.tableConfig.order.orderType === 'desc') {
      this.tableConfig.order.orderType = 'asc';
      if (this.tableConfig.pagination.pageNum!=1) {
        this.tableConfig.pagination.pageNum = 1;  //da levare se non si vuole che si torni alla prima pagina
      } else {  //risolve un piccolo bug: quando si cambia la colonna di ordinamento stando nella prima pagina, essa si rioridna solo parzialmente se ci si ritrova nella prima pagina, ma torna corretta passando alla seconda e poi nuovamente alla prima. Pertando, sfruttando proprio questa dinamica risolutiva, quando ci si trova nella prima pagina, si porta la pagina temporaneamente a 0 e dopo 1ms la si riporta a 1, ottenendo la tabella aggiornata correttamente
        this.tableConfig.pagination.pageNum = 0;
        setTimeout(() => {this.tableConfig.pagination.pageNum=1}, 0.1);
      }
    } else {
      this.tableConfig.order.orderType = 'desc';
      if (this.tableConfig.pagination.pageNum!=1) {
        this.tableConfig.pagination.pageNum = 1;  //da levare se non si vuole che si torni alla prima pagina
      } else {
        this.tableConfig.pagination.pageNum = 0;
        setTimeout(() => {this.tableConfig.pagination.pageNum=1}, 0.1);
      }
    }
  }



  //PAGINATION
  resetPageNum(){
    if (this.tableConfig.pagination.pageNum!=1) {
      this.tableConfig.pagination.pageNum = 1;
    } else{  //risolve un piccolo bug: quando si cambia la colonna di ordinamento stando nella prima pagina, essa si rioridna solo parzialmente se ci si ritrova nella prima pagina, ma torna corretta passando alla seconda e poi nuovamente alla prima. Pertando, sfruttando proprio questa dinamica risolutiva, quando ci si trova nella prima pagina, si porta la pagina temporaneamente a 0 e dopo 1ms la si riporta a 1, ottenendo la tabella aggiornata correttamente
      this.tableConfig.pagination.pageNum = 0;
      setTimeout(() => {this.tableConfig.pagination.pageNum=1}, 0.1);
    }
  }

  previousPage(){
    if (this.tableConfig.pagination.pageNum==1) {
      this.tableConfig.pagination.pageNum = 1;
    } else {
      this.tableConfig.pagination.pageNum = this.tableConfig.pagination.pageNum - 1;

    }
  }

  nextPage(){
    //let lastPage = Math.floor(this.data.length/this.tableConfig.pagination.itemPerPage)+(this.data.length%this.tableConfig.pagination.itemPerPage);
    let lastPage = Math.ceil(Number(this.data.length/this.tableConfig.pagination.itemPerPage));
    if (this.tableConfig.pagination.pageNum == lastPage){
      this.tableConfig.pagination.pageNum = lastPage;
    }else {
      this.tableConfig.pagination.pageNum = this.tableConfig.pagination.pageNum + 1;
    }
  }

  getLastPage(){
    //this.tableConfig.pagination.pageNum = Math.floor(this.data.length/this.tableConfig.pagination.itemPerPage)+(this.data.length%this.tableConfig.pagination.itemPerPage);
    this.tableConfig.pagination.pageNum = Math.ceil(Number(this.data.length/this.tableConfig.pagination.itemPerPage));
  }



  //ACTIONS
  @Output() eventOut = new EventEmitter();  //permette di passare i dati prelevati dal child al parent

  actionSelector(data: any, act: string) {  //recupera i dati dal child.html per inviarli al parent
    this.eventOut.emit({  //intercettati di $event
      dataSpec: data,
      action: act
    });
  }

  //viene sfruttato per cambiare dinamicamente la configurazione del bottone a seconda dall'azione scelta
  getBtnConfig(action: myActionEnum) {  //action sarebbe myActionEnum.NEW_ROW/EDIT_ROE/DELETE_ROW
    let confValue:any;
    switch (action){
      case "Aggiungi":
        confValue = {textP: action, cssClass: 'btn btn-primary'};
        break;

      case "Modifica":
        confValue = {textP: action, cssClass: 'btn btn-primary btn-sm'};
        break;

      case "Noleggia":
        confValue = {textP: action, cssClass: 'btn btn-primary btn-sm'};
        break;

      case "Approva":
        confValue = {textP: action, cssClass: 'btn btn-primary btn-sm'};
        break;

      case "Elimina":
        confValue = {textP: action, cssClass: 'btn btn-danger btn-sm'};
  }

    return confValue;
  }




  //il decorator @input serve per trasmettere i dati dal parent al child (essi provengono dal parent: app-component.ts)
  @Input() tableConfig !: tableConfig;  //proprietà del componente (l'attributo sarà nel parent, in questo caso: tabConfSpec)
  @Input() data !: any[];


  constructor() {}

  ngOnInit(){
  }


}
