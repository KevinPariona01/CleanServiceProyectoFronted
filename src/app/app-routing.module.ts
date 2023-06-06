import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/seguridad/login/login.component';
import { RolComponent } from './component/seguridad/rol/rol.component';
import { MenuComponent } from './component/general/menu/menu.component';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { DataUsuarioComponent } from './component/seguridad/data-usuario/data-usuario.component';
import { ProductoComponent } from './component/productos/producto/producto.component';
import { ClienteComponent } from './component/clientes/cliente/cliente.component';
import { TiendaComponent } from './component/tiendas/tienda/tienda.component';
import { PeriodoComponent } from './component/periodos/periodo/periodo.component';
import { OrdenComponent } from './component/ordenes/orden/orden.component';
import { PlantillaExcelOrdenComponent } from './component/ordenes/plantilla-excel-orden/plantilla-excel-orden.component';
import { EquipoComponent } from './component/equipos/equipo/equipo.component';
import { MetodologiaComponent } from './component/metodologias/metodologia/metodologia.component';
import { RecomendacionComponent } from './component/recomendaciones/recomendacion/recomendacion.component';
import { ObservacionComponent } from './component/observaciones/observacion/observacion.component';
import { InfestacionComponent } from './component/infestaciones/infestacion/infestacion.component';
import { PersonalComponent } from './component/personales/personal/personal.component';
import { EspecieComponent } from './component/especies/especie/especie.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'rol',component:RolComponent},
  {path:'usuario',component:UsuarioComponent},
  {path:'data_usuario_pro',component:DataUsuarioComponent},
  {path:'producto',component:ProductoComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'plantilla-excel-orden',component:PlantillaExcelOrdenComponent},
  {path:'periodo',component:PeriodoComponent},
  {path:'orden',component:OrdenComponent},
  {path:'equipo',component:EquipoComponent},
  {path:'metodologia',component:MetodologiaComponent},
  {path:'recomendacion',component:RecomendacionComponent},
  {path:'observacion',component:ObservacionComponent},
  {path:'infestacion',component:InfestacionComponent},
  {path:'personal',component:PersonalComponent},
  {path:'especie',component:EspecieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
