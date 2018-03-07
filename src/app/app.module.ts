import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastrarClientePage } from '../pages/cadastrarcliente/cadastrarcliente';
import { VisualizarClientePage } from '../pages/visualizarcliente/visualizarcliente';
import { AlterarClientePage } from '../pages/alterarcliente/alterarcliente';

import { LoginService } from '../services/login-service';
import { ClienteService } from '../services/cliente-service';

import { MenuFilterPipe } from '../filters/menu-filter.pipe.ts';
import { PaginaEmConstrucaoPage } from '../pages/paginaemconstrucao/paginaemconstrucao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarClientePage,
    MenuFilterPipe,
    VisualizarClientePage,
    AlterarClientePage,
    PaginaEmConstrucaoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarClientePage,
    VisualizarClientePage,
    AlterarClientePage,
    PaginaEmConstrucaoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginService,
    ClienteService]
})
export class AppModule { }
