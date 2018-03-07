import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../services/login-service';
import { ClienteService } from '../../services/cliente-service';
import { Cliente } from '../../viewmodels/cliente';
import { AlterarClientePage } from '../alterarcliente/alterarcliente';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-visualizarcliente',
  templateUrl: 'visualizarcliente.html'
})
// Responsável por exibir dados do cliente logado, assim como redirecionar para 
// página de alteração e chamar serviço de exclusão
export class VisualizarClientePage {

  private savedCliente: Cliente;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _serviceLogin: LoginService,
    private _serviceCliente: ClienteService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController) {
    // Busca dados do cliente logado e armazenado anteriormente pela classe login-service para exibição na tela
    this.savedCliente = _serviceLogin.getClienteLogado();
  }

  // Redireciona para tela de alteração
  public alterarCadastro() {
    this.navCtrl.push(AlterarClientePage);
  }

  // Exibe popup de confirmação de exclusão. Caso usuário clique em SIM, chama o método para 
  // efetivar a exclusão; caso clique em NÃO, popup some 
  public confirmacaoExclusao() {
    this._alertCtrl.create({
      subTitle: `Deseja realmente excluir cadastro?`,
      buttons: [{ text: 'Sim', handler: () => this.excluirCadastro() },
      { text: 'Não' }]
    }).present();
  }

  // Método chamado ao se clicar em SIM no popup de confirmação de exclusão.
  // Chama o serviço de cliente responsável por efetuar a exclusão e exibe uma mensagem de confirmação ou erro dependendo do retorno da API
  // Redireciona para fora do sistema caso exclusão seja confirmada, limpando os dados armazenados do cliente localmente
  public excluirCadastro() {
    // Feedback para usuário indicando que a exclusão esteja sendo
    let loader = this._loadingCtrl.create({
      content: 'Excluindo cadastro'
    })
    loader.present();

    // Chamada do serviço de exclusão 
    this._serviceCliente
      .excluirCliente(this.savedCliente.cpf)
      .then(() => {
        loader.dismiss();
        this._serviceLogin.setClienteLogado(null);

        // Exibe confirmação de exclusão e redireciona usuário para fora do ecommerce ao clicar em OK
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
          subTitle: response.json().Message,
          buttons: [{ text: 'Ok' }]
        }).present();
        return;
      });
  }
}
