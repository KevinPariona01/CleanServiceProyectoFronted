import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/seguridad/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

//MATERIAL
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs'
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';

//COMPONENTS

import { BaseComponent } from './component/base/base.component';
import { SnackComponent } from './component/generico/snack/snack.component';
import { RolComponent } from './component/seguridad/rol/rol.component';
import { ConfirmComponent } from './component/general/confirm/confirm.component';
import { RolEditarComponent } from './component/seguridad/rol-editar/rol-editar.component';
import { RolPermisosComponent } from './component/seguridad/rol-permisos/rol-permisos.component';
import { MenuComponent } from './component/general/menu/menu.component';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { UsuarioEditarComponent } from './component/seguridad/usuario-editar/usuario-editar.component';
import { ResetearClaveComponent } from './component/generico/resetear-clave/resetear-clave.component';
import { DataUsuarioComponent } from './component/seguridad/data-usuario/data-usuario.component';
import { ProductoComponent } from './component/productos/producto/producto.component';
import { ProductoEditarComponent } from './component/productos/producto-editar/producto-editar.component';
import { ClienteComponent } from './component/clientes/cliente/cliente.component';
import { ClienteEditarComponent } from './component/clientes/cliente-editar/cliente-editar.component';
import { TiendaComponent } from './component/tiendas/tienda/tienda.component';
import { TiendaEditarComponent } from './component/tiendas/tienda-editar/tienda-editar.component';
import { PeriodoComponent } from './component/periodos/periodo/periodo.component';
import { PeriodoEditarComponent } from './component/periodos/periodo-editar/periodo-editar.component';
import { OrdenComponent } from './component/ordenes/orden/orden.component';
import { PlantillaExcelOrdenComponent } from './component/ordenes/plantilla-excel-orden/plantilla-excel-orden.component';
import { EquipoComponent } from './component/equipos/equipo/equipo.component';
import { EquipoEditarComponent } from './component/equipos/equipo-editar/equipo-editar.component';
import { MetodologiaComponent } from './component/metodologias/metodologia/metodologia.component';
import { MetodologiaEditarComponent } from './component/metodologias/metodologia-editar/metodologia-editar.component';
import { RecomendacionComponent } from './component/recomendaciones/recomendacion/recomendacion.component';
import { RecomendacionEditarComponent } from './component/recomendaciones/recomendacion-editar/recomendacion-editar.component';
import { ObservacionComponent } from './component/observaciones/observacion/observacion.component';
import { ObservacionEditarComponent } from './component/observaciones/observacion-editar/observacion-editar.component';
import { InfestacionComponent } from './component/infestaciones/infestacion/infestacion.component';
import { InfestacionEditarComponent } from './component/infestaciones/infestacion-editar/infestacion-editar.component';
import { PersonalComponent } from './component/personales/personal/personal.component';
import { PersonalEditarComponent } from './component/personales/personal-editar/personal-editar.component';
import { EspecieComponent } from './component/especies/especie/especie.component';
import { EspecieEditarComponent } from './component/especies/especie-editar/especie-editar.component';
import { DosificacionComponent } from './component/dosificaciones/dosificacion/dosificacion.component';
import { DosificacionEditarComponent } from './component/dosificaciones/dosificacion-editar/dosificacion-editar.component';
import { IncidenteComponent } from './component/incidentes/incidente/incidente.component';
import { IncidenteEditarComponent } from './component/incidentes/incidente-editar/incidente-editar.component';
import { InicioComponent } from './component/general/inicio/inicio.component';
import { OrdenAsignarComponent } from './component/ordenes/orden-asignar/orden-asignar.component';
import { OrdenUsuarioAsignarComponent } from './component/ordenes/orden-usuario-asignar/orden-usuario-asignar.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    SnackComponent,
    RolComponent,
    ConfirmComponent,
    RolEditarComponent,
    RolPermisosComponent,
    MenuComponent,
    UsuarioComponent,
    UsuarioEditarComponent,
    ResetearClaveComponent,
    DataUsuarioComponent,
    ProductoComponent,
    ProductoEditarComponent,
    ClienteComponent,
    ClienteEditarComponent,
    TiendaComponent,
    TiendaEditarComponent,
    PeriodoComponent,
    PeriodoEditarComponent,
    OrdenComponent,
    PlantillaExcelOrdenComponent,
    EquipoComponent,
    EquipoEditarComponent,
    MetodologiaComponent,
    MetodologiaEditarComponent,
    RecomendacionComponent,
    RecomendacionEditarComponent,
    ObservacionComponent,
    ObservacionEditarComponent,
    InfestacionComponent,
    InfestacionEditarComponent,
    PersonalComponent,
    PersonalEditarComponent,
    EspecieComponent,
    EspecieEditarComponent,
    DosificacionComponent,
    DosificacionEditarComponent,
    IncidenteComponent,
    IncidenteEditarComponent,
    InicioComponent,
    OrdenAsignarComponent,
    OrdenUsuarioAsignarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatCheckboxModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
