import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {


  produtos : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

  ionViewWillEnter(){
   
    this.produtos = [
      {
        id : '1',
        nome : 'Mouse',
        preco : 80.50

      },
      {
        id : '2',
        nome : 'Teclado',
        preco : 120.00
      }
    ]

  }
}
