import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User} from "./User";
import {HttpClient} from "@angular/common/http";
import {NewUser} from "./NewUser";


//permette la dependency injection nei componenti che lo sfrutteranno. In questo caso sarà usabile in tutto il modulo root
@Injectable({
  providedIn: 'root'   //modulo root e tutti i componenti ad esso appartenenti. E' possibile cosi scegliere i moduli in cui il servizio è iniettabile (nei componenti di tale modulo, all'interno del costruttore, viene fatta la dependency injection del service)
})
export class UserService{


  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/api/utente/showUsers');
  }


  getUser(id_u: number): Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/utente/getUserById/' + id_u);
  }


  getUserByCodFis(): Observable<User>{
    let codFis = sessionStorage.getItem("User");
    return this.http.get<User>('http://localhost:8080/api/utente/getUserByCodFis/' + codFis)
  }


  addNewUser(newUser: NewUser){
    this.http.post('http://localhost:8080/api/utente/addORupdUser/', newUser).subscribe();
  }


  updUser(updUser: User){
    this.http.put('http://localhost:8080/api/utente/addORupdUser/', updUser).subscribe();
  }

  deleteUser(delUserId: number){
    this.http.delete('http://localhost:8080/api/utente/deleteUser/' + delUserId).subscribe();
  }

}
