export class Car {
  idAuto!: number;
  targa!: string;
  marca!: string;
  modello!: string;
  disponibile!: boolean;


  constructor(idAuto: number, targa: string, marca: string, modello: string, disponibile: boolean) {
    this.idAuto = idAuto;
    this.targa = targa;
    this.marca = marca;
    this.modello = modello;
    this.disponibile = disponibile;
  }
}
