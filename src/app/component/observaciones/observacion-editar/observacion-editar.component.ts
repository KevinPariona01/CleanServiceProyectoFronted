import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observacion } from 'src/app/interface/observacion.interface';
import { ObservacionService } from 'src/app/service/observacion.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-observacion-editar',
  templateUrl: './observacion-editar.component.html',
  styleUrls: ['./observacion-editar.component.css']
})
export class ObservacionEditarComponent extends BaseComponent  implements OnInit {

  observacion!: Observacion;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<ObservacionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObservacionEditarComponent,
    private observacionService : ObservacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.observacion);
  }

  inicializar(){
    this.observacion = {
      n_idgen_observacion:0,
      c_nombre:'',
      c_descripcion:''
    }
  }

  activarEditar(data:Observacion){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.observacion = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.observacion);
    if(this.editar){
      this.actualizarObservacion(this.observacion);
    }else{
      this.agregarObservacion(this.observacion);  
    }

    this.dialogRef.close({ flag: true, data: this.observacion });
  }

  agregarObservacion(observacion: Observacion){
    this.observacionService.agregarObservacion(observacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Observación agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarObservacion(observacion: Observacion){
    this.observacionService.actualizarObservacion(observacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Observación Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
