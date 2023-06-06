import { Component, Inject, OnInit } from '@angular/core';
import { Incidente } from 'src/app/interface/incidente.interface';
import { BaseComponent } from '../../base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncidenteService } from 'src/app/service/incidente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incidente-editar',
  templateUrl: './incidente-editar.component.html',
  styleUrls: ['./incidente-editar.component.css']
})
export class IncidenteEditarComponent extends BaseComponent implements OnInit {

  incidente!: Incidente;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<IncidenteEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncidenteEditarComponent,
    private incidenteService : IncidenteService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.incidente);
  }

  inicializar(){
    this.incidente = {
      n_idgen_incidente:0,
      c_nombre:'',
      c_descripcion:'',
    }
  }

  activarEditar(data:Incidente){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.incidente = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.incidente);
    if(this.editar){
      this.actualizarIncidente(this.incidente);
    }else{
      this.agregarIncidente(this.incidente);  
    }

    this.dialogRef.close({ flag: true, data: this.incidente });
  }

  agregarIncidente(incidente: Incidente){
    this.incidenteService.agregarIncidente(incidente, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Incidente agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarIncidente(incidente: Incidente){
    this.incidenteService.actualizarIncidente(incidente, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Incidente Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
