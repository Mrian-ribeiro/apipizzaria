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
        };

        const {error} = produtoCreateSchema.validate(produtoValido);

        expect(error).toBeFalsy();
    });

     it("deve rejeitar um produto se nome", () => {
        
        const nomeValido = {
            idProduto: "2",
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: 'manjericao.png',
            valor: 69.90
        };

        const {error} = produtoCreateSchema.validate(nomeValido);

        expect(error).toBeTruthy();

        expect(error.details[0].message).toBe('"nome" is required');
    });

    it("deve rejeiar um produto com valor negativo", () => {

        const valorNegativo = {
              idProduto: "2",
            nome: "pizza boa",
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: 'foto.png',
            valor: -69.90
        };

        const{error} = produtoCreateSchema.validate(valorNegativo);

        expect(error).toBeTruthy();

        expect(error.details[0].message).toBe('"valor" must be a positive number');
    });

    it("deve permitir um produto com imagem em branco", () => {
        
        const podeImagem ={
            idProduto: "2",
            nome: 'ala modão',
            descricao: "uma pizza saborosa",
            tipo: "pizza",
            imagem: "",
            valor: 69.90
        };

        const {error} = produtoCreateSchema.validate(podeImagem)

        expect(error).toBeFalsy()
    });

    it("deve rejeitar um produto com valor que não seja numero", () => {

        const valorLetrado = {
            idProduto: "2",
            nome: 'Pizza de Strogonoff',
            descricao: "Pizza e Strogonoff",
            tipo: "pizza",
            imagem: "",
            valor: "cinquenta"
        };

        const { error } = produtoCreateSchema.validate(valorLetrado);

        expect(error).toBeTruthy();
        expect(error.details[0].message).toBe('"valor" must be a number')
    });
});