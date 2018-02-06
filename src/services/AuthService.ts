import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredeciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(public httpClient: HttpClient){
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

}