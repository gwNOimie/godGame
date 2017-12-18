import { PixiService } from './services/pixi/pixi.service';
import { RoutingModule } from './modules/routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PixiComponent } from './components/pixi/pixi.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PixiComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [
    PixiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
