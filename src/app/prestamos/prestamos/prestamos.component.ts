import { Component, OnInit } from '@angular/core';
import { Prestamos } from '../model/Prestamos';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamosService } from '../prestamos.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';
import { PrestamosEditComponent } from '../prestamos-edit/prestamos-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Prestamos>();
  displayedColumns: string[] = ['id', 'title', 'name', 'dayIn', 'dayOut','action'];

  prestamos: Prestamos[];

  
  filterGame: string = null;
  filterClient: string = null;
  filterDate: Date = null;

  constructor(
    private prestamosService: PrestamosService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.loadPage();    
  }

   /*
    Función loadPage():
      Creamos el Pageable que nos dirá que página queremos buscar, el tamaño de 
      elementos por página y la propiedad por la que quremos ordenar.

      En este caso, ordenaremos las páginas por el id del préstamo en oden ascendente
      y em cada página tendremos un total de 5 elementos (pageSize = 5)

    */
  loadPage(event?: PageEvent){
    let pageable : Pageable =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
          property: 'id',
          direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    let gameTitle = this.filterGame != null ? this.filterGame : null;
    let clientName = this.filterClient != null ? this.filterClient : null;
    let prestamoDate = this.filterDate != null ? this.filterDate : null

    this.prestamosService.getPrestamos(pageable,gameTitle,prestamoDate,clientName).subscribe(
      dataPage => {
        this.dataSource.data = dataPage.content;
        this.pageNumber = dataPage.pageable.pageNumber;
        this.pageSize = dataPage.pageable.pageSize;
        this.totalElements = dataPage.totalElements;
      }
    )
    
    console.log("LoadPage: gameTitle, ",gameTitle, " clientName, ",clientName, "prestamoDate, ",prestamoDate)
  }
 
  
  /*
    Función para limpiar los filtros
  */
  onCleanFilter(){

    this.filterDate = null;
    this.filterGame = null;
    this.filterClient = null;

    this.onSearch();

  }

  /*
    Función para buscar con cualquiera de los filtros
  */
  onSearch(){
  
      let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
      }

      let gameTitle = this.filterGame != null ? this.filterGame : null;
      let clientName = this.filterClient != null ? this.filterClient: null;
      let prestamoDate = this.filterDate != null ? this.filterDate : null ;

    

      this.prestamosService.getPrestamos(pageable,gameTitle,prestamoDate,clientName).subscribe(
        dataPage => {
          this.dataSource.data = dataPage.content;
          this.pageNumber = dataPage.pageable.pageNumber;
          this.pageSize = dataPage.pageable.pageSize;
          this.totalElements = dataPage.totalElements;
        }
      )
      
   
  }
 

  editPrestamo(prestamo: Prestamos){
      const dialogRef = this.dialog.open(PrestamosEditComponent, {
        data : {prestamo: prestamo}
      });

      dialogRef.afterClosed().subscribe(result =>{
        this.onSearch();
      })
  }

  createPrestamo(){
    const dialogRef = this.dialog.open(PrestamosEditComponent, {
      data : {}
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.onSearch();
    })
  }

  deletePrestamo(prestamo: Prestamos){
    const dialogRef = this.dialog.open(DialogConfirmationComponent,{
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.prestamosService.deletePrestamo(prestamo).subscribe(result =>{
          this.ngOnInit();
        }
        );
      }
    });
  }


}
