import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastrarClientePage } from '../pages/cadastrarcliente/cadastrarcliente';

import { LoginService } from '../models/login-service';
import { ClienteService } from '../models/cliente-service';

import { MenuFilterPipe } from '../models/menu-filter.pipe.ts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarClientePage,
    MenuFilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarClientePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginService,
    ClienteService]
})
export class AppModule { }
