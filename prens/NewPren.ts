//per la creazione del nuovo auto, che non necessita l'id. In Ts non si può creare più di un costruttore

export class NewPren{
  auto!: any;
  utente!: any;
  dataInizio!: any;
  dataFine!: any;
  dataPren!: any;
  isApprovata!: boolean;


  constructor(auto: any, utente: any, dataInizio: any, dataFine: any, dataPren: any, isApprovata: boolean) {
    this.auto = auto;
    this.utente = utente;
    this.dataInizio = dataInizio;
    this.dataFine = dataFine;
    this.dataPren = dataPren;
    this.isApprovata = isApprovata;
  }
}
