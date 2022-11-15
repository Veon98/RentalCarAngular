import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Pren} from "./Pren";
import {HttpClient} from "@angular/common/http";
import {NewPren} from "./NewPren";
import {Car} from "../cars/Car";


//permette la dependency injection nei componenti che lo sfrutteranno. In questo caso sarà usabile in tutto il modulo root
@Injectable({
  providedIn: 'root'
})
export class PrenService{

  constructor(private http: HttpClient) {}


  getAllPrens(): Observable<Pren[]>{
    return this.http.get<Pren[]>('http://localhost:8080/api/pren/showPrens');
  }


  getPren(id_p: number): Observable<Pren>{
    return this.http.get<Pren>('http://localhost:8080/api/pren/getPrenById/' + id_p);
  }


  getUserPrens(username: string | null): Observable<Pren[]>{
    return this.http.get<Pren[]>('http://localhost:8080/api/pren/getUserPrens/' + username);
  }


  effettuaPren(newPren: NewPren){
    this.http.post('http://localhost:8080/api/pren/effettuaPren/', newPren).subscribe();
  }


  approvaPren(apprPren: Pren){
    this.http.put('http://localhost:8080/api/pren/approvaPren/', apprPren).subscribe();
  }


  deletePren(delPrenId: number){
    this.http.delete('http://localhost:8080/api/pren/deletePren/' + delPrenId).subscribe();
  }
}
