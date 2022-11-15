import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {

  userLog!: any;
  userRole!: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.userLog = sessionStorage.getItem("User");
    this.userRole = sessionStorage.getItem("Role");
  }


  logout(){
    //ripulisce il sessionStorage, cancellando da esso le credenziali dell'utente loggato
    sessionStorage.clear();
    //permette di ricaricare l'header per switchare l'estetica del tasto login/logout
    this.router.navigate(['/login']).then(()=>{window.location.reload()})
  }


}
