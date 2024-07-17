const express = require('express')
const user = require('./Route/user')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 3000
const { default: mongoose } = require('mongoose')
const Message = require ('./Route/messageRoute')
const middleware = require('./authenticate/middleware')
const totalUser = require('./Route/totalUser')
 



MONGO_URL= "mongodb+srv://srijan:121122@cluster0.grwvfmy.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Mongoose Connected");
        //return mongoose.connection.db.collection("food_item");
    })

app.use(express.json())
app.use(cookieParser())
app.use(middleware("authToken"));


app.use(cors({
    origin: 'http://localhost:3000', // replace with your client's origin
    credentials: true // allow credentials
}));

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user' , user)
app.use('/api/message', Message )
app.use('/api/user', totalUser)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// const { Server } = require("socket.io")

// const io = new Server(8000,{
//     cors: true,
// })

// const emailToSocketIdMap = new Map()
// const socketidToEmailMap = new Map()

// io.on("connection", (socket) => {
//     console.log("A new uer has connected", socket.id)
//     socket.on('room:join', (data) => {
//         const {email, room} = data
//         emailToSocketIdMap.set(email, socket.id)
//         socketidToEmailMap.set(socket.id, email)
//         io.to(socket.id).emit('room:join', data)
//     })
// })
