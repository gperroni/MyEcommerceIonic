import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Cadastrarcliente page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastrarcliente',
  templateUrl: 'cadastrarcliente.html'
})
export class CadastrarClientePage {

  public listaEstados = [
    'SP',
    'MG',
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

}
