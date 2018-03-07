import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Cliente } from '../../viewmodels/cliente';
import { ClienteService } from '../../services/cliente-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-cadastrarcliente',
  templateUrl: 'cadastrarcliente.html'
})

// Classe responsável por chamar serviço de cadastro e validar dados colocados no formulário 
export class CadastrarClientePage {

  // Cliente nasce com seus atributos em branco, por ser cadastro
  public cliente = new Cliente("", "", "", "", "", "", "", "");

  // Receberá a lista de estados definidas em cliente-service.ts
  public listaEstados: String[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _service: ClienteService) {
    // Preenche a lista de estados definidas em cliente-service.ts
    this.listaEstados = _service.listaEstados;
  }

  // Chamado no submit do form. Valida os dados do cliente e realiza o cadsatro.
  // Exibe um pop-up de erro ou sucesso de acordo com o retorno da API.
  public realizarCadastro() {

    // Valida o formato do CPF
    if (this.cliente.cpf.indexOf('.') >= 0 || this.cliente.cpf.indexOf('-') >= 0) {
      this.createAndShowAlertControl('Atenção', 'CPF deve ser somente números', null);
      return;
    }

    // Valida se todos os dados foram preenchidos
    if (!this.dadosValidos()) {
      this.createAndShowAlertControl('Atenção', 'Preencha todos os campos', null);
      return;
    }

    // Feedback para usuário saber que seu cadastro está sendo realizado
    let loader = this._loadingCtrl.create({
      content: 'Criando cadastro'
    })
    loader.present();

    // Chamada do serviço de cliente responsável por efetuar um POST na API e criar o CLIENTE.
    // Retorna um popup de sucesso ou de erro conforme o retorno da API
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

  // Retorna True ou False indicando se todos os dados do cliente foram preenchidoss
  private dadosValidos() {
    return this.cliente.nome.trim() && this.cliente.cpf.trim() && this.cliente.endereco.trim() &&
      this.cliente.estado.trim() && this.cliente.municipio.trim() && this.cliente.telefone.trim() &&
      this.cliente.email.trim() && this.cliente.senha.trim();
  }

  // Método auxiliar para criação do popup. Recebe uma função HANDLER que será chamada ao se 
  // clicar no botão OK
  private createAndShowAlertControl(title, subTitle, handler) {
    this._alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'Ok', handler: handler }]
    }).present();
  }
}
