import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { CadastrarClientePage } from '../pages/cadastrarcliente/cadastrarcliente';

import { LoginService } from '../models/login-service';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  // Injeta o NAV presente em app.component.html diretamente na página  
  @ViewChild(Nav) public nav: Nav;

  rootPage = LoginPage;

  public paginas = [
    { titulo: 'Logado', componente: CadastrarClientePage, logado: true },
    { titulo: 'Realizar cadastro', componente: CadastrarClientePage, logado: false },
    { titulo: 'Ambos', componente: CadastrarClientePage }
  ]

  constructor(platform: Platform,
    private _service: LoginService) {
      platform.ready().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();

    });

    //  this.usuarioLogado = _service.getUsuarioLogado() != null;
  }

  navegarPara(pagina): void {
    this.nav.push(pagina.componente);
  }
}
