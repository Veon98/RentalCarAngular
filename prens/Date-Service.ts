import {Injectable} from "@angular/core";

//DEPRECATA
//per passare i valori delle date senza metterli nell'url (vengono perse nel momento del reload e dunque è stato preferito il sessionstorage)
@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _id_auto!: any;
  private _dataInizio!: any;
  private _dataFine!: any;


  get id_auto(): any {
    return this._id_auto;
  }

  set id_auto(value: any) {
    this._id_auto = value;
  }

  get dataInizio(): any {
    return this._dataInizio;
  }

  set dataInizio(value: any) {
    this._dataInizio = value;
  }

  get dataFine(): any {
    return this._dataFine;
  }

  set dataFine(value: any) {
    this._dataFine = value;
  }
}
