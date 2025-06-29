const express =  require('express')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/authRouter')
const ProductRouter = require("./Routes/ProductRouter")

require('./Models/db')

const PORT = process.env.PORT || 8080

const allowedOrigins = ['https://my-frontend.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.get('/ping', (req, res) => {
    res.send('PONG')
} )

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})
