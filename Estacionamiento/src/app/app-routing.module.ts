import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReservarComponent } from './reservar/reservar.component';
import { LoginComponent } from './login/login.component';
import { VisualizarperfilComponent } from './visualizarperfil/visualizarperfil.component'
import { RegistroComponent } from './registro/registro.component'
import { CdarsebajaComponent } from './cdarsebaja/cdarsebaja.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component'

const routes: Routes = [
  { path: '', component: PresentacionComponent},
  { path: 'reservar', component: ReservarComponent},
  { path: 'inicio', component: PresentacionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'perfil', component: VisualizarperfilComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'darsebaja', component: CdarsebajaComponent},
  { path: 'reservaciones', component: ReservacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
