import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //Atributos ----------------
  formGroup: FormGroup;


  //Construtor ----------------
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {


      this.formGroup = this.formBuilder.group({

        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(14)]],
        senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],

        tipo: ['', [Validators.required]],

        logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        numero: [null, [Validators.minLength(1), Validators.maxLength(5)]],
        complemento: ['', [Validators.maxLength(60)]],
        bairro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]],
        
        telefone1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
        telefone2: [null, [Validators.minLength(8), Validators.maxLength(14)]]
      });

  }


  //Submissão do formulário ----
  signupUser(){

    console.log('Enviou o form');
  }

  updateCidades(){
  }
}
