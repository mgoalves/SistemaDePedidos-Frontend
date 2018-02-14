import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    //Construtor -----------------------------------
    constructor(public storage: StorageService){
    }


    //Método principal - Interceptor ----------------
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            // Tratar erros de códigos especificos
            switch(errorObj.status){

                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    //Métodos auxiliares ------------------------------------

    //Trata erros 403 - Limpa localStorage
    handle403(){

        this.storage.setLocalUser(null);
    }
}

//Provider para a classe acima ------------------------------
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};