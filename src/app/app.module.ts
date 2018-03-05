import { ProdutoService } from './../services/domain/produto.service';
import { AuthInterceptorProvider } from './../interceptors/authInterceptor';
import { ClienteService } from './../services/domain/cliente.service';
import { AuthService } from './../services/auth.service';
import { StorageService } from './../services/storage.service';
import { ErrorInterceptorProvider } from './../interceptors/erroInterceptor';
import { CategoriaService } from './../services/domain/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [ //Componentes(component.ts) ou modulos - Paginas que carregam ao iniciar o app
    MyApp
  ],
  imports: [ //modulos
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [ //Incluir arquivos de única instância
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService
  ]
})
export class AppModule {}
