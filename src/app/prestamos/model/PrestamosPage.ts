
/*  

{
    "content": [ ... <listado con los resultados paginados> ... ], //Aquí se mostrarán todos los elementos con las condiciones establecidas abajo
    "pageable": {
        "pageNumber": <número de página empezando por 0>, //Número de página que queremos
        "pageSize": <tamaño de página>, //Elementos que mostraremos por página
        "sort": [
            { 
                "property": <nombre de la propiedad a ordenar>, //Un campo de la tabla que estamos llamando
                "direction": <dirección de la ordenación ASC / DESC> //Orden Ascendente o Descedente
            }
        ]
    },
    "totalElements": <numero total de elementos en la tabla>
}

export class AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}


*/

import { Pageable } from "src/app/core/model/page/Pageable";
import { Prestamos } from "./Prestamos";

export class PrestamosPage {
    content: Prestamos[];
    pageable: Pageable;
    totalElements: number;
}

