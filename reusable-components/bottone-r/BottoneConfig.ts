//classe in cui vengono specificate le proprità del bottone
export class BottoneConfig {
  //text : string = "";  //entrambe le scritture evitano problemi di assegnazione nel caso di assenza di valore. Questo perche text: string; non accetterebbe null o undefined dando problemi in fase di compilazione
  textP ?: string;  //questo è il placeholder per il text che verrà creato come value del bottone
  cssClass ?: string;   //questo è il placeholder per il selettore della classe css del bottone
  typeP ?: string;

}
