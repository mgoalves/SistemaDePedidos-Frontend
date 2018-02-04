import { CredeciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Atributos ---------------------------------
  credenciais : CredeciaisDTO = {

    email: "",
    password: ""
  };

  //Construtor ------------------------------------------------------------
  constructor(public navCtrl: NavController, public menu: MenuController) {
  }


  // Métodos auxiliares ---------------------------------------------------

  // Quando for entrar na página ----
  ionViewWillEnter(){

    this.menu.swipeEnable(false);
  }

  // Quando sair da página ----------
  ionViewDidLeave(){

    this.menu.swipeEnable(true);
  }

  // Método de login - BTN Entrar ---
  public login(){

    console.log(this.credenciais);

    this.navCtrl.setRoot('CategoriasPage');
  }
}
