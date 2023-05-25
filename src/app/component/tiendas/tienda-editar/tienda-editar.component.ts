import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Tienda } from 'src/app/interface/tienda.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiendaService } from 'src/app/service/tienda.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tienda-editar',
  templateUrl: './tienda-editar.component.html',
  styleUrls: ['./tienda-editar.component.css']
})
export class TiendaEditarComponent extends BaseComponent implements OnInit {

  tienda!: Tienda;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<TiendaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TiendaEditarComponent,
    private tiendaService : TiendaService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.tienda);
  }

  inicializar(){
    this.tienda = {
      n_idtienda:0,
      n_idcliente:0,
      c_codigo:'',
      c_direccion:'',
      c_nombre_responsable:''
    }
  }

  activarEditar(data:Tienda){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.tienda = data;
      this.editar=true;
    }
  }

  guardar(newForm:any){
    console.log(this.tienda);
    if(this.editar){
      this.actualizarCliente(this.tienda);
    }else{
      this.agregarCliente(this.tienda);  
    }

    this.dialogRef.close({ flag: true, data: this.tienda });
  }

  agregarCliente(tienda: Tienda){
    this.tiendaService.agregarTienda(tienda, this.getToken().token)
    .subscribe((res:any)=>{
      if(res.estado){
        this.openSnackBar("Tienda agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarCliente(tienda: Tienda){
    this.tiendaService.actualizarTienda(tienda, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Tienda Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

}
