import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  //Atributos --------------------------------------------------
  bucketUrl: string = API_CONFIG.bucketUrl;
  categorias: CategoriaDTO[];

  //Construtor ------------------------------------------------
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService) {
  }

  //Métodos auxiliares -------------------------------------------

  //Quando carregar a page ------------
  ionViewDidLoad() {

    this.categoriaService.findAll()
    .subscribe(
      response =>{
        this.categorias = response;
      },
      error => {}
    );

    console.log();
  }

  //Método que chama os produtos desta cat ---
  showProdutos(categoriaID : string){
    this.navCtrl.push('ProdutosPage', {categoriaID: categoriaID});
  }
}
