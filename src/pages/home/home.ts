import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../models/login-service';
import { Cliente } from '../../models/cliente';

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
}
