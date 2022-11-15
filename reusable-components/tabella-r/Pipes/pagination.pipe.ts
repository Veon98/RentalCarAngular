import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], pageP: number, itemPerPage: number): any {   //value è l'array di valori completo, che deve essere suddiviso in tot pagine ed ogni pagina deve avere tot elementi per pagina

    let page = pageP-1;  //per evitare che si parta da 0

    //suddivisione dei vari elementi per ogni pagina
    return [ ...value.slice( itemPerPage*(page) , itemPerPage*(page+1)  )]   //i valori in ingresso vanno in una page finchè essa non si satura (a seconda dal suo itemPerPage). Appena ciò avviene si passa a page+1 e così via

  }

}
