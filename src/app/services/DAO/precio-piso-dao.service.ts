import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class PrecioPisoDAOService {

    constructor(private http: HttpClient) { }

    getLinea(): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': 'd788385e2e7349388f922cd2158dbf7c'
        }
        return this.http.get(environment.endp_linea, { 'headers': headers })
    }

    getCodigo(linea: any): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': 'd788385e2e7349388f922cd2158dbf7c'
        }
        return this.http.get(environment.endp_codigo + linea, { 'headers': headers })
    }

    getZona(): Observable<any> {
        const headers = {
            'Ocp-Apim-Subscription-Key': 'd788385e2e7349388f922cd2158dbf7c'
        }
        return this.http.get(environment.endp_zona, { 'headers': headers })
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
            'Ocp-Apim-Subscription-Key': 'd788385e2e7349388f922cd2158dbf7c'
        }

        const body = JSON.stringify(form);
        const json = JSON.parse(body);

        this.eliminarVacios(json);
        return this.http.post(environment.endp_precioPiso, json, { 'headers': headers });
          
    }


}


