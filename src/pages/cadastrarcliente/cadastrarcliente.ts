import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../models/cliente-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-cadastrarcliente',
  templateUrl: 'cadastrarcliente.html'
})
export class CadastrarClientePage {

  public cliente = new Cliente("", "", "", "", "", "", "", "");

  listaEstados: String[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _service: ClienteService) {
    this.listaEstados = _service.listaEstados;
  }

  realizarCadastro() {
    if (this.cliente.cpf.indexOf('.') >= 0 || this.cliente.cpf.indexOf('-') >= 0) {
      this.createAndShowAlertControl('Atenção', 'CPF deve ser somente números', null);
      return;
    }


    if (!this.dadosValidos()) {
      this.createAndShowAlertControl('Atenção', 'Preencha todos os campos', null);
      return;
    }

    let loader = this._loadingCtrl.create({
      content: 'Criando cadastro'
    })
    loader.present();

    this._service
      .salvarCliente(this.cliente)
      .then(cliente => {
        loader.dismiss();
        this.createAndShowAlertControl('', `Cliente '${cliente.nome}' cadastro com sucesso.`, () => this.navCtrl.setRoot(LoginPage));
      })
      .catch(response => {
        loader.dismiss();
        this.createAndShowAlertControl('Atenção', response.json().Message, null);
      });
  }

  dadosValidos() {
    return this.cliente.nome.trim() && this.cliente.cpf.trim() && this.cliente.endereco.trim() &&
      this.cliente.estado.trim() && this.cliente.municipio.trim() && this.cliente.telefone.trim() &&
      this.cliente.email.trim() && this.cliente.senha.trim();
  }

  createAndShowAlertControl(title, subTitle, handler) {
    this._alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'Ok', handler: handler }]
    }).present();
  }
}
