import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DosificacionService } from 'src/app/service/dosificacion.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DosificacionEditarComponent } from '../dosificacion-editar/dosificacion-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-dosificacion',
  templateUrl: './dosificacion.component.html',
  styleUrls: ['./dosificacion.component.css']
})
export class DosificacionComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaDosificacion!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private dosificacionService : DosificacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarDosificacion();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaDosificacion.filter = dato.trim().toLowerCase();
  }

  listarDosificacion(){
    this.dosificacionService.listarDosificacion({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaDosificacion = new MatTableDataSource<any>(res.data);
        this.tablaDosificacion.sort = this.sort;
        this.tablaDosificacion.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarDosificacion(dosificacion:any){
    const dialogRef = this.dialog.open(DosificacionEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { dosificacion: dosificacion}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarDosificacion();

      } catch (error) {
        console.log(error);
        this.listarDosificacion();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la dosificacion con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDosificacion(dato);
      }
    });
  }

  eliminarDosificacion(dato:any){
    this.dosificacionService.eliminarDosificacion(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la recomendación', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarDosificacion();
    }));
  }

}
