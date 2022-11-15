import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TokenJwt} from "./TokenJwt";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";


//salva in sessione l'utente loggato, il suo ruolo e il suo token
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) {}

  //metodo che effettua concretamente il controllo delle credenziali e attraverso map le assegna ai rispettivi sessionStorage
    loginService(username: string, password: string){
      return this.http.post<TokenJwt>(
        `${environment.authServerUri}`, {username, password}
      ).pipe(
        map(
          data => {
            sessionStorage.setItem("User", username);
            sessionStorage.setItem("TokenJwt", "Bearer " + data.token);
            //recupero il ruolo
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(data.token);
            sessionStorage.setItem("Role", decodedToken.role);
          }
        )
      )
    }


  //funzione di servizio per recuperare il token quando lo si necessita
  getTokenJwt = () : string => {
    let AuthHeader: string = "";
    var AuthToken = sessionStorage.getItem("TokenJwt");

    if(AuthToken != null) {
      AuthHeader = AuthToken;
    }
    return AuthHeader;
  }


  //funzione di servizio per recuperare il ruolo quando lo si necessita
  getRole = () : string => {
    let AuthRole: string = "";
    var AuthRole_tmp = sessionStorage.getItem("Role");

    if(AuthRole_tmp != null) {
      AuthRole = AuthRole_tmp;
    }
    return AuthRole;
  }



  loggedUser = () : string | null => (sessionStorage.getItem("User")) ? sessionStorage.getItem("User") : "";



  isLogged = () : boolean => !!(sessionStorage.getItem("User"));


}
