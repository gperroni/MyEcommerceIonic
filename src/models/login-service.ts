import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cliente } from './cliente';

@Injectable()
export class LoginService {
    private _clienteLogado: Cliente;

    constructor(private _http: Http) { }

    public efetuarLogin(email: string, senha: string) {
        let url = `http://gperroni-001-site1.gtempurl.com/api/Login/Autenticar?email=${email}&senha=${senha}`;
        // let url = `http://localhost:58666/api/Login/Autenticar?email=${email}&senha=${senha}`;

        return this._http
            .get(url)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                let cliente = new Cliente(resultado.Nome, resultado.Cpf, resultado.Endereco, resultado.Municipio,
                    resultado.Estado, resultado.Telefone, resultado.Email, resultado.Senha);
                this._clienteLogado = cliente;
                return cliente;
            });
    }


    getUsuarioLogado() {
        return this._clienteLogado;
    }
}