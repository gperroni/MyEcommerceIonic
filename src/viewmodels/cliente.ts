// ViewModel CLIENTE
export class Cliente {

    constructor(
        public nome: string,
        public cpf: string,
        public endereco: string,
        public municipio: string,
        public estado: string,
        public telefone: string,
        public email: string,
        public senha: string) { }
}