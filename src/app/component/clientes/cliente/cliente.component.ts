import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ClienteEditarComponent } from '../cliente-editar/cliente-editar.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','codigo', 'razon_social', 'direccion', 'eliminar'];
  public tablaClientes!: MatTableDataSource<any>;

  constructor(
    private clienteService : ClienteService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarCliente();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaClientes.filter = dato.trim().toLowerCase();
  }

  listarCliente(){
    this.clienteService.listarCliente({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaClientes = new MatTableDataSource<any>(res.data);
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarCliente(cliente:any){
    const dialogRef = this.dialog.open(ClienteEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { cliente: cliente}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarCliente();

      } catch (error) {
        console.log(error);
        this.listarCliente();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el cliente con codigo " + dato.c_codigo + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarCliente(dato);
      }
    });
  }

  eliminarCliente(dato:any){
    this.clienteService.eliminarCliente(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el cliente', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarCliente();
    }));
  }

}
