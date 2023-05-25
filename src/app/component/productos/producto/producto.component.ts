import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoEditarComponent } from '../producto-editar/producto-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent extends BaseComponent implements OnInit{

  displayedColumns: string[] = ['editar','codigo', 'descripcion', 'eliminar'];
  public tablaProductos!: MatTableDataSource<any>;

  constructor(
    private productoService : ProductoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarProducto();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaProductos.filter = dato.trim().toLowerCase();
  }

  listarProducto(){
    this.productoService.listarProducto({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaProductos = new MatTableDataSource<any>(res.data);
      }else{
        this.openSnackBar(res.mensaje, 2500); 
      }
      
    }));
  }

  editarProducto(producto:any){
    const dialogRef = this.dialog.open(ProductoEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { producto: producto}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarProducto();

      } catch (error) {
        console.log(error);
        this.listarProducto();
      }
    });

  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el producto con codigo " + dato.c_codigo + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarProducto(dato);
      }
    });
  }

  eliminarProducto(dato:any){
    this.productoService.eliminarProducto(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar(`Se elimino el producto ${dato.c_codigo}`,2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarProducto();
    }));
  }


}
