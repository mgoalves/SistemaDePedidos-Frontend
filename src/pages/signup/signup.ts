import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto.';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];


  //Construtor ----------------
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {


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


  //Atualiza cidade após estado escolhido --
  updateCidades(){

    let estadoId = this.formGroup.value.estadoId;

    this.cidadeService.findAll(estadoId)
      .subscribe(
        response => {

          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
        },
        error => {

        }
      )
  }

  //Quando carregar a página -------
  ionViewDidLoad(){
   
    this.estadoService.findAll()
      .subscribe(
        response => {

            this.estados = response;
            this.formGroup.controls.estadoId.setValue(this.estados[0].id);
            this.updateCidades();

          },
          error => {
          }
      )
  }
}
