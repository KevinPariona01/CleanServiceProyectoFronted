import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductoService } from 'src/app/service/producto.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent extends BaseComponent implements OnInit {
  producto!: Producto;
  editar:boolean=false;


  constructor(
    private dialogRef: MatDialogRef<ProductoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoEditarComponent,
    private productoService : ProductoService,
    public override router: Router, 
    public override snackBar: MatSnackBar, 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.activarEditar(this.data.producto);
  }

  inicializar(){
    this.producto = {
      n_idgen_producto:0,
      c_codigo:'',
      c_descripcion:''
    }
  }

  activarEditar(data:Producto){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.producto = data;
      this.editar=true;
    }
  }

  async guardar(newForm:any){
    console.log(this.producto);
    let res_val = await this.validarNoRepetir(this.producto);
    if(res_val===false){ return }//VALIDAR SI HAY ERROR
    if(res_val.length>0){ return this.openSnackBar("Ya existe el código, no se puede repetir", 2500); }//VALIDAR SI SE REPITE
    if(this.editar){
      this.actualizarProducto(this.producto);
    }else{
      this.agregarProducto(this.producto);  
    }

    this.dialogRef.close({ flag: true, data: this.producto });
  }

  agregarProducto(producto: Producto){
    this.productoService.agregarProducto(producto, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Producto agregado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  actualizarProducto(producto: Producto){
    this.productoService.actualizarProducto(producto, this.getToken().token)
    .subscribe((res)=>{
      if(res.estado){
        this.openSnackBar("Producto Actualizado", 2500);
      }else{
        this.openSnackBar(res.mensaje, 2500);
      }
    });
  }

  async validarNoRepetir(producto:Producto): Promise<any>{
    let res_val;
    await new Promise((resolve)=>{
      this.productoService.validarNoRepetir(producto, this.getToken().token)
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
