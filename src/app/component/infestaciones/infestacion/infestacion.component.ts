import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InfestacionService } from 'src/app/service/infestacion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfestacionEditarComponent } from '../infestacion-editar/infestacion-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-infestacion',
  templateUrl: './infestacion.component.html',
  styleUrls: ['./infestacion.component.css']
})
export class InfestacionComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaInfestacion!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private infestacionService : InfestacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarInfestacion();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaInfestacion.filter = dato.trim().toLowerCase();
  }

  listarInfestacion(){
    this.infestacionService.listarInfestacion({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaInfestacion = new MatTableDataSource<any>(res.data);
        this.tablaInfestacion.sort = this.sort;
        this.tablaInfestacion.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarInfestacion(infestacion:any){
    const dialogRef = this.dialog.open(InfestacionEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { infestacion: infestacion}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarInfestacion();

      } catch (error) {
        console.log(error);
        this.listarInfestacion();
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
        this.eliminarInfestacion(dato);
      }
    });
  }

  eliminarInfestacion(dato:any){
    this.infestacionService.eliminarInfestacion(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la recomendación', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarInfestacion();
    }));
  }

}
