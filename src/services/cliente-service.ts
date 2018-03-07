import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Cliente } from '../viewmodels/cliente';

// Classe responsável por executar ação de CRUD do Cliente
@Injectable()
export class ClienteService {

    constructor(private _http: Http) { }

    // lista de estados a ser usada no cadastro e alteração do cliente
    public listaEstados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", 
        "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    // Prefixo da URL aonde estão contidas todos as rotas para CRUD de cliente
    private _url = 'http://gperroni-001-site1.gtempurl.com/api/Clientes/';

    // Responsável por salvar o cliente. Retorna os dados do cliente recém criado
    // Recebe o objeto CLIENTE como parâmetro
    public salvarCliente(cliente: Cliente) {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Define que o tipo de dado a ser enviado é um JSON

        const requestOptions = new RequestOptions({ headers: headers, method: "POST" });

        const data = JSON.stringify(cliente); // Converte o objeto do tipo CLIENTE para JSON
        
        // Realiza um POST para gravar o cliente
        return this._http
            .post(this._url, data, requestOptions)
            .map(res => res.json())
            .toPromise()
            .then(resultado => {
                let cliente = new Cliente(resultado.Nome, resultado.Cpf, resultado.Endereco,
                    resultado.Municipio, resultado.Estado, resultado.Telefone, resultado.Email, resultado.Senha);
                return cliente;
            });
    }

    // Responsável por alterar o cliente. Retorna os dados do cliente recém alterado
    // Recebe o objeto CLIENTE como parâmetro
    public alterarCliente(cliente: Cliente) {
        let putUrl = this._url + cliente.cpf; // Formata a URL com o CPF do cliente

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Define que o tipo de dado a ser enviado é um JSON

        const requestOptions = new RequestOptions({ headers: headers, method: "PUT" });

        const data = JSON.stringify(cliente); // Converte o objeto do tipo CLIENTE para JSON

        // Realiza um PUT para atualizar o cliente
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

    // Busca dados do cliente, através do CPF
    // Recebe o CPF como parâmetro
    public buscarCliente(cpf: string) {
        let showUrl = this._url + cpf; // Formata a URL com o CPF do cliente
        
        // Realiza um GET para buscar dados do cliente
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

    // Exclui cliente da base de dados, através do CPF.
    // Recebe o CPF como parâmetro
    public excluirCliente(cpf: string) {
        let deleteUrl = this._url + cpf; // Formata a URL com o CPF do cliente

        return this._http
            .delete(deleteUrl)
            .toPromise();
    }
}