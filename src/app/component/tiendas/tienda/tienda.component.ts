import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/service/tienda.service';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { TiendaEditarComponent } from '../tienda-editar/tienda-editar.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','codigo', 'idCliente', 'direccion', 'nombre_responsable', 'eliminar'];
  public tablaTiendas!: MatTableDataSource<any>;

  constructor(
    private tiendaService : TiendaService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarTienda();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaTiendas.filter = dato.trim().toLowerCase();
  }

  listarTienda(){
    this.tiendaService.listarTienda({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaTiendas = new MatTableDataSource<any>(res.data);
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarTienda(tienda:any){
    const dialogRef = this.dialog.open(TiendaEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { tienda: tienda}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarTienda();

      } catch (error) {
        console.log(error);
        this.listarTienda();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la tienda con codigo " + dato.c_codigo + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarTienda(dato);
      }
    });
  }

  eliminarTienda(dato:any){
    this.tiendaService.eliminarTienda(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el cliente', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarTienda();
    }));
  }

}
