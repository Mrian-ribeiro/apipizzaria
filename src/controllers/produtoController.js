import { json } from 'express';
import * as produtoService from '../services/produtoService.js';
import joi from 'joi'

export const produtoCreateSchema = joi.object({
   idProduto: joi.string().required(),
   nome: joi.string().required().max(30),
   descricao: joi.string().required().max(100),
   tipo: joi.string().required(),
   imagem: joi.string().allow(''),
   valor: joi.number().positive().required(),
});

export const produtoUpdateSchema = joi.object({
   nome: joi.string().max(30),
   descricao: joi.string().max(100),
   tipo: joi.string(),
   imagem: joi.string().allow(''),
   valor: joi.number().positive(),
}).min(1);

export const listarProduto = async (req, res) => {
   try {
      const {minValor, maxValor, nome, id} = req.query;
      //passamos todos os filtros para o serviço
      const produtos = await produtoService.findAll(minValor, maxValor, nome, id)

      if (produtos.length === 0) {
         return res.status(404).json({message: "Nenhum produto encontrado com esses filtros"});
      }
      res.json(produtos);
   } catch (error) {
      console.error('Erro ao buscar produtos', error);
      res.status(500).json({error: 'Erro interno do Servidor'})
   }
};

export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({ message: 'Produto adicionado com sucesso', data: novoProduto});
    } catch (error) {
        console.error('Erro ao adicionar Produto:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({error: 'ID já cadastrado'});
        }
        res.status(500).json({error: 'Erro ao adicionar produto'});
    }
};


export const atualizarProduto = async (req, res) => {
    try {
        const{ idProduto } = req.params;
        // A validação agora é feita pelo middleware
        const updated = await produtoService.update(idProduto, req.body);
        if (!updated) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso'});
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto'});
    }
};

export const deletarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params
        const deleted = await produtoService.remove(idProduto);
        if (!deleted) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }
        res.status(200).json({ message: 'Produto deletado com sucesso'});
    } catch (error) {
        console.error('Erro ao deletar produto', error);
        res.status(500).json({error: 'Erro ao deletar Produto'});
    }
};