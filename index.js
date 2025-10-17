// atualizar o index.js
// , { response }
//1. Importa a ferramenta Express
import express from 'express'

//2. cria a nossa aplicação (nosso servidor)
const app = express()

//habilita o Express para entender o formato JSON no corpo das requisiçoes
app.use(express.json())

//3. Define a porta em que o servidor vai 'escutar' os pedidos
const PORTA = 3333

//rota principal da aplicação
app.get('/', (request, response) => {
    //req = Requesição (dados do pedido do cliente)
    //res = Resposta (o que vamos enviar de volta)

    //estamos enviando uma resposta no formato JSON
    response.json({message: "Bem-vindo á API da Pizzaria Senac!"})
})

//4. manda o servidor ficar "escutando" na porta definida
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}. acesse http://localhost:${PORTA}`)
})

//seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    {id: 1, nome: "João Silva", email: "joao.silva@exemple.com" },
    {id: 2, nome: "Maria Santos", email: "maria.santos@exemple.com" }
]

//Rota para listar Todos os clientes (seu codigo original)
app.get('/clientes', (req, res) => {
    res.json(listaDeClientes);
});
//Nova Rota: rota para buscar UM cliente pelo id
app.get('/clientes/:id', (req, res) => {
    // captura o id da URL e converte para numero
    const idDoCliente = parseInt(req.params.id)
    // procura o cliente no array usando o metodo find()
    const cliente = listaDeClientes.find(c => c.id === idDoCliente)
    //Verifica se o cliente foi encontrado
    if (cliente) {
        //Se encontrou, retorna o cliente com status 200 (OK)
        res.json(cliente)
    } else {
        //Se não encontrar, retorna um erro 404 (Not Found)
        res.status(404).json({mensagem: "Cliente não encontrado"})
    }
})

//Rota para criar um novo cliente 
app.post('/clientes', (req, res) => {
    // o middleware express.json() pega o corpo da requisição e o coloca em req.body
    const novoCliente = req.body;

    console.log("Criamos um novo Cliente:", novoCliente)

    res.json({menssage: `Cliente ${novoCliente.novo} cadastrado com sucesso!`, data: novoCliente})
})