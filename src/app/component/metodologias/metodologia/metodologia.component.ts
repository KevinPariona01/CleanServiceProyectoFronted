import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MetodologiaService } from 'src/app/service/metodologia.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { MetodologiaEditarComponent } from '../metodologia-editar/metodologia-editar.component';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})
export class MetodologiaComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'descripcion', 'eliminar'];
  public tablaMetodologia!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private metodologiaService : MetodologiaService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarMetodologia();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaMetodologia.filter = dato.trim().toLowerCase();
  }

  listarMetodologia(){
    this.metodologiaService.listarMetodologia({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaMetodologia = new MatTableDataSource<any>(res.data);
        this.tablaMetodologia.sort = this.sort;
        this.tablaMetodologia.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarMetodologia(metodologia:any){
    const dialogRef = this.dialog.open(MetodologiaEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { metodologia: metodologia}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarMetodologia();
      } catch (error) {
        console.log(error);
        this.listarMetodologia();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la metodologia con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarMetodologia(dato);
      }
    });
  }

  eliminarMetodologia(dato:any){
    this.metodologiaService.eliminarMetodologia(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el periodo', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarMetodologia();
    }));
  }
  
}
