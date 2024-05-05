const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllAuthRoute = require('./routes/authorizationRoutes')
const assignAuth = require('./routes/authorizationRoutes')
const getAuthByUserName = require('./routes/authorizationRoutes')
const allUnderAuth = require('./routes/authorizationRoutes')
const deleteAuth = require('./routes/authorizationRoutes')
const createCart = require('./routes/cartCreateCart')
const editCart = require('./routes/cartEditCart')
const getCart = require('./routes/cartGetCart')
const getOneWay = require('./routes/cartGetOneWay')
const getWeekendPass = require('./routes/cartGetWeekendPass')
const clearCart = require('./routes/cartClearCart')
const reduceOW = require('./routes/cartReduceOW')
const reduceWP = require('./routes/cartReduceWP')
const increaseOW = require('./routes/cartIncreaseOW')
const increaseWP = require('./routes/cartIncreaseWP')
const deleteCarts = require('./routes/cartDeleteCarts')
const getUserID = require('./routes/ticketOrdersGetUserID')
const getUsername = require('./routes/ticketOrdersGetUsername')
const postTicketUsage = require('./routes/ticketOrdersPostTicketUsage')
const deleteUsedTickets = require('./routes/ticketOrdersDeleteUsedTickets')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/auth', getAllAuthRoute)
app.use('/auth', assignAuth)
app.use('/auth', getAuthByUserName)
app.use('/auth', allUnderAuth)
app.use('/auth', deleteAuth)
app.use('/cart', editCart)
app.use('/cart', getCart)
app.use('/cart', getOneWay)
app.use('/cart', getWeekendPass)
app.use('/cart', clearCart)
app.use('/cart', reduceOW)
app.use('/cart', reduceWP)
app.use('/cart', increaseOW)
app.use('/cart', increaseWP)
app.use('/cart', createCart)
app.use('/cart', deleteCarts)
app.use('/MBTAuser', getUserID)
app.use('/MBTAuser', getUsername)
app.use('/MBTAuser', postTicketUsage)
app.use('/MBTAuser', deleteUsedTickets)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
