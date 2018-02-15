import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Cliente } from '../../models/cliente';
import { Http } from '@angular/http';
import { ClienteService } from '../../models/cliente-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-cadastrarcliente',
  templateUrl: 'cadastrarcliente.html'
})
export class CadastrarClientePage {

  public listaEstados = [
    'SP',
    'MG',
  ]

  public cliente = new Cliente("", "", "", "", "", "", "", "");

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _http: Http,
    private _service: ClienteService) { }

  realizarCadastro() {
    if (!this.dadosValidos()) {
      this._alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Preencha todos os campos',
        buttons: [{ text: 'Ok' }]
      }).present();
      return;
    }

    this._service
      .salvarCliente(this.cliente)
      .then(cliente => {
        this._alertCtrl.create({
          subTitle: `Cliente ${cliente.nome} cadastro com sucesso`,
          buttons: [{ text: 'Ok' }]
        }).present();
        
        return;
      })
      .catch(response => {
        this._alertCtrl.create({
          title: 'Atenção',
          subTitle: response.json(),
          buttons: [{ text: 'Ok' }]
        }).present();
        return;
      });

  }

  dadosValidos() {
    return this.cliente.nome.trim() && this.cliente.cpf.trim() && this.cliente.endereco.trim() &&
      this.cliente.estado.trim() && this.cliente.municipio.trim() && this.cliente.telefone.trim() &&
      this.cliente.email.trim() && this.cliente.senha.trim();
  }
}
