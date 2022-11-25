const express = require('express')
const uuid = require('uuid')




const port = 3000
const app = express()
app.use(express.json())


const pedido= []


const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = pedido.findIndex(client=> client.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })

    }

    request.clientIndex = index
    request.clientId = id

    next()
}





app.get('/Order', (request, response) => {

    return response.json(pedido)

})



app.post('/Order', (request, response) => {

    /*try & catch: try & catch serve  para  lidar com erros, para  que a aplicação não quebre, 
    para que possamos tratar os erros, de alguma forma e mostrar para o usúario o que deu de errado.
    Para que o códgo não fique muito verboso é recomendado só eusar o try & catch em trechos que a chanses dec erros é grande
*/ 
    try{ 

    const { order, cliente, valor } = request.body

if(valor< 45 )throw  new Error("Somente pedidos acima de R$: 45,00 Reais")

    const client = { id: uuid.v4(), order, cliente, valor ,status: "Em preparação"  }

    pedido.push(client)

    return response.status(201).json(client)

        } catch(err){
            
            return response.status(400).json({error:err.message})
        
        } finally{

            console.log("Terminou tudo")
        }
})


    /*  app.put('/users/:id', checkUserId, (request, response) => {
 
   
    const { name, age, altura } = request.body
    const index = request.userIndex
    const id  = request.userId
    const updateUser = { id, name, age, altura }


    users[index] = updateUser

    return response.json(updateUser)

}) */


app.put('/Order/:id', checkUserId,  (request, response) => {

    const { id } = request.params
    const {order, cliente, valor ,status  } = request.body
    const updateOrder = {id,order, cliente, valor ,status:"Em preparação"  }

    const index = pedido.findIndex(client=> client.id === id)




   pedido[index] = updateOrder

    return response.json(updateOrder)
    

})


app.patch('/Order/:id', (request, response) => {




    const { id } = request.params
    const {order, cliente, valor ,status  } = request.body
    const finsh = {id,order, cliente, valor ,status:"pedido pronto"  }

    const index = pedido.findIndex(client=> client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User Not Found" })

    }

    console.log(index)

    pedido[index] =finsh

    return response.json(finsh)
   

  




})


app.delete('/Order/:id', (request, response) => {

    const {id}= request.params


    const index = pedido.findIndex(client=> client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User Not Found" })  
    }


 

pedido.splice(index,1),response.status(404).json({ message: "pedido canselado" })  

    return response.status(204).json()
})

app.listen(port, () => {

    console.log(`🚀 Server started on ${port}`)
})