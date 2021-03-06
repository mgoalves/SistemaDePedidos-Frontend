import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage : StorageService
        ){
    }


    // Buscar por email o clienteDTO - GET 
    findByEmail(email : string) : Observable<ClienteDTO> {

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`
        );
    }

    // Busca imagem do bucket AWS - GET
    getImageFromBucket(id : string) : Observable<any> {

        let url = `${API_CONFIG.bucketUrl}/${id}cli.jpg`;

        return this.http.get(
            url, 
            {responseType : 'blob'}
        );
    }

    // Salva novo cliente - POST
    save(cliente : ClienteDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            cliente,
                {
                    observe : 'response',
                    responseType : 'text' //Como retorna corpo vazio - Evitar erro de parse JSON
                }
        );
    }
}