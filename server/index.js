const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./database/Database')
const cors = require('cors');
const UserRouter = require('./routes/userLogin');
const DataRouter = require('./routes/UserData');
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/', UserRouter);
app.use('/user', DataRouter);
app.get('/', (req, res) => {
    res.send("BMI App is Live Now")
})
connect().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err.message);
})
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
})