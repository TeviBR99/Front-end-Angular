import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { Prestamos } from '../model/Prestamos';
import { PrestamosService } from '../prestamos.service';

@Component({
  selector: 'app-prestamos-edit',
  templateUrl: './prestamos-edit.component.html',
  styleUrls: ['./prestamos-edit.component.scss']
})
export class PrestamosEditComponent implements OnInit {
  prestamo: Prestamos;
  resultsGame: boolean ;
  resultsClient: boolean;
  games: Game[];
  clients: Client[];
  //result: boolean



  constructor(
    public dialogRef: MatDialogRef<PrestamosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamosService: PrestamosService,
    public gamesService: GameService,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
    if(this.data.prestamo !=null )
      this.prestamo = Object.assign({},this.data.prestamo);
    else{
      this.prestamo = new Prestamos();
    }
      
    
      this.gamesService.getAllGames().subscribe(
        results => {
          this.games = results
          if(this.prestamo.game != null){
            let gameFilter: Game[] = results.filter(game => game.id == this.data.prestamo.game.id);
            if(gameFilter != null)
              this.prestamo.game = gameFilter[0];
          }
        }
      );

      this.clientService.getClients().subscribe(
        results => {
          this.clients = results

          //Comprobamos que tenga un cliente asociado, el préstamo que le hemos pasado de la lista de préstamos
          if(this.prestamo.client != null){ 

            //Almacenamos el cliente con el mismo id del cliente asociado al préstamo
            let clientFilter: Client [] = results.filter(client => client.id == this.data.prestamo.client.id);

            //Si existe cliente asociado al préstamo, almacenamos el préstamo (de la BBDD) y lo enviamos para que
            // el usuario lo cambie si quiere.
            if(clientFilter != null)
              this.prestamo.client = clientFilter[0]
          }
        }
      );
  }

  checkDayOut(checkPrestamo: Prestamos): boolean{
    let result=true;
    
    if(checkPrestamo.dayOut<=checkPrestamo.dayIn){
      result=false;
    }
    
    return result
  }

  checkMaxDays(checkPrestamo: Prestamos): boolean{
    let result=true;
    
    //Convertimos las dates al mismo formato
    let date: Date = new Date(checkPrestamo.dayIn);
    let date2: Date = new Date(checkPrestamo.dayOut);

    //Añadimos 14 dias a la fecha de inicio
    date = this.addDays(date,14);
    
    //Comparamo las fechas

    if(date<date2){
      result=false;
    }
    
    return result;
  }

  addDays(date: Date, days: number): Date{
    let result = new Date(date);
    result.setDate(result.getDate()+days);
    return result;
  }

  checkIfTwoGamesPrestados(prestamo: Prestamos): boolean{
    
    var resultsFromDataBase: Prestamos[];

  
      this.prestamosService.checkGames(prestamo.game.id,prestamo.dayOut,prestamo.dayIn).subscribe(
        data => {
          resultsFromDataBase = data    
          if(resultsFromDataBase.length > 0){
            this.resultsGame = true;  
           
          }
          else{
            this.resultsGame=false; 
            this.checkIfTwoClientsPrestados(this.prestamo);
              
          }
          
        }
      )

    return this.resultsGame;
  }

  checkIfTwoClientsPrestados(prestamo: Prestamos): boolean{
    var resultsFromDataBase: Prestamos[];

  
      this.prestamosService.checkClients(prestamo.client.id,prestamo.dayOut,prestamo.dayIn).subscribe(
        data => {
          resultsFromDataBase = data    
          if(resultsFromDataBase.length > 1){
            this.resultsClient = true;  
           
          }
          else{
           this.resultsClient = false   
           if(this.checkDayOut(this.prestamo)==true &&  this.checkMaxDays(this.prestamo)==true && this.resultsGame == false && this.resultsClient == false){ 
            this.prestamosService.savePrestamos(this.prestamo).subscribe(
              result =>{this.onClose()}
            );
          }    
          }
        }
      )
  
    return this.resultsClient;
  }

  onSave(){
   this.resultsGame = this.checkIfTwoGamesPrestados(this.prestamo);
   
  }

  onClose(){
    this.dialogRef.close();
  }

  

}
