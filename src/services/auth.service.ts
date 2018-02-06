import { LocalUser } from './../models/localuser';
import { StorageService } from './storage.service';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredeciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(public httpClient: HttpClient, public storage: StorageService){
    }


    authenticate(credenciais : CredeciaisDTO) {

        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/login`, 
            credenciais,
            {
                observe : 'response',
                responseType : 'text' //Como retorna corpo vazio - Evitar erro de parse JSON
            }
        );
    }

    sucessfulLogin(headerAuthorization : string) {

        let tokenSub = headerAuthorization.substring(7);
        let user : LocalUser = {

            token : tokenSub
        };

        this.storage.setLocalUser(user);
    }

    logout() {

        this.storage.setLocalUser(null);
    }
}