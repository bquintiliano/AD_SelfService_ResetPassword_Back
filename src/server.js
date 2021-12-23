const express = require ('express')
const cors = require ('cors')
const router = require ('./controllers/router')

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)


app.listen(3333, () => console.log('Servidor UP'))