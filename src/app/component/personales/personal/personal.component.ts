import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonalService } from 'src/app/service/personal.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PersonalEditarComponent } from '../personal-editar/personal-editar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'email', 'eliminar'];
  public tablaPersonal!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private personalService : PersonalService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarPersonal();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaPersonal.filter = dato.trim().toLowerCase();
  }

  listarPersonal(){
    this.personalService.listarPersonal({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaPersonal = new MatTableDataSource<any>(res.data);
        this.tablaPersonal.sort = this.sort;
        this.tablaPersonal.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  editarPersonal(personal:any){
    const dialogRef = this.dialog.open(PersonalEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { personal: personal}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarPersonal();

      } catch (error) {
        console.log(error);
        this.listarPersonal();
      }
    });
  }

  eliminar(dato:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el personal con nombre " + dato.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarInfestacion(dato);
      }
    });
  }

  eliminarInfestacion(dato:any){
    this.personalService.eliminarPersonal(dato, this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino la recomendación', 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
      this.listarPersonal();
    }));
  }

}
