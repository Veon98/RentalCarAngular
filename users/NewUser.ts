//per la creazione del nuovo utente, che non necessita l'id. In Ts non si può creare più di un costruttore

export class NewUser{
  codFiscale!: string;
  nome!: string;
  cognome!: string;
  pwd!: string;
  admin!: boolean;


  constructor(codFiscale: string, nome: string, cognome: string, pwd: string, admin: boolean) {
    this.codFiscale = codFiscale;
    this.nome = nome;
    this.cognome = cognome;
    this.pwd = pwd;
    this.admin = admin;
  }

}
