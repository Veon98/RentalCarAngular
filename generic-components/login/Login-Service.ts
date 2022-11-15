import {Observable} from "rxjs";
import {Car} from "../../cars/Car";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http: HttpClient) {
  }

  getCheck(username: any, pass: any): Observable<any>{
    return this.http.get<any>('http://localhost:8080/api/login/getCheck/' + username + "/" + pass);
  }
}
