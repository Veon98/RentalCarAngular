//per la creazione del nuovo auto, che non necessita l'id. In Ts non si può creare più di un costruttore

export class NewCar{
  targa!: string;
  marca!: string;
  modello!: string;
  disponibile!: boolean;


  constructor(targa: string, marca: string, modello: string, disponibile: boolean) {
    this.targa = targa;
    this.marca = marca;
    this.modello = modello;
    this.disponibile = disponibile;
  }

}
