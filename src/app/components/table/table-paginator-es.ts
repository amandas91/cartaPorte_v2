import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

// export class SpanishPaginator extends MatPaginatorIntl {
//   constructor() {
//     super();
//     this.itemsPerPageLabel = 'Registros por Página:';
//     this.nextPageLabel = 'Página Siguiente';
//     this.previousPageLabel = 'Página Anterior';
//     this.firstPageLabel = 'Primera Página';
//     this.lastPageLabel = 'Última Página';
//   }
// }

const getRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
  Math.min(startIndex + pageSize, length) :
  startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getSpanishPaginator() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Registros por Página:';
  paginatorIntl.nextPageLabel = 'Página Siguiente';
  paginatorIntl.previousPageLabel = 'Página Anterior';
  paginatorIntl.firstPageLabel = 'Primera Página';
  paginatorIntl.lastPageLabel = 'Última Página';
  paginatorIntl.getRangeLabel = getRangeLabel;
  
  return paginatorIntl;
}