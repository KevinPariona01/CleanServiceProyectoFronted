import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { OrdenService } from 'src/app/service/orden.service';
import { PeriodoService } from 'src/app/service/periodo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  periodosActivos:any = [];
  n_idgen_periodo = 0;
  error:boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    public override router: Router, 
    public override snackBar: MatSnackBar,
    private ordenService: OrdenService,
    private periodoService: PeriodoService 
  ) {
    super(snackBar,router);
  }

  override ngOnInit(): void {
    this.listarOrden();
    this.listarPeriodoActivos();
  }

  listarOrden(){
    let parametro = {
      n_idgen_periodo: this.n_idgen_periodo
    }
    this.ordenService.listarOrden(parametro, this.getToken().token).subscribe((res)=>{
      if(res.estado){
          this.tablaOrdenes = new MatTableDataSource<any>(res.data);
          this.tablaOrdenes.sort = this.sort;
          this.tablaOrdenes.paginator = this.paginator;
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
    });
  }

  listarPeriodoActivos(){
    this.periodoService.listarPeriodoActivos({}, this.getToken().token).subscribe((res)=>{
      if(res.estado){
          this.periodosActivos = res.data;
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

  cerrar_error(event:any){
    let contenedor: HTMLElement|null = document.getElementById('mat-cont-error');
    this.error = false;
  }

  selectPeriodo(data: any){
    console.log("DATA: ", data);
    this.n_idgen_periodo = data;
    this.listarOrden();
  }

  file:any;
  arrayBuffer:any
  importar(event:any){
    this.file = event.target.files[0];   
    if (this.file != undefined) {
      this.upload(); 
    }
  }


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
    console.log("REQUEST: ", request );
    if(request.length==0){
      this.openSnackBar("El excel esta vacio", 2500);
      return;
    }
    const estado = Object.keys(request[0]).includes("ESTADO") ?true:false;
    const descripcion = Object.keys(request[0]).includes("DESCRIPCION")?true:false;
    const tienda = Object.keys(request[0]).includes("TIENDA")?true:false;
    if(estado && descripcion && tienda){
      for(let r of request){
          if (r.ESTADO == null || r.ESTADO == undefined ) { r.ESTADO = '' }
          if (r.DESCRIPCION == null || r.DESCRIPCION == undefined) { r.DESCRIPCION = '' }
          if (r.TIENDA == null || r.TIENDA == undefined) { r.TIENDA = '' }
      }
      this.agregarOrden(request);
    }else{
      this.openSnackBar('CABECERA ALTERADA: ESTADO | DESCRIPCION | TIENDA \n O NO HAY INFORMACIÓN EN LOS CAMPOS',3500);
    }
  }
  

  agregarOrden(request:any){
    let parametro = {
      periodos : request,
      n_idgen_periodo : this.n_idgen_periodo,
      usuario: this.getUser().data.n_idseg_userprofile
    }
    console.log("Prametro: ", parametro);
    
    this.ordenService.agregarOrden(parametro, this.getToken().token).subscribe((res=>{
      if(res.estado){
        if(res.error_func){
          console.log(res);
          this.tablaErrores = new MatTableDataSource<any>(res.data);
          this.error = true;
        }else{
          this.error = false;
          this.openSnackBar("Se realizó la importación correctamente", 2500);
        }  
      }else{
        console.log(res);
        this.tablaErrores = new MatTableDataSource<any>(res.error);
        this.error = true;
      }
      this.listarOrden();
    }));
  }

  exportarPlantillaExcel(){
    this.router.navigate(['/plantilla-excel-orden']);
  }

}
