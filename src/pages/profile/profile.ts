import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../../services/storage.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;


  // Construtor ----------------------------------------
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: StorageService,
      public clienteService: ClienteService
    ) {
  }

  // Métodos --------------------------------------------

  //Inicialização da página ----------------------------
  ionViewDidLoad() {
    
    let localUSer = this.storage.getLocalUser();

    if(localUSer && localUSer.email){

      this.clienteService.findByEmail(localUSer.email)
        .subscribe(
          response => {

            this.cliente = response;
            this.getImage();
          },
          error => {
          }
        );
    }
  }

  // Buscar imagem no bucket
  getImage() {

    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(
        response => {
          console.log(this.cliente.id);
          this.cliente.imageUrl = `${API_CONFIG.bucketUrl}/${this.cliente.id}cli.jpg`
        },
        error => {
        }
      );
  }

}
