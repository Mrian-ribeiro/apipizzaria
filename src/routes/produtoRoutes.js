import express from 'express';
import * as produtoController from '../controllers/produtoController.js'
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';
const router = express.Router();

//o prefixo '/api/produtos' será definido no index.js
router.get('/', produtoController.listarProduto);
//adiciona o middleware de validação do joi
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);
//adiciona o middleware de validação do joi
router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:idProduto', produtoController.deletarProduto);

export default router;