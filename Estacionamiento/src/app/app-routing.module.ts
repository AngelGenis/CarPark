import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReservarComponent } from './reservar/reservar.component';
import { LoginComponent } from './login/login.component';
import { VisualizarperfilComponent } from './visualizarperfil/visualizarperfil.component'
import { RegistroComponent } from './registro/registro.component'
import { CdarsebajaComponent } from './cdarsebaja/cdarsebaja.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component'
import { TransicionlogComponent } from './transicionlog/transicionlog.component';
import { HistorialComponent } from './historial/historial.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {GananciasComponent} from './ganancias/ganancias.component';
const routes: Routes = [
  { path: '', component: PresentacionComponent},
  { path: 'reservar', component: ReservarComponent},
  { path: 'inicio', component: PresentacionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'perfil', component: VisualizarperfilComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'darsebaja', component: CdarsebajaComponent},
  { path: 'reservaciones', component: ReservacionesComponent},
  { path: 'transicionlog/:operacion', component:TransicionlogComponent},
  { path: 'historial', component:HistorialComponent},
  { path: 'adminlogin', component:AdminloginComponent},
  { path: 'ganancias', component:GananciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
