import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Car} from "./Car";
import {HttpClient} from "@angular/common/http";
import {NewCar} from "./NewCar";


//permette la dependency injection nei componenti che lo sfrutteranno. In questo caso sarà usabile in tutto il modulo root
@Injectable({
  providedIn: 'root'
})
export class CarService{


  constructor(private http: HttpClient) {}


  getAllCars(): Observable<Car[]>{
    return this.http.get<Car[]>('http://localhost:8080/api/auto/showCars');
  }


  getCar(id_a: number): Observable<Car>{
    return this.http.get<Car>('http://localhost:8080/api/auto/getCarById/' + id_a);
  }


  getCarsDisp(dataI: string, dataF: string): Observable<Car[]>{
    let date = dataI + "_" + dataF;
    return this.http.get<Car[]>('http://localhost:8080/api/auto/getCarsDisp/' + date);
  }


  addNewCar(newCar: NewCar){
    this.http.post('http://localhost:8080/api/auto/addORupdCar/', newCar).subscribe();
  }


  updCar(updCar: Car){
    this.http.put('http://localhost:8080/api/auto/addORupdCar/', updCar).subscribe();
  }


  deleteCar(delCarId: number){
    this.http.delete('http://localhost:8080/api/auto/deleteCar/' + delCarId).subscribe();
  }
}
