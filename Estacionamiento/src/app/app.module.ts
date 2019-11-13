import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// MDBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IntroComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    InstalacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
