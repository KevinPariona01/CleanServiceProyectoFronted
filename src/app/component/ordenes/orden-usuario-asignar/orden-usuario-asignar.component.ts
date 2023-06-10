import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TecnicoService } from 'src/app/service/tecnico.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-orden-usuario-asignar',
  templateUrl: './orden-usuario-asignar.component.html',
  styleUrls: ['./orden-usuario-asignar.component.css']
})
export class OrdenUsuarioAsignarComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['user', 'nombre', 'apellido', 'asignar'];
  tablaTecnicos!: MatTableDataSource<any>;

  constructor(
    private dialogRef: MatDialogRef<OrdenUsuarioAsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public override router: Router, 
    public override snackBar: MatSnackBar,
    private tecnicoService: TecnicoService,
    private ordenService: OrdenService,
  ) {
    super(  snackBar, router );
  }

  
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  override ngOnInit(): void {
    console.log("DATA: ", this.data);
    this.listarTecnico();
    
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaTecnicos.filter = dato.trim().toLowerCase();
  }

  listarTecnico(){
    this.tecnicoService.listarTecnico({}, this.getToken().token).subscribe((res=>{
      if(res.estado){
        this.tablaTecnicos = new MatTableDataSource<any>(res.data);
        this.tablaTecnicos.sort = this.sort;
        this.tablaTecnicos.paginator = this.paginator;
        
    }else{
      this.openSnackBar(res.mensaje, 2500);
      console.log("OCURRIO UN ERROR");
    }
    }));
  }

  asignarOrdenesTecnico(tecnico:any){
    let parametro = {
      tecnico: tecnico,
      ordenes: this.data.ordenesAsignadas
    }
    console.log(parametro);
    
    this.ordenService.asignarOrdenesTecnico(parametro, this.getToken().token).subscribe((res)=>{
        if(res.estado){
          console.log("Usuarios asignados");
          this.dialogRef.close(true);
        }else{
          this.openSnackBar(res.mensaje, 2500);
          console.log("OCURRIO UN ERROR");
        }
    });
  }

}
