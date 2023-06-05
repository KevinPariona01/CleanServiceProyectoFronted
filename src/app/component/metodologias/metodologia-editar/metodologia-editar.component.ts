import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Metodologia } from 'src/app/interface/metodologia.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetodologiaService } from 'src/app/service/metodologia.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-metodologia-editar',
  templateUrl: './metodologia-editar.component.html',
  styleUrls: ['./metodologia-editar.component.css']
})
export class MetodologiaEditarComponent extends BaseComponent implements OnInit {

  metodologia!: Metodologia;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<MetodologiaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetodologiaEditarComponent,
    private metodologiaService : MetodologiaService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.metodologia);
  }

  inicializar(){
    this.metodologia = {
      n_idgen_metodologia:0,
      c_nombre:'',
      c_descripcion:''
    }
  }

  activarEditar(data:Metodologia){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.metodologia = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.metodologia);
    if(this.editar){
      this.actualizarMetodologia(this.metodologia);
    }else{
      this.agregarMetodologia(this.metodologia);  
    }

    this.dialogRef.close({ flag: true, data: this.metodologia });
  }

  agregarMetodologia(metodologia: Metodologia){
    this.metodologiaService.agregarMetodologia(metodologia, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Equipo agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarMetodologia(metodologia: Metodologia){
    this.metodologiaService.actualizarMetodologia(metodologia, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Equipo Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }


}
