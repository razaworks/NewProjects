import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './common/services/storage.service';
import { ConnectivityService } from './common/services/connectivityCheck.service';
//import { HttpModule } from '@angular/http';

import { CommonService } from './common/services/common.service';
import { IonicStorageModule } from '@ionic/storage';
import { Globals } from './globals';
import { HeaderModule } from './components/header/header.module';
import { MessageService } from './common/services/msg-service.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './common/services/http/http.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    // HeaderModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    ConnectivityService,
    CommonService,
    Globals,
    MessageService,
    HttpService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ResponseInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
