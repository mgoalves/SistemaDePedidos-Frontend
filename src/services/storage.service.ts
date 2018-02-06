import { STORAGE_KEYS } from './../config/storageKeys.config';
import { LocalUser } from './../models/localuser';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {


    // Método que retorna usuário logado SE o mesmo existir
    getLocalUser() : LocalUser {

        let usr = localStorage.getItem(STORAGE_KEYS.localUser);

        if(usr == null){

            return null;
        } else {

            return JSON.parse(usr);
        }
    }

    // Método que salva ou remove usuário ao localStorage
    setLocalUser(localUser : LocalUser){

        if(localUser == null){

            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {

            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
        }
    }
}