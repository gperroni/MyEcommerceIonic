import { Pipe, PipeTransform } from '@angular/core';

import { LoginService } from '../services/login-service';

@Pipe({
  name: 'menufilter',
  pure: false
})

/* 
  Classe responsável por fazer um filtro nos itens do menu.
  Retorna os itens conforme situação do CLIENTE: caso não esteja logado, 
  visualizará aqueles itens que não exijam usuário logado; caso esteja logado,
  apenas os itens que exijam usuário logado. Pode, ainda, haver o caso de itens que
  possam ser exibidos tanto para usuário logado como não logado
*/
export class MenuFilterPipe implements PipeTransform {

  // Recebe os itens do menu como parâmetro e realiza o filtro
  transform(items: any[]): any {
    if (!items) {
      return items;
    }

    var clienteLogado = this._service.getClienteLogado() != null;

    return clienteLogado
      ? items.filter(item => item.logado == true || item.logado == null)
      : items.filter(item => item.logado == false || item.logado == null);
  }

  constructor(private _service: LoginService) {
  }
}