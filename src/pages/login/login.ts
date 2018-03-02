import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../models/login-service';
import { VisualizarClientePage } from '../visualizarcliente/visualizarcliente';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

// Classe responsável por chamar serviço de login.  
export class LoginPage {

  public email: string;
  public senha: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _service: LoginService) { }

  // Chamado no submit do form. Busca cliente pelo e-mail e senha digitados
  // Exibe um pop-up de erro caso não seja encontrado ou redireciona para dentro do sistema (tela de Visualização de dados)
  public efetuarLogin() {
    // Valida se email e senha foram preenchidos;
    if (!this.email || !this.senha) {
      this._alertCtrl.create({
        subTitle: 'Preencha todos os campos',
        buttons: [{ text: 'Ok' }]
      }).present();

      return;
    }

    // Feedback para usuário saber que está realizando LOGIN
    let loader = this._loadingCtrl.create({
      content: 'Efetuando login...'
    })
    loader.present();

    // Chama o serviço de LOGIN, responsável por fazer um GET e retornar os dados do cliente
    this._service
      .efetuarLogin(this.email, this.senha)
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(VisualizarClientePage)
      })
      .catch(() => {
        loader.dismiss();
        this._alertCtrl.create({
          subTitle: 'Email ou senha inválidos. Por favor, verifique e tente novamente',
          buttons: [{ text: 'Ok' }]
        }).present();
      });

  }

}
