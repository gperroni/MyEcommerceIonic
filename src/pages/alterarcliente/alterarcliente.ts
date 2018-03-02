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

// Classe responsável por chamar serviço de alteração e validar dados colocados no formulário 
export class AlterarClientePage {

  public cliente: Cliente;

  // Receberá a lista de estados definidas em cliente-service.ts
  listaEstados: String[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loginService: LoginService,
    private _loadingCtrl: LoadingController,
    private _clienteService: ClienteService) {

    // Busca dados do cliente logado e armazenado anteriormente pela classe login-service 
    // para preenchimento do formulário de alteração
    var savedCliente = _loginService.getClienteLogado();

    // Cria uma nova instância de cliente com os dados buscados
    this.cliente = new Cliente(savedCliente.nome, savedCliente.cpf, savedCliente.endereco,
      savedCliente.municipio, savedCliente.estado, savedCliente.telefone, savedCliente.email, savedCliente.senha);
    
      this.listaEstados = _clienteService.listaEstados;
  }

  // Chamado no submit do form. Valida os dados do cliente e realiza o cadsatro.
  // Exibe um pop-up de erro ou sucesso de acordo com o retorno da API.
  public alterarCadastro() {

    // Valida se todos os dados foram preenchidos
    if (!this.dadosValidos()) {
      this.createAndShowAlertControl('Atenção', 'Preencha todos os campos', null);
      return;
    }

    // Feedback para usuário saber que alteração está sendo realizada
    let loader = this._loadingCtrl.create({
      content: 'Salvando alterações'
    })
    loader.present();

    // Chamada do serviço de cliente responsável por efetuar um PUT na API e alterar o CLIENTE.
    // Retorna um popup de sucesso ou de erro conforme o retorno da API
    this._clienteService
      .alterarCliente(this.cliente)
      .then(savedCliente => {
        loader.dismiss();
        this._loginService.setClienteLogado(savedCliente);

        this.createAndShowAlertControl('', `Cliente '${savedCliente.nome}' alterado com sucesso`,
          () => this.navCtrl.setRoot(VisualizarClientePage));
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
