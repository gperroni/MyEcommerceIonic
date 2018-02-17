import { Pipe, PipeTransform } from '@angular/core';

import { LoginService } from '../models/login-service';

@Pipe({
  name: 'menufilter',
  pure: false
})
export class MenuFilterPipe implements PipeTransform {

  transform(items: any[], teste: boolean): any {
    if (!items) {
      return items;
    }

    var usuarioLogado = this._service.getUsuarioLogado() != null;

    return usuarioLogado
      ? items.filter(item => item.logado == true || item.logado == null)
      : items.filter(item => item.logado == false || item.logado == null);
  }

  constructor(private _service: LoginService) {
  }
}