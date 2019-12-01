import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { bcrypt } from 'bcrypt';
import { HttpClientModule } from '@angular/common/http';


 

import {  ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// MDBootstrap

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { RegistroComponent } from './registro/registro.component';
import { PreciosComponent } from './precios/precios.component';
import { ReservarComponent } from './reservar/reservar.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { VisualizarperfilComponent } from './visualizarperfil/visualizarperfil.component';
import { FirestoreService } from './services/firestore.service';
import { CdarsebajaComponent } from './cdarsebaja/cdarsebaja.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { ElevadorComponent } from './elevador/elevador.component';
import { TransicionlogComponent } from './transicionlog/transicionlog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IntroComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    InstalacionesComponent,
    RegistroComponent,
    PreciosComponent,
    ReservarComponent,
    PresentacionComponent,
    VisualizarperfilComponent,
    CdarsebajaComponent,
    ReservacionesComponent,
    ElevadorComponent,
    TransicionlogComponent
    // bcrypt
  ],
  imports: [
    CommonModule,
    // bcrypt,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
