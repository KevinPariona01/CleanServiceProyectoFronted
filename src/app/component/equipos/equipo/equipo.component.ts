import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EquipoService } from 'src/app/service/equipo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { EquipoEditarComponent } from '../equipo-editar/equipo-editar.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'activo', 'eliminar'];
  public tablaEquipos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private equipoService : EquipoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarEquipo();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaEquipos.filter = dato.trim().toLowerCase();
  }

  listarEquipo(){
    this.equipoService.listarEquipo({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaEquipos = new MatTableDataSource<any>(res.data);
        this.tablaEquipos.sort = this.sort;
        this.tablaEquipos.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarEquipo(equipo:any){
    const dialogRef = this.dialog.open(EquipoEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { equipo: equipo}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarEquipo();

      } catch (error) {
        console.log(error);
        this.listarEquipo();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el equipo con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarEquipo(dato);
      }
    });
  }

  eliminarEquipo(dato:any){
    this.equipoService.eliminarEquipo(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el equipo', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarEquipo();
    }));
  }

  estadoPeriodo(item:any): void {
    /* let request = {
      n_idgen_periodo: item.n_idgen_periodo,
      b_activo: !item.b_activo,
      //n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    this.periodoService.estadoPeriodo(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            //this.getTablaUsuario();//ACTUALIZA LOS ESTADOS
            if(item.b_activo){
              this.openSnackBar("Periódo Activado", 99);
            }else{
              this.openSnackBar("Periódo Desactivado", 99);
            }
            
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }); */
  }

}
