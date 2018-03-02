import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cliente } from './cliente';
import { ClienteService } from './cliente-service';

// Classe responsável por realizar ação de LOGIN e armazenar dados do cliente 
@Injectable()
export class LoginService {
    
    // Armazenará dados do cliente logado
    private _clienteLogado: Cliente;

    constructor(private _http: Http, private _service: ClienteService) { }

    // Busca o CPF do cliente logado. Caso seja encontrado, faz uma nova chamada para buscar 
    // todos os dados do mesmo
    public efetuarLogin(email: string, senha: string) {
        let url = `http://gperroni-001-site1.gtempurl.com/api/Login/Autenticar?email=${email}&senha=${senha}`;

        // Faz um GET para buscar CPF do cliente. EM caso de sucesso, realiza um novo GET para buscar 
        // TODOS os dados
        return this._http
            .get(url)
            .map(res => res.json())
            .toPromise()
            .then(cpf => {
                return this.getDadosCliente(cpf);
            })
    }

    // Retorna dados do cliente logado anteriormente
    public getClienteLogado() {
        return this._clienteLogado;
    }

    // Armazena localmente os dados do cliente logado
    public setClienteLogado(clienteLogado: Cliente) {
        this._clienteLogado = clienteLogado;
    }

    // Realiza um GET para buscar dados do cliente através do CPF
    private getDadosCliente(cpf: string) {
        return this._service
            .buscarCliente(cpf)
            .then(cliente => {
                this.setClienteLogado(cliente);
                return cliente;
            });
    }
}