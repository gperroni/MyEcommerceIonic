import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Cliente } from './cliente';

@Injectable()
export class ClienteService {

    constructor(private _http: Http) { }

    public salvarCliente(cliente: Cliente) {
        // let url = `http://gperroni-001-site1.gtempurl.com/api/Cliente/CriarCadastro`;
        let url = `http://localhost:58666/api/Cliente/CriarCadastro`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions({ headers: headers,method: "POST" });

        const data = JSON.stringify(cliente)
        console.log(data);
        return this._http
            .post(url, data, requestOptions)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                return resultado;
            });
    }
}