import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

 

    //Construtor -----------------------------------
    constructor(public storage: StorageService, public alertCtrl: AlertController){
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

                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break; 

                default:
                this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    //Métodos auxiliares ------------------------------------

    //Trata erros 403 - Limpa localStorage
    handle403(){

        this.storage.setLocalUser(null);
    }

    //Trata erros 401 - Exibe alerta com falha na autenticação -
    handle401(){

        let alert = this.alertCtrl.create({
            title: 'Falha ao autenticar',
            message: 'Email ou senha inválidos',
            enableBackdropDismiss: true,
            buttons: [ //Array de buttons
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    //Trata erros que não foram validados ---------------------
    handleDefaultError(errorObj: any){

        let alert = this.alertCtrl.create({
            title: errorObj.status + ': '+ errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: true,
            buttons: [ //Array de buttons
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }
}

//Provider para a classe acima ------------------------------
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};