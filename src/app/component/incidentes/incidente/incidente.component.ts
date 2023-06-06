import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IncidenteService } from 'src/app/service/incidente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IncidenteEditarComponent } from '../incidente-editar/incidente-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})
export class IncidenteComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaIncidente!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private incidenteService : IncidenteService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarIncidente();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaIncidente.filter = dato.trim().toLowerCase();
  }

  listarIncidente(){
    this.incidenteService.listarIncidente({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaIncidente = new MatTableDataSource<any>(res.data);
        this.tablaIncidente.sort = this.sort;
        this.tablaIncidente.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarIncidente(incidente:any){
    const dialogRef = this.dialog.open(IncidenteEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { incidente: incidente}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarIncidente();

      } catch (error) {
        console.log(error);
        this.listarIncidente();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el incidente con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarIncidente(dato);
      }
    });
  }

  eliminarIncidente(dato:any){
    this.incidenteService.eliminarIncidente(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el incidente', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarIncidente();
    }));
  }

}
