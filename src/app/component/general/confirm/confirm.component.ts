import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  titulo = "";
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit() {
    this.titulo = this.data.titulo;
    
  }

  confirmar(){
    this.dialogRef.close(true);
  }
  
  cancelar(){
    this.dialogRef.close(false);
  }

}
