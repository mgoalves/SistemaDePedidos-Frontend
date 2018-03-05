import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {


  //Atributos ----------------------------------------
  produto: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  //Qunado a página carregar --------------------------
  ionViewDidLoad() {
    
    let produtoID = this.navParams.get('produtoID');

    this.produtoService.findById(produtoID).subscribe(

      response => {

        this.produto = response;
        this.getImage();
      },
      error => {

      }
    );
  }

  //Busca a imagem ------------------------------------
  getImage(){
    
    this.produtoService.getImageFromBucket(this.produto.id).subscribe(

        response => {

          this.produto.imageUrl = `${API_CONFIG.bucketUrl}/prod${this.produto.id}.jpg`;
        },
        error => {
        }
      );
  }

}
