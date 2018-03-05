import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  //Atributos ----------------------------------
  produtos : ProdutoDTO[];

  //Construtor ---------------------------------
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  //Quando a página carregar -------------------
  ionViewDidLoad() {
    
    let categoriaID = this.navParams.get('categoriaID');

    this.produtoService.findByCategoria(categoriaID).subscribe(

      response => {

        this.produtos = response['content'];
        this.getSmallImage();
      },
      error => {
      }
    );
  }

  //Buscar imagem -------------------------------
  getSmallImage(){

    for(var i = 0; i < this.produtos.length; i++){

      let item = this.produtos[i];

      this.produtoService.getSmallImageFromBucket(item.id).subscribe(

        response => {

          item.imageUrl = `${API_CONFIG.bucketUrl}/prod${item.id}-small.jpg`;
        },
        error => {
        }
      );
    }
  }

}
