import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../../models/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public email: string;
  public senha: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _service: LoginService) {}

  efetuarLogin(){

    // Valida se email e senha foram preenchidos;
    if (!this.email || !this.senha){
      this._alertCtrl.create({
        subTitle: 'Preencha todos os campos',
        buttons: [{ text: 'Ok'}]
      }).present();

      return;
    }

    this._service
    .efetuarLogin(this.email, this.senha)
    .then(cliente => {
        this.navCtrl.setRoot(HomePage)
    })
    .catch(() => {
      this._alertCtrl.create({
        subTitle: 'Email ou senha inválidos. Por favor, verifique e tente novamente',
        buttons: [{ text: 'Ok'}]
      }).present();
    });
  }

}
