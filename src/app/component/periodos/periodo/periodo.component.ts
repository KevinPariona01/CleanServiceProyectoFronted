import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodoService } from 'src/app/service/periodo.service';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { PeriodoEditarComponent } from '../periodo-editar/periodo-editar.component';
import { AppSettings } from 'src/app/common/appsettings';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','mes', 'anio', 'descripcion', 'activo', 'eliminar'];
  public tablaPeriodos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private periodoService : PeriodoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarPeriodo();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaPeriodos.filter = dato.trim().toLowerCase();
  }

  listarPeriodo(){
    this.periodoService.listarPeriodo({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaPeriodos = new MatTableDataSource<any>(res.data);
        this.tablaPeriodos.sort = this.sort;
        this.tablaPeriodos.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarPeriodo(periodo:any){
    const dialogRef = this.dialog.open(PeriodoEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { periodo: periodo}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarPeriodo();

      } catch (error) {
        console.log(error);
        this.listarPeriodo();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el periódo con descripción " + dato.c_descripcion + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarPeriodo(dato);
      }
    });
  }

  eliminarPeriodo(dato:any){
    this.periodoService.eliminarPeriodo(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el periodo', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarPeriodo();
    }));
  }

  estadoPeriodo(item:any): void {
    let request = {
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
      });
  }

}
