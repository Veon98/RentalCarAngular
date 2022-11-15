import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtService} from "./Jwt-Service";
import {JwtHelperService} from "@auth0/angular-jwt";


//indica quali pagine sono accessibili a seconda dal ruolo
@Injectable({
  providedIn: 'root'
})
export class RouteAuthService implements CanActivate{

  ruolo: string[] = [];
  token: string = '';
  items: any;


  constructor(private jwtService: JwtService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //recupero il ruolo dal jwtService
    this.items = this.jwtService.getRole();

    //in un caso generale si potrebbero avere più ruoli per ogni utente piuttosto che uno, di conseguenza è bene operare considerando entrambe le ipotesi
    if(!Array.isArray(this.items)) {
      this.ruolo.push(this.items);
    } else {
      this.ruolo = this.items;  //avendo un solo ruolo per ogni utente, si attiverà sempre l'else
    }

    if(!this.jwtService.isLogged()){   //cosa succede quando facciamo logout
      this.router.navigate(['/login']);
      return false;
    } else {
      let roles: string[] = new Array();
      roles = route.data['roles'];  //specificati nell'app-routing

      if(roles === null || roles.length === 0) {
        return true;   //per le pagine con libero accesso
      } else if (this.ruolo.some(ruoloLogged => roles.includes(ruoloLogged))) {
        return true;   //quando l'utente possiede il ruolo che gli permetta di accedere a quella determinata pagina
      } else {
        alert("Problema di accesso, reindirizzamento alla pagina di Login")
        this.router.navigate(['/login']);
        return false;   //caso di errore
      }

    }

  }
}
