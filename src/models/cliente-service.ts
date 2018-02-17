import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Cliente } from './cliente';

@Injectable()
export class ClienteService {

    constructor(private _http: Http) { }

    public listaEstados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", 
        "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    url = 'http://gperroni-001-site1.gtempurl.com/api/Clientes/';

    public salvarCliente(cliente: Cliente) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions({ headers: headers, method: "POST" });

        const data = JSON.stringify(cliente)
        return this._http
            .post(this.url, data, requestOptions)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                let cliente = new Cliente(resultado.Nome, resultado.Cpf, resultado.Endereco,
                    resultado.Municipio, resultado.Estado, resultado.Telefone, resultado.Email, resultado.Senha);
                return cliente;
            });
    }

    public alterarCliente(cliente: Cliente) {
        let putUrl = this.url + cliente.cpf;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions({ headers: headers, method: "PUT" });

        const data = JSON.stringify(cliente)

        return this._http
            .post(putUrl, data, requestOptions)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                let cliente = new Cliente(resultado.Nome, resultado.Cpf, resultado.Endereco,
                    resultado.Municipio, resultado.Estado, resultado.Telefone, resultado.Email, resultado.Senha);
                return cliente;
            });
    }

    public exibirCliente(cpf: string) {
        let showUrl = this.url + cpf;

        return this._http
            .get(showUrl)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                let cliente = new Cliente(resultado.Nome, resultado.Cpf, resultado.Endereco, resultado.Municipio,
                    resultado.Estado, resultado.Telefone, resultado.Email, resultado.Senha);
                return cliente;
            });
    }

    public excluirCliente(cpf: string) {
        let deleteUrl = this.url + cpf;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .delete(deleteUrl)
            .toPromise();
    }
}