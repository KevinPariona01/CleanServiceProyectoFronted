import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Infestacion } from 'src/app/interface/infestacion.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfestacionService } from 'src/app/service/infestacion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-infestacion-editar',
  templateUrl: './infestacion-editar.component.html',
  styleUrls: ['./infestacion-editar.component.css']
})
export class InfestacionEditarComponent extends BaseComponent implements OnInit {

  infestacion!: Infestacion;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<InfestacionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfestacionEditarComponent,
    private infestacionService : InfestacionService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.infestacion);
  }

  inicializar(){
    this.infestacion = {
      n_idgen_infestacion:0,
      c_nombre:'',
      c_descripcion:'',
    }
  }

  activarEditar(data:Infestacion){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.infestacion = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.infestacion);
    if(this.editar){
      this.actualizarEquipo(this.infestacion);
    }else{
      this.agregarEquipo(this.infestacion);  
    }

    this.dialogRef.close({ flag: true, data: this.infestacion });
  }

  agregarEquipo(infestacion: Infestacion){
    this.infestacionService.agregarInfestacion(infestacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Infestacion agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarEquipo(infestacion: Infestacion){
    this.infestacionService.actualizarInfestacion(infestacion, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Infestacion Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
