import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Cliente } from 'src/app/interface/cliente.interface';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent extends BaseComponent implements OnInit {

  cliente!: Cliente;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<ClienteEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClienteEditarComponent,
    private clienteService : ClienteService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.cliente);
  }

  inicializar(){
    this.cliente = {
      n_idgen_cliente:0,
      c_codigo:'',
      c_razon_social:'',
      c_direccion:''
    }
  }

  activarEditar(data:Cliente){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.cliente = data;
      this.editar=true;
    }
  }

  async guardar(newForm:any){
    console.log(this.cliente);
    let res_val = await this.validarNoRepetir(this.cliente);
    if(res_val===false){ return }//VALIDAR SI HAY ERROR
    if(res_val.length>0){ return this.openSnackBar("Ya existe el código, no se puede repetir", 2500); }//VALIDAR SI SE REPITE
    if(this.editar){
      this.actualizarCliente(this.cliente);
    }else{
      this.agregarCliente(this.cliente);  
    }

    this.dialogRef.close({ flag: true, data: this.cliente });
  }

  agregarCliente(cliente: Cliente){
    this.clienteService.agregarCliente(cliente, this.getToken().token)
    .subscribe((res:any)=>{
      if(res.estado){
        this.openSnackBar("Cliente agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarCliente(cliente: Cliente){
    this.clienteService.actualizarCliente(cliente, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Cliente Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  async validarNoRepetir(cliente:Cliente): Promise<any>{
    let res_val;
    await new Promise((resolve)=>{
      this.clienteService.validarNoRepetir(cliente, this.getToken().token)
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
