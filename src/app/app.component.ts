import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { CadastrarClientePage } from '../pages/cadastrarcliente/cadastrarcliente';
import { VisualizarClientePage } from '../pages/visualizarcliente/visualizarcliente';

import { LoginService } from '../models/login-service';

@Component({
  templateUrl: 'app.html',
})

export class MyApp {

  // Injeta o NAV presente em app.component.html diretamente na página  
  @ViewChild(Nav) public nav: Nav;

  // Coloca como página raiz a LoginPage.
  rootPage = LoginPage;

  // Array contendo as páginas do menu
  // Cada página deverá conter seu nome, página de destino e se usuário deve ou não estar logado para visualizar o item
  public paginas = [
    { titulo: 'Meus dados', componente: VisualizarClientePage, logado: true },
    { titulo: 'Realizar cadastro', componente: CadastrarClientePage, logado: false },
    { titulo: 'Efetuar login', componente: LoginPage, logado: false },
    { titulo: 'Logoff', logado: true }
  ]

  constructor(platform: Platform, private _service: LoginService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  // Chamado no clique de cada página do menu. Caso não possua página de destino, fará logoff
  public navegarPara(pagina): void {
    if (!pagina.componente) {
      this.efetuarLogoff();
      return;
    }

    this.nav.push(pagina.componente);
  }

  // Limpa o cliente gravado e leva usuário para fora
  private efetuarLogoff() {
    this._service.setClienteLogado(null);
    this.nav.setRoot(LoginPage);
  }
}
