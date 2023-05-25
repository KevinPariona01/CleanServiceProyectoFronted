import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Periodo } from 'src/app/interface/periodo.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodoService } from 'src/app/service/periodo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-periodo-editar',
  templateUrl: './periodo-editar.component.html',
  styleUrls: ['./periodo-editar.component.css']
})
export class PeriodoEditarComponent extends BaseComponent implements OnInit {

  periodo!: Periodo;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<PeriodoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodoEditarComponent,
    private periodoService : PeriodoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.periodo);
  }

  inicializar(){
    this.periodo = {
      n_idperiodo:0,
      c_mes:'',
      c_anio:'',
      c_descripcion:'',
      b_activo:true
    }
  }

  activarEditar(data:Periodo){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.periodo = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.periodo);
    if(this.editar){
      this.actualizarPeriodo(this.periodo);
    }else{
      this.agregarPeriodo(this.periodo);  
    }

    this.dialogRef.close({ flag: true, data: this.periodo });
  }

  agregarPeriodo(periodo: Periodo){
    this.periodoService.agregarPeriodo(periodo, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Periodo agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarPeriodo(periodo: Periodo){
    this.periodoService.actualizarPeriodo(periodo, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Periodo Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
