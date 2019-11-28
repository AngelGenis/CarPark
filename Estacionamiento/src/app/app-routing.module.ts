import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReservarComponent } from './reservar/reservar.component';


const routes: Routes = [
  { path: '', component: PresentacionComponent},
  { path: 'reservar', component: ReservarComponent},
  { path: 'inicio', component: PresentacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
