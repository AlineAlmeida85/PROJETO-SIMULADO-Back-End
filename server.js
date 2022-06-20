const produtosJson = require("./data/produtos.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

const PORT = 8080

app.use(express.json())

app.get("/products", (request, response) => {
    response.status(200).send(produtosJson)
})

app.get("/products/buscar/:id", (request, response) => {
    const idRequest = request.params.id
    
    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)

    response.status(200).send(produtoEncontrado)
})


app.post("/products/cadastrar", (request, response) => {
    const bodyRequest = request.body

    const novoProduto = {
        id: bodyRequest.id,
        title: bodyRequest.title,
        price: bodyRequest.price,
        description: bodyRequest.description,
        image: bodyRequest.image,
        category: bodyRequest.category
    }
    produtosJson.push(novoProduto)

    response.status(201).send({
        "Mensagem": "Novo Produto cadastrado com sucesso!", 
        novoProduto
    })
})

app.delete("/products/deletar/:id", (request, response) => {
    const idRequest = request.params.id
    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)

    const indice = produtosJson.indexOf(produtoEncontrado)

    produtosJson.splice(indice, 1)

    response.status(200).json([{
        "Mensagem": "Produto Deletado com Sucesso!!!",
        "produto-deletado": produtoEncontrado,
        produtosJson
    }])
})

app.put("/products/atualizar/:id", (request, response) => {
    const idRequest = request.params.id
    const bodyRequest = request.body
    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)
    const indice = produtosJson.indexOf(produtoEncontrado)
    
    bodyRequest.id = idRequest

    produtosJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "Mensagem": "Produto Atualizado com Sucesso!!",
        "produto-atualizado": produtosJson
    }])

})


app.listen(PORT, () => {
    console.log(`O servidor está na porta ${PORT}!`)
})

