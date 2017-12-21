import { PhaserService } from './services/phaser/phaser.service';
import { RoutingModule } from './modules/routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [
    PhaserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
