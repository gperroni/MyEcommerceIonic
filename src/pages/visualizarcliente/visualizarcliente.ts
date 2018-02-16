import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../models/login-service';
import { ClienteService } from '../../models/cliente-service';
import { Cliente } from '../../models/cliente';
import { AlterarClientePage } from '../alterarcliente/alterarcliente';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-visualizarcliente',
  templateUrl: 'visualizarcliente.html'
})
export class VisualizarClientePage {

  private savedCliente: Cliente;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _serviceLogin: LoginService,
    private _serviceCliente: ClienteService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController) {
    this.savedCliente = _serviceLogin.getUsuarioLogado();
  }

  alterarCadastro() {
    this.navCtrl.push(AlterarClientePage);
  }

  confirmacaoExclusao() {
    this._alertCtrl.create({
      subTitle: `Deseja realmente excluir cadastr?`,
      buttons: [{ text: 'Sim', handler: () => this.excluirCadastro() },
      { text: 'Não' }]
    }).present();
  }

  excluirCadastro() {
    let loader = this._loadingCtrl.create({
      content: 'Excluindo cadastro'
    })
    loader.present();

    this._serviceCliente
      .excluirCliente(this.savedCliente.cpf)
      .then(() => {
        loader.dismiss();
        this._serviceLogin.setUsuarioLogado(null);

        this._alertCtrl.create({
          title: 'Atenção',
          subTitle: "Cliente excluído com sucesso. Você será redirecionado para fora do e-commerce.",
          buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(LoginPage) }]
        }).present()

        return;
      })
      .catch(response => {
        loader.dismiss();
        this._alertCtrl.create({
          title: 'Atenção',
          subTitle: "Erro na exclusão. Por favor, tente novamente",
          buttons: [{ text: 'Ok' }]
        }).present();
        return;
      });
  }
}
