import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['estado', 'descripcion', 'tienda', 'periodo'];
  errorColumns: string[] = ['fila', 'error'];
  tablaOrdenes!: MatTableDataSource<any>;
  tablaErrores!: MatTableDataSource<any>;
  error:boolean = false;

  constructor(
    public override router: Router, 
    public override snackBar: MatSnackBar,
    private ordenService: OrdenService 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarOrden();
  }

  listarOrden(){
    this.ordenService.listarOrden({}, this.getToken().token).subscribe((res)=>{
      if(res.estado){
          this.tablaOrdenes = new MatTableDataSource<any>(res.data);
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
    });
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaOrdenes.filter = dato.trim().toLowerCase();
  }

  file:any;
  arrayBuffer:any
  importar(event:any){
    this.file = event.target.files[0];   
    if (this.file != undefined) {
      this.upload(); 
    }
  }

  n_idgen_periodo = 0;
  upload(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[1];
      var worksheet = workbook.Sheets[first_sheet_name];
      var request = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      //ENVIAR ---> request
      console.log(request);
      this.validarCamposExcel(request);
      
    }
    fileReader.readAsArrayBuffer(this.file);    
  }

  validarCamposExcel(request:any){
    const estado = (request[0].ESTADO!=null || request[0].ESTADO!=undefined)?true:false;
    const descripcion = (request[0].DESCRIPCION!=null || request[0].DESCRIPCION!=undefined)?true:false;
    if(estado && descripcion){
      for(let r of request){
          if (r.ESTADO == null || r.ESTADO == undefined ) { r.ESTADO = '' }
          if (r.DESCRIPCION == null || r.DESCRIPCION == undefined) { r.DESCRIPCION = '' }
          if (r.TIENDA == null || r.TIENDA == undefined) { r.TIENDA = '' }
      }
      this.agregarOrden(request);
    }else{
      this.openSnackBar('CABECERA ALTERADA: ESTADO | DESCRIPCION | TIENDA',2500);
    }
  }
  

  agregarOrden(request:any){
    let parametro = {
      periodos : request
    }
    this.ordenService.agregarOrden(parametro, this.getToken().token).subscribe((res=>{
      if(res.estado){
        this.listarOrden();
        console.log(res);
        this.error = false;
      }else{
        this.listarOrden();
        console.log(res);
        this.tablaErrores = new MatTableDataSource<any>(res.error);
        this.error = true;
      }
    }));
  }

}
