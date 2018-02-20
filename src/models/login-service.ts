import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cliente } from './cliente';
import { ClienteService } from './cliente-service';

@Injectable()
export class LoginService {
    private _clienteLogado: Cliente;

    constructor(private _http: Http, private _service: ClienteService) { }

    public efetuarLogin(email: string, senha: string) {
        let url = `http://gperroni-001-site1.gtempurl.com/api/Login/Autenticar?email=${email}&senha=${senha}`;

        return this._http
            .get(url)
            .map(res => res.json())
            .toPromise()
            .then(cpf => {
                return this.getDadosCliente(cpf);
            })
    }


    getClienteLogado() {
        return this._clienteLogado;
    }

    setClienteLogado(clienteLogado: Cliente) {
        this._clienteLogado = clienteLogado;
    }

    getDadosCliente(cpf: string) {
        return this._service
            .buscarCliente(cpf)
            .then(cliente => {
                this.setClienteLogado(cliente);
                return cliente;
            });
    }
}