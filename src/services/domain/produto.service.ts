import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){
    }

    //retorna a lista de produtos pelo ID da categoria -----------------------------------
    public findByCategoria(categoriaID : string){

        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaID}`);
    }

    //Buscar imagem pequena do produto na S3  --------------------------------------------
    getSmallImageFromBucket(id : string) : Observable<any>{

        let url = `${API_CONFIG.bucketUrl}/prod${id}-small.jpg`;

        return this.http.get(
            url, 
            {responseType : 'blob'}
        );
    }
}