import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recomendacion } from 'src/app/interface/recomendacion.interface';
import { BaseComponent } from '../../base/base.component';
import { RecomendacionService } from 'src/app/service/recomendacion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recomendacion-editar',
  templateUrl: './recomendacion-editar.component.html',
  styleUrls: ['./recomendacion-editar.component.css']
})
export class RecomendacionEditarComponent extends BaseComponent implements OnInit {

  recomendacion!: Recomendacion;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<RecomendacionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecomendacionEditarComponent,
    private recomendacionService : RecomendacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.recomendacion);
  }

  inicializar(){
    this.recomendacion = {
      n_idgen_recomendacion:0,
      c_nombre:'',
      c_descripcion:'',
    }
  }

  activarEditar(data:Recomendacion){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.recomendacion = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.recomendacion);
    if(this.editar){
      this.actualizarEquipo(this.recomendacion);
    }else{
      this.agregarEquipo(this.recomendacion);  
    }

    this.dialogRef.close({ flag: true, data: this.recomendacion });
  }

  agregarEquipo(recomendacion: Recomendacion){
    this.recomendacionService.agregarRecomendacion(recomendacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Recomendacion agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarEquipo(equipo: Recomendacion){
    this.recomendacionService.actualizarRecomendacion(equipo, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Recomendacion Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
