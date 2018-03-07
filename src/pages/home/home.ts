import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../services/login-service';
import { Cliente } from '../../viewmodels/cliente';
import { PaginaEmConstrucaoPage } from '../paginaemconstrucao/paginaemconstrucao';

// Página home do sistema. Poderá ser utilizada para buscas de produtos. 
// Por enquanto, o clique no ícone apenas levará para a página padrão de "Em construção"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public cliente : Cliente;

  constructor(public navCtrl: NavController,
    private _service: LoginService) {
      this.cliente = _service.getClienteLogado();
  } 

  public buscarProduto(){
      this.navCtrl.push(PaginaEmConstrucaoPage);
  }
}
