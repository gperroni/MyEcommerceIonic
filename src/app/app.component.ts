import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { CadastrarClientePage } from '../pages/cadastrarcliente/cadastrarcliente';
import { VisualizarClientePage } from '../pages/visualizarcliente/visualizarcliente';
import { HomePage } from '../pages/home/home';
import { PaginaEmConstrucaoPage } from '../pages/paginaemconstrucao/paginaemconstrucao';

import { LoginService } from '../models/login-service';

@Component({
  templateUrl: 'app.html',
})

export class MyApp {

  // Injeta o NAV presente em app.component.html diretamente na página  
  @ViewChild(Nav) public nav: Nav;

  // Coloca como página raiz a LoginPage.
  rootPage = LoginPage;

  /* 
      Array contendo as páginas do menu
      Cada página deverá conter seu nome, página de destino, se será raiz 
      e se usuário deve ou não estar logado para visualizar o item.
      Itens não implementados redirecionam para página de "Em construção"
  */
  public paginas = [
    { titulo: 'Home', componente: HomePage, raiz: true },
    { titulo: 'Realizar Cadastro', componente: CadastrarClientePage, logado: false, raiz: false },
    { titulo: 'Efetuar Login', componente: LoginPage, logado: false, raiz: true },
    { titulo: 'Visualizar Carrinho', componente: PaginaEmConstrucaoPage, raiz: false },
    { titulo: 'Visualizar Pedidos', componente: PaginaEmConstrucaoPage, logado: true, raiz: false },
    { titulo: 'Meus Dados', componente: VisualizarClientePage, logado: true, raiz: true },
    { titulo: 'Logoff', logado: true, raiz: false }
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

    if (pagina.raiz)
      this.nav.setRoot(pagina.componente);
    else
      this.nav.push(pagina.componente);
  }

  // Limpa o cliente gravado e leva usuário para fora
  private efetuarLogoff() {
    this._service.setClienteLogado(null);
    this.nav.setRoot(LoginPage);
  }
}
