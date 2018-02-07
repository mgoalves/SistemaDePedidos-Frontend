import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { API_CONFIG } from '../config/api.config';

/**
 * @author ALVES
 * 
 * Classe responsável por fazer a interceptação das requisições e adicionar
 * o token nos headers das requisições.
 */


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // Construtor -------------------------------------------
    constructor(public storage: StorageService){
    }


    // Métodos ----------------------------------------------
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let localUser = this.storage.getLocalUser();

        let tam = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, tam) == API_CONFIG.baseUrl;

        if (localUser && requestToApi) {

            const authReq = req.clone(
                {headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)}
            );
            return next.handle(authReq);

        } else {

            return next.handle(req);
        }
    }
}


// Especificações do framework --------------------------------
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};