import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class PrecioPisoDAOService {

    constructor(private http: HttpClient) { }

    getAuth(path: Object): Observable<any> {
        
        var body = JSON.stringify(path)
        var json = JSON.parse(body)

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Ocp-Apim-Subscription-Key': '802ac063011f4cf9b2ff79d781cca71f',
            'Authorization':  `Bearer ${json.token}`
        }

        delete json.token

        console.log(json)
        return this.http.post(environment.endp_auth, json, { 'headers': headers });
    }

    getLinea(): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': '802ac063011f4cf9b2ff79d781cca71f'
        }
        return this.http.get(environment.endp_linea, { 'headers': headers })
    }

    getCodigo(linea: any): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': '802ac063011f4cf9b2ff79d781cca71f'
        }
        return this.http.get(environment.endp_codigo + linea, { 'headers': headers })
    }

    getZona(correo: string): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': '802ac063011f4cf9b2ff79d781cca71f'
        }

        return this.http.get(environment.endp_zona + correo, { 'headers': headers })
    }


    eliminarVacios(json: any) {
        for (var clave in json) {
            if (typeof json[clave] == 'string') {
                if (json[clave] == 'Vacío' || json[clave] == '') {
                    delete json[clave]
                }
            } else if (typeof json[clave] == 'object') {
                this.eliminarVacios(json[clave])
            }
        }
    }

    getDatos(form: Object): Observable<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Ocp-Apim-Subscription-Key': '802ac063011f4cf9b2ff79d781cca71f'
        }

        const body = JSON.stringify(form);
        const json = JSON.parse(body);

        this.eliminarVacios(json);
        return this.http.post(environment.endp_precioPiso, json, { 'headers': headers });
          
    }


}


