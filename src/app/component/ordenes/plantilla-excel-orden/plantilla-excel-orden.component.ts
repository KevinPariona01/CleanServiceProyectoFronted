import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/service/tienda.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-plantilla-excel-orden',
  templateUrl: './plantilla-excel-orden.component.html',
  styleUrls: ['./plantilla-excel-orden.component.css']
})
export class PlantillaExcelOrdenComponent extends BaseComponent implements OnInit {
  
  tablaTiendas:any = [];

  constructor(
    public override snackBar: MatSnackBar,
    public override router: Router,
    private tiendaService : TiendaService,
    
  ) {
    super(snackBar, router);
  }

  override ngOnInit() {
    this.listarTienda();
  }

  listarTienda(){
    this.tiendaService.listarTienda({},this.getToken().token)
    .subscribe((res=>{
      if(res.estado){
        this.tablaTiendas = res.data;
        console.log("DATA DE TIENDAS: ", this.tablaTiendas);
        
        this.download();
      }else{
        this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }
      
    }));
  }

  setdatogeneral(worksheet:any, cell:any, value:any, fontsize:any, bolt:any, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
  }

  download(){
    console.log("Data: ", this.tablaTiendas);
    this.downloadPlantillaLinea(this.tablaTiendas);
  }
  downloadPlantillaLinea(data: any[]): void{        

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('TIENDAS');

    let row = 1;

    worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'A' + row, 'CODIDO', 10, true, '002060');
    worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DIRECCION', 10, true, '002060');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('B' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    data.forEach(element => {
      
      row += 1;
      worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'A' + row, element.c_codigo , 10, false);
      worksheet.getCell('A' + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'B' + row, element.c_direccion , 10, false);
      worksheet.getCell('B' + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      worksheet.getColumn(1).width = 40;
      worksheet.getColumn(2).width = 40;
    });

      //SEGUNDA HOJA
      let ordenes =  workbook.addWorksheet('ORDENES');

      row = 1;

      ordenes.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(ordenes, 'A' + row, 'ESTADO', 10, true, '002060');
      ordenes.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

      
      ordenes.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(ordenes, 'B' + row, 'DESCRIPCION', 10, true, '002060');
      ordenes.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      ordenes.getCell('B' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      ordenes.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(ordenes, 'C' + row, 'TIENDA', 10, true, '002060');
      ordenes.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      ordenes.getCell('C' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      ordenes.getColumn(1).width = 40;
      ordenes.getColumn(2).width = 40;
      ordenes.getColumn(3).width = 40;


      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'plantilla_orden.xlsx');
      });
  
      this.router.navigate(["/orden"]);

  }
}
