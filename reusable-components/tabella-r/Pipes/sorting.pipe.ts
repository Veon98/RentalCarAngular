import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortingPipe'
})
export class SortingPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {  //value rappresenta i dati da ordinare
    const sortCol = args[0];   //salvo nella prima posizione dell'array il valore della colonna da ordinare
    const sortOrder = args[1];  //salvo nella seconda posizione dell'array il tipo di ordine
    let orderInverter = 1;  //esso servirà per invertire l'ordinamento

    if (sortOrder === 'desc') {
      orderInverter = -1;   //basta moltiplicarlo per il valore di ritorno per cambiare il verso dell'ordinamento
    }

    //algoritmo di ordinamento
    value.sort((a: any, b: any) => {   //si fa sort su value
        if (a[sortCol] < b[sortCol]) {  //confronto tra gli elementi delle righe  (a di sortCol e b di sortCol) -> per questo è stato utilizzato un array per salvare tali valori
          return -1 * orderInverter;  //sort restituisce -1 se a<b e viene invertito nel caso di ordine desc
        } else if (a[sortCol] > b[sortCol]) {
          return 1 * orderInverter;   //sort restituisce 1 se a>b e viene invertito nel caso di ordine asc
        } else {
          return 0;
        }
      }
    );

    return value;  //si restiruisce value ordinato
  }

}
