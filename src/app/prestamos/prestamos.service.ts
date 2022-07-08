import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Game } from '../game/model/Game';
import { PRESTAMOS_DATA_LIST } from './model/mock-prestamos-lists';
import { Prestamos } from './model/Prestamos';
import { PrestamosPage } from './model/PrestamosPage';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  

  constructor(
    private http: HttpClient
  ) { }

  checkGames(idGame: number, dayOut: Date, dayIn: Date): Observable<Prestamos []>{
    // http://localhost:8080/prestamos?idGame=4&dayIn=2022-12-05&dayOut=2022-12-16
    let url = 'http://localhost:8080/prestamos?idGame='+idGame+'&dayOut='+dayOut+'&dayIn='+dayIn;
  
    return this.http.get<Prestamos []>(url);
  }

  checkClients(idClient: number, dayOut: Date, dayIn: Date): Observable<Prestamos []>{
    let url = 'http://localhost:8080/prestamos/client?idClient='+idClient+'&dayOut='+dayOut+'&dayIn='+dayIn;
    
    return this.http.get<Prestamos []>(url);
  }

  deletePrestamo(prestamo: Prestamos): Observable<any>{
    let url = 'http://localhost:8080/prestamos/' + prestamo.id;
    return this.http.delete<Prestamos>(url);
  }


  savePrestamos(prestamo: Prestamos): Observable<any>{
    let url = 'http://localhost:8080/prestamos';
    
    if (prestamo.id != null) 
      url += '/'+prestamo.id;

    return this.http.put<Prestamos>(url,prestamo)
  }

  getPrestamos(pageable: Pageable, gameTitle: string, date: Date, clientName: string): Observable<PrestamosPage>{
    return this.http.post<PrestamosPage>(this.getComposeUrl(gameTitle,date,clientName),{pageable});
  }

  getComposeUrl(gameTitle: string, date: Date, clientName: string):string{
      let params = '';

      if (gameTitle != null) {
          params += 'title='+gameTitle;
      }

      if (date != null) {
          if (params != '') 
            params += "&";

          params += "date="+date;
      }

      if(clientName != null){
        if (params != '') 
          params += "&";

          params += "name="+clientName;
      }
      //Si alguno de estos 3 parámetros son nulos, la url solo tendría el aspecto siguiente:
      let url = 'http://localhost:8080/prestamos'

      if (params == '') 
        return url; //Devolvemos la URL de base solo si el resto de parámetros es nulo
      else 
        return url + '?'+params; // Devolvemos la url con filtros
  }
  

}
