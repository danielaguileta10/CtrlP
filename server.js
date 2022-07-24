const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');

const app = express();
app.set('port', process.env.PORT || 3000)

const dbOptions = {
    host : 'localhost',
    port : 3306,
    user: 'root', 
    password: '',
    database: 'ctrl'

}
// Middleware
app.use(myconn(mysql,dbOptions,'single',))
app.use(express.json())

// Rutas
 app.use(require('./routes/ventas'))
 app.use(require('./routes/compras'))


 // Server running
app.listen(app.set('port'), ()=>{
    console.log('Server running on port:', app.set('port'))
 })
