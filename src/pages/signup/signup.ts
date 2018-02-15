import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  //Construtor ----------------
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  //Submissão do formulário ----
  signupUser(){

    console.log('Enviou o form');
  }

  updateCidades(){
  }
}
