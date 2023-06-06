import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personal } from 'src/app/interface/personal.interface';
import { PersonalService } from 'src/app/service/personal.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-editar',
  templateUrl: './personal-editar.component.html',
  styleUrls: ['./personal-editar.component.css']
})
export class PersonalEditarComponent extends BaseComponent implements OnInit {

  personal!: Personal;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<PersonalEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalEditarComponent,
    private personalService : PersonalService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.personal);
  }

  inicializar(){
    this.personal = {
      n_idgen_personal:0,
      c_nombre:'',
      c_email:'',
    }
  }

  activarEditar(data:Personal){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.personal = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.personal);
    if(this.editar){
      this.actualizarEquipo(this.personal);
    }else{
      this.agregarEquipo(this.personal);  
    }

    this.dialogRef.close({ flag: true, data: this.personal });
  }

  agregarEquipo(personal: Personal){
    this.personalService.agregarPersonal(personal, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Personal agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarEquipo(personal: Personal){
    this.personalService.actualizarPersonal(personal, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Infestacion Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
