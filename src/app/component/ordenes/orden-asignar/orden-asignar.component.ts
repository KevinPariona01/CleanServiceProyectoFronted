import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdenService } from 'src/app/service/orden.service';
import { PeriodoService } from 'src/app/service/periodo.service';
import { OrdenUsuarioAsignarComponent } from '../orden-usuario-asignar/orden-usuario-asignar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orden-asignar',
  templateUrl: './orden-asignar.component.html',
  styleUrls: ['./orden-asignar.component.css']
})
export class OrdenAsignarComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['estado', 'descripcion', 'tienda', 'periodo', 'check'];
  tablaOrdenes!: MatTableDataSource<any>;
  periodosActivos:any = [];
  ordenesAsignadas:any = [];
  n_idgen_periodo = 0;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    public override router: Router, 
    public override snackBar: MatSnackBar,
    private ordenService: OrdenService,
    private periodoService: PeriodoService,
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarOrden();
    this.listarPeriodoActivos();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaOrdenes.filter = dato.trim().toLowerCase();
  }


  selectPeriodo(data: any){
    this.n_idgen_periodo = data;
    this.listarOrden();
  }

  listarOrden(){
    let parametro = {
      n_idgen_periodo: this.n_idgen_periodo
    }
    this.ordenService.listarOrden(parametro, this.getToken().token).subscribe((res)=>{
      if(res.estado){
          this.tablaOrdenes = new MatTableDataSource<any>(res.data);
          this.tablaOrdenes.sort = this.sort;
          this.tablaOrdenes.paginator = this.paginator;
          this.ordenesAsignadas = [];
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
    });
  }

  listarPeriodoActivos(){
    this.periodoService.listarPeriodoActivos({}, this.getToken().token).subscribe((res)=>{
      if(res.estado){
          this.periodosActivos = res.data;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
    });
  }

  asignar(element:any){
    if (element.check){
      // El checkbox está marcado
      console.log("Checkbox marcado" , element.n_idgen_orden);
      this.ordenesAsignadas.push(element.n_idgen_orden);
      console.log("Array: " , this.ordenesAsignadas);
    } else {
      // El checkbox no está marcado
      console.log("Checkbox no marcado" , element.n_idgen_orden);
      this.ordenesAsignadas = this.ordenesAsignadas.filter((elemento:any) => elemento !== element.n_idgen_orden);
      console.log("Array: " , this.ordenesAsignadas);
    }
    
  }

  validarAsignacionUsuarioActiva(){
    let band: boolean = this.ordenesAsignadas.length > 0;
    if(band){
      this.asignarUsuario();
    }else{
      this.openSnackBar("No hay ordenes de servicio por asignar",2500);
    }
    
  }

  asignarUsuario(){
    const dialogRef = this.dialog.open(OrdenUsuarioAsignarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { ordenesAsignadas: this.ordenesAsignadas}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        if(result){
          this.listarOrden();
        }
      } catch (error) {
        console.log(error);
        //this.listarOrden();
      }
    });
  }
}
