import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Cliente } from '../../models/cliente';
import { LoginService } from '../../models/login-service';
import { ClienteService } from '../../models/cliente-service';
import { VisualizarClientePage } from '../visualizarcliente/visualizarcliente';


@Component({
  selector: 'page-alterarcliente',
  templateUrl: 'alterarcliente.html'
})
export class AlterarClientePage {

  public cliente: Cliente;

  listaEstados: String[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loginService: LoginService,
    private _loadingCtrl: LoadingController,
    private _clienteService: ClienteService) {

    var savedCliente = _loginService.getUsuarioLogado();
    this.cliente = new Cliente(savedCliente.nome, savedCliente.cpf, savedCliente.endereco,
      savedCliente.municipio, savedCliente.estado, savedCliente.telefone, savedCliente.email, savedCliente.senha);
    this.listaEstados = _clienteService.listaEstados;
  }

  alterarCadastro() {
    if (!this.dadosValidos()) {
      this.createAndShowAlertControl('Atenção', 'Preencha todos os campos', null);
      return;
    }

    let loader = this._loadingCtrl.create({
      content: 'Salvando alterações'
    })
    loader.present();

    this._clienteService
      .alterarCliente(this.cliente)
      .then(savedCliente => {
        loader.dismiss();
        this._loginService.setUsuarioLogado(savedCliente);

        this.createAndShowAlertControl('', `Cliente '${savedCliente.nome}' alterado com sucesso`, 
          () => this.navCtrl.setRoot(VisualizarClientePage));
      })
      .catch(response => {
        loader.dismiss();
        this.createAndShowAlertControl('Atenção', response.json(), null);
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
