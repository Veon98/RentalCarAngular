export class Pren {
  idPren!: number;
  utente!: any;
  auto!: any;
  dataInizio!: any;
  dataFine!: any;
  dataPren!: any;
  isApprovata!: boolean;


  constructor(idPren: number, utente: any, auto: any, dataInizio: any, dataFine: any, dataPren: any, isApprovata: boolean) {
    this.idPren = idPren;
    this.utente = utente;
    this.auto = auto;
    this.dataInizio = dataInizio;
    this.dataFine = dataFine;
    this.dataPren = dataPren;
    this.isApprovata = isApprovata;
  }
}
