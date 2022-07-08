import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClientEditComponent } from 'src/app/client-edit/client-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    public dialog: MatDialog,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }

  createClient(){
    const dialogRef = this.dialog.open(ClientEditComponent,{
      data: {}
    });

    dialogRef.afterClosed().subscribe( result => { this.ngOnInit()
    }
    );
  }
 
  editClient(client: Client): void{
    const dialogRef = this.dialog.open(ClientEditComponent,{
      data: {client}
    });

    dialogRef.afterClosed().subscribe( result => { this.ngOnInit()
    }
    );

  }


  deleteClient(client: Client){
    const dialogRef = this.dialog.open(DialogConfirmationComponent,{
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.clientService.deleteClient(client).subscribe(result =>{
        this.ngOnInit();
        }
        );
      }
    });

  }

}
