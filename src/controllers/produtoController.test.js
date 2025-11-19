import { produtoCreateSchema } from "./produtoController.js";

describe("Testes do Produto Create Schema", () => {

    it("deve validar um produto com dados corretos", () => {

        const produtoValido = {
            idProduto: "1",
            nome: "pizza de mussarela",
            descricao: "pizza com queijo",
            tipo: "pizza",
            imagem: 'pedaçodequeijo.png',
            valor: 39.99
        }

        const {error} = produtoCreateSchema.validate(produtoValido);

        expect(error).toBeFalsy();
    });

     it("deve rejeitar um produto se nome", () => {
        
        const nomeValido = {
            idProduto: "2",
            nome: '',
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: '',
            valor: 69.90
        };

        const {error} = produtoCreateSchema.validate(nomeValido);

        expect(error).toBeTruthy();
    });

    it("deve rejeiar um produto com valor negativo", () => {

        const valorNegativo = {
              idProduto: "2",
            nome: "pizza boa",
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: '',
            valor: -69.90
        };

        const{error} = produtoCreateSchema.validate(valorNegativo);

        expect(error).toBeTruthy()
    });

    it("deve permitir um produto com imagem em branco", () => {
        
        const podeImagem ={
              idProduto: "2",
            nome: 'ala modão',
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: '',
            valor: 69.90
        };

        const {error} = produtoCreateSchema.validate(podeImagem)

        expect(error).toBeFalsy()
    });
});