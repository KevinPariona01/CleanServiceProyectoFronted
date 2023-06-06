import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ObservacionService } from 'src/app/service/observacion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionEditarComponent } from '../observacion-editar/observacion-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})
export class ObservacionComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaObservaciones!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private observacionService : ObservacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarObservacion();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaObservaciones.filter = dato.trim().toLowerCase();
  }

  listarObservacion(){
    this.observacionService.listarObservacion({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaObservaciones = new MatTableDataSource<any>(res.data);
        this.tablaObservaciones.sort = this.sort;
        this.tablaObservaciones.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarObservacion(observacion:any){
    const dialogRef = this.dialog.open(ObservacionEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { observacion: observacion}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarObservacion();
      } catch (error) {
        console.log(error);
        this.listarObservacion();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la observacion con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarObservacion(dato);
      }
    });
  }

  eliminarObservacion(dato:any){
    this.observacionService.eliminarObservacion(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la observación', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarObservacion();
    }));
  }

}
