import fs from 'node:fs/promises'

async function lerCardapio() {

    try {
        const cardapio = await fs.readFile('pizzas.txt', 'utf-8')

        console.log(`no cardapio contêm: ${cardapio}`)
    } catch (erro) {
        console.error(`cardapio não encontrado: ${erro}`)
    }
}

lerCardapio()