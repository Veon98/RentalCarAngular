import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {JwtService} from "./Jwt-Service";
import {Observable} from "rxjs";


//intercetta il token quando ci sono richieste http (che siano get, post... per qualsiasi service(users, cars...)), così da poter far capire al back-end di possedere il token
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let AuthToken = this.jwtService.getTokenJwt();

    if(this.jwtService.loggedUser()) {
      req = req.clone({
        setHeaders : {Authorization : AuthToken}
      })
    }

    return next.handle(req);

  }
}
