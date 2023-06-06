import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EspecieService } from 'src/app/service/especie.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EspecieEditarComponent } from '../especie-editar/especie-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-especie',
  templateUrl: './especie.component.html',
  styleUrls: ['./especie.component.css']
})
export class EspecieComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaEspecie!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private especieService : EspecieService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarEspecie();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaEspecie.filter = dato.trim().toLowerCase();
  }

  listarEspecie(){
    this.especieService.listarEspecie({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaEspecie = new MatTableDataSource<any>(res.data);
        this.tablaEspecie.sort = this.sort;
        this.tablaEspecie.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarEspecie(especie:any){
    const dialogRef = this.dialog.open(EspecieEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { especie: especie}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarEspecie();

      } catch (error) {
        console.log(error);
        this.listarEspecie();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la especie con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarInfestacion(dato);
      }
    });
  }

  eliminarInfestacion(dato:any){
    this.especieService.eliminarEspecie(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la especie', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarEspecie();
    }));
  }

}
