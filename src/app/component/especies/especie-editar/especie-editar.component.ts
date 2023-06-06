import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Especie } from 'src/app/interface/especie.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EspecieService } from 'src/app/service/especie.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especie-editar',
  templateUrl: './especie-editar.component.html',
  styleUrls: ['./especie-editar.component.css']
})
export class EspecieEditarComponent extends BaseComponent implements OnInit {

  especie!: Especie;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<EspecieEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EspecieEditarComponent,
    private especieService : EspecieService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.especie);
  }

  inicializar(){
    this.especie = {
      n_idgen_especie:0,
      c_nombre:'',
      c_descripcion:'',
    }
  }

  activarEditar(data:Especie){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.especie = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.especie);
    if(this.editar){
      this.actualizarEquipo(this.especie);
    }else{
      this.agregarEquipo(this.especie);  
    }

    this.dialogRef.close({ flag: true, data: this.especie });
  }

  agregarEquipo(especie: Especie){
    this.especieService.agregarEspecie(especie, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Especie agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarEquipo(especie: Especie){
    this.especieService.actualizarEspecie(especie, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Especie Actualizada", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
