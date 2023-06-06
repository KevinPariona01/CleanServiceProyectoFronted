import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Dosificacion } from 'src/app/interface/dosificacion.interface';
import { DosificacionService } from 'src/app/service/dosificacion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dosificacion-editar',
  templateUrl: './dosificacion-editar.component.html',
  styleUrls: ['./dosificacion-editar.component.css']
})
export class DosificacionEditarComponent extends BaseComponent implements OnInit {

  dosificacion!: Dosificacion;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<DosificacionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DosificacionEditarComponent,
    private dosificacionService : DosificacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.dosificacion);
  }

  inicializar(){
    this.dosificacion = {
      n_idgen_dosificacion:0,
      c_nombre:'',
      c_descripcion:'',
    }
  }

  activarEditar(data:Dosificacion){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.dosificacion = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.dosificacion);
    if(this.editar){
      this.actualizarDosificacion(this.dosificacion);
    }else{
      this.agregarDosificacion(this.dosificacion);  
    }

    this.dialogRef.close({ flag: true, data: this.dosificacion });
  }

  agregarDosificacion(dosificacion: Dosificacion){
    this.dosificacionService.agregarDosificacion(dosificacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Dosificación agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarDosificacion(dosificacion: Dosificacion){
    this.dosificacionService.actualizarDosificacion(dosificacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Dosificación Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
