
import { PrestamosPage } from "./PrestamosPage";

export const PRESTAMOS_DATA_LIST : PrestamosPage = {
    content : [
    //Préstamo número 1
    {
        id: 1, 
        game: { 
            id: 1, 
            title:'Juego 1',
             age: 6, 
             category: { 
                id: 1, 
                name: 'Categoría 1' 
            }, 
            author: { 
                id: 1, 
                name: 'Autor 1', 
                nationality: 'Nacionalidad 1' 
            } 
        }, 
        client: {id: 1, name:'Client 1'}, 
        dayIn: new Date('12/06/2022'), 
        dayOut: new Date('09/06/2022')
    },
     //Préstamo numero 2
     {
        id: 2, 
        game: { 
            id: 1, 
            title:'Juego 2',
             age: 6, 
             category: { 
                id: 2, 
                name: 'Categoría 2' 
            }, 
            author: { 
                id: 1, 
                name: 'Autor 2', 
                nationality: 'Nacionalidad 2' 
            } 
        }, 
        client: {id: 1, name:'Client 2'}, 
        dayIn: new Date('10/05/2022'), 
        dayOut: new Date('12/05/2022')
    },

     //Préstamo numero 3
     {
        id: 3, 
        game: { 
            id: 1, 
            title:'Juego 3',
             age: 6, 
             category: { 
                id: 3, 
                name: 'Categoría 2' 
            }, 
            author: { 
                id: 3, 
                name: 'Autor 3', 
                nationality: 'Nacionalidad 1' 
            } 
        }, 
        client: {id: 1, name:'Client 3'}, 
        dayIn: new Date('10/01/2022'), 
        dayOut: new Date('12/01/2022')
    },
    ],

    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 3
}
    
   
   

