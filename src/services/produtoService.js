import db from '../db/db.js';

export const findAll = async (minValor, maxValor, nome, id,tipo) => {
    //1. Define a consulta SQL base
    let sql ='SELECT * FROM produto';
    // 2 . Cria um array para as condições WHERE
    const conditions = [];
    //3. Cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    //4. adiciona as condições dinamicamente
    //Adicionamos o filtro de menor valor
    if (minValor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }
    //Adicionamos o filtro de maior valor
    if (maxValor) {
        conditions.push('valor <= ?');
        values.push(maxValor);
    }
    //adicionamos o filtro buscar por id
    if (id) {
        conditions.push('idProduto = ?');
        values.push(id);
    }
    //Adicionamos o filtro de nome
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }

    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ?');
        values.push(`%${tipo.toLowerCase()}%`);
    }

    //5. Se houver condições, anexa elas à consulta SQL
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    //6. executa a consulta final
    const [rows] = await db.query(sql, values);
    return rows;
}
//agora voce pode combinar todos os filtros na mesma URL
//Buscar por nome(pizza) e preço (entre 30 e 50 ): GET http://localhost:3333/api/produto?nome=pizza&minValor=30&maxValor=50
//Buscar por nome (borda) E preço (abaixo de 15): GET http://localhost:3333/api/produto?nome=borda&maxValor=15
//busca por nome (calabresa): GET http://localhost:3333/api/produtos?nome=calabresa

// export const findById = async (idProduto) => {
//     const [result] = await db.query ('SELECT * FROM produto WHERE = ?', [idProduto]);
//     return result.length > 0 ? result [0] : null;
// };

// export const findByNome = async (nome) => {
//     const sql = 'SELECT * FROM produto WHERE nome = ?';
//     const [rows] = await db.query(sql, [nome]);

//     return rows[0] || null;

// };

export const create = async (produtoData) => {
    const newProduto = await db.query('INSERT INTO produto SET ?', produtoData);
    return newProduto;
};

export const update = async (idProduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto]); 
    return result.affectedRows >  0;
    
};

export const remove = async (idProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
};
