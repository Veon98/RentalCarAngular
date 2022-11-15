import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {   //value rappresenta i dati da ordinare

    const resultArray = [];  //array in cui vengono salvati i risultati del filtring

    if (value) {
      if (value.length === 0 || filterString === '' || propName === '') {  //se non vengono inseriti criteri di filtring
        return value;   //si restituisce value originario
      }

      for (const item of value) {
        if (item[propName].toLowerCase() === filterString.toLowerCase()) {   //si attiva la stringa di filtro sulla proprietà selezionata
          resultArray.push(item);   //si inseriscono gli item risultanti nell'array
        }
      }

    }
    return resultArray;
  }

}
