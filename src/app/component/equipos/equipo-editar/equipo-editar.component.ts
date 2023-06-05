import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Equipo } from 'src/app/interface/equipo.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipoService } from 'src/app/service/equipo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-equipo-editar',
  templateUrl: './equipo-editar.component.html',
  styleUrls: ['./equipo-editar.component.css']
})
export class EquipoEditarComponent extends BaseComponent implements OnInit {

  equipo!: Equipo;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<EquipoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EquipoEditarComponent,
    private equipoService : EquipoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.equipo);
  }

  inicializar(){
    this.equipo = {
      n_idgen_equipo:0,
      c_nombre:'',
      c_descripcion:'',
      b_activo:true
    }
  }

  activarEditar(data:Equipo){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.equipo = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.equipo);
    if(this.editar){
      this.actualizarEquipo(this.equipo);
    }else{
      this.agregarEquipo(this.equipo);  
    }

    this.dialogRef.close({ flag: true, data: this.equipo });
  }

  agregarEquipo(equipo: Equipo){
    this.equipoService.agregarEquipo(equipo, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Equipo agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarEquipo(equipo: Equipo){
    this.equipoService.actualizarEquipo(equipo, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Equipo Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
