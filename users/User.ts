export class User {
  idUtente!: number;
  codFiscale!: string;
  nome!: string;
  cognome!: string;
  pwd!: string;
  admin!: boolean;


  constructor(idUtente: number, codFiscale: string, nome: string, cognome: string, pwd: string, admin: boolean) {
    this.idUtente = idUtente;
    this.codFiscale = codFiscale;
    this.nome = nome;
    this.cognome = cognome;
    this.pwd = pwd;
    this.admin = admin;
  }

}
