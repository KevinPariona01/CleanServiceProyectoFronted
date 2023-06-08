import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Tienda } from 'src/app/interface/tienda.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiendaService } from 'src/app/service/tienda.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/interface/cliente.interface';

@Component({
  selector: 'app-tienda-editar',
  templateUrl: './tienda-editar.component.html',
  styleUrls: ['./tienda-editar.component.css']
})
export class TiendaEditarComponent extends BaseComponent implements OnInit {

  tienda!: Tienda;
  editar:boolean=false;
  listaClientesXCodigo:any=[];


  constructor(
    private dialogRef: MatDialogRef<TiendaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TiendaEditarComponent,
    private tiendaService : TiendaService,
    private clienteService : ClienteService,
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
      n_idgen_tienda:0,
      n_idgen_cliente:0,
      c_codigo:'',
      c_direccion:'',
      c_nombre_responsable:'',
      cod_cliente:''
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

  async guardar(newForm:any){
    console.log(this.tienda);
    let res_val = await this.validarNoRepetir(this.tienda);
    if(res_val===false){ return }//VALIDAR SI HAY ERROR
    if(res_val.length>0){ return this.openSnackBar("Ya existe el código, no se puede repetir", 2500); }//VALIDAR SI SE REPITE
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

  clienteXCodigo(){
    let parametro = {
      c_codigo : this.tienda.cod_cliente 
    }
    if(this.tienda.cod_cliente .length>2){
      this.clienteService.clienteXCodigo(parametro, this.getToken().token)
      .subscribe((res:any)=>{
        if(res.estado){
          this.listaClientesXCodigo = res.data
        }else{
          this.openSnackBar(res.mensaje, 2500);
        }
        
      });
    }
  }

  obtenerClenteXCodigo(cliente:Cliente){
    this.tienda.n_idgen_cliente = cliente.n_idgen_cliente;
  }

  async validarNoRepetir(tienda:Tienda): Promise<any>{
    let res_val;
    await new Promise((resolve)=>{
      this.tiendaService.validarNoRepetir(tienda, this.getToken().token)
        .subscribe((res)=>{
        if(res.estado){
          res_val = res.data;
          resolve(res_val);
        }else{
          this.openSnackBar(res.mensaje, 2500);
          res_val = false;
          resolve(res_val);
        }
      });
    });
    return res_val;
  }

}
