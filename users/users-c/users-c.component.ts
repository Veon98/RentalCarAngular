import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserService} from "../User-Service";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {Router, RouterModule} from "@angular/router"



@Component({
  selector: 'app-users-c',
  templateUrl: './users-c.component.html',
  styleUrls: ['./users-c.component.css']
})
export class UsersCComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "codFiscale", label: "Codice Fiscale"},
    {key: "nome", label: "Nome"},
    {key: "cognome", label: "Cognome"},
    {key: "admin", label: "Ruolo"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "codFiscale", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "nome"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 5, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //ACTION CONFIG
  actionsConf: myActions[] = [
    {
      action: myActionEnum.NEW_ROW,
      showInRow: false   //nella tabella non compare il tasto di inserimento
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
    switch (tmpObj.action) {   //tmpObj.action contiene i valori delle tre operazioni
      case "Aggiungi":
        this.router.navigate(['/userForm']);
        break;

      case "Modifica":
        this.router.navigate(['/userForm', tmpObj.dataSpec.idUtente]);
        break;

      case "Elimina":
        if(!confirm("Vuoi davvero eliminare l'utente")){
          return false
        }else {
          //vieta l'eliminazione degli account admin
          this.userService.getUser(tmpObj.dataSpec.idUtente).subscribe(user=>{
            if (user.admin == false){
              this.userService.deleteUser(tmpObj.dataSpec.idUtente);
              this.utenti = this.utenti.filter(item=>item.idUtente !== tmpObj.dataSpec.idUtente)
            } else {
              alert("Gli account amministratori non possono essere eliminati!")
            }
          })
        }
    }
  }


  utenti!: User[];

  loadData(){
    this.userService.getAllUsers().subscribe((users) => {
      this.utenti = users;
      //console.log(this.utenti)
    });
  }


  ngOnInit(): void {
    this.loadData();
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
