import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// MDBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IntroComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    InstalacionesComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
