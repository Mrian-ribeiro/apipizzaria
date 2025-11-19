import { validarCpf } from './validador'; //Vai falhar, ainda não existe

describe("Testes do validador de CPF", () => {

    it("deve retornar true para um CPF válido (11 dígitos)", () => {
        const resultado = validarCpf("12345678901");
        expect(resultado).toBeTruthy();
    });

    it("deve retornar false para um CPF com menos de 11 dígitos", () => {
        const resultado = validarCpf("123");
        expect(resultado).toBeFalsy();
    });

    it("deve retonar false para um cpf nulo ou undefined", () => {
        expect(validarCpf(null)).toBeFalsy();
        expect(validarCpf(undefined)).toBeFalsy();
    });
});