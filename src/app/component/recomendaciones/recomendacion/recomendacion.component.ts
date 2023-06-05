import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RecomendacionService } from 'src/app/service/recomendacion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RecomendacionEditarComponent } from '../recomendacion-editar/recomendacion-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.css']
})
export class RecomendacionComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaRecomendacion!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private recomendacionService : RecomendacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarRecomendacion();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaRecomendacion.filter = dato.trim().toLowerCase();
  }

  listarRecomendacion(){
    this.recomendacionService.listarRecomendacion({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaRecomendacion = new MatTableDataSource<any>(res.data);
        this.tablaRecomendacion.sort = this.sort;
        this.tablaRecomendacion.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarRecomendacion(recomendacion:any){
    const dialogRef = this.dialog.open(RecomendacionEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { recomendacion: recomendacion}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarRecomendacion();

      } catch (error) {
        console.log(error);
        this.listarRecomendacion();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la recomendación con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarEquipo(dato);
      }
    });
  }

  eliminarEquipo(dato:any){
    this.recomendacionService.eliminarRecomendacion(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la recomendación', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarRecomendacion();
    }));
  }

}
