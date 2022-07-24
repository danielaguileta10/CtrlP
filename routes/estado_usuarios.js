const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');


function ensureToken(req , res , next){
    const bearerHeader = req.headers["authorization"]
     if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
     }
     else{
        res.send('ACCESO DENEGADO!')
     }
  }
 

//////////////////////
// APIS - REST MODULO DE ESTADO USUARIOS ///////////////////////
//////////////////////

////TABLA REGISTRO DEL ESTADO USUARIO/////

//Mostratndo Tabla de estado usuarios
routes.get('/tbl_estado_usuarios', ensureToken , function (req, res)  {

    jwt.verify(req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            req.getConnection((err, conn) => {
                if(err) return res.send(err)   
                 conn.query('Call PROC_SELECCIONAR_ESTADO_USUARIO()', (err, rows) => { 
                    if(err) return res.send(err) 
                    
                    res.json(rows); 
                })   
            })
        }        
         
    })
});

//Insertar en estado de usuario
routes.post('/insertar_estado', ensureToken, function (req,res){  

    jwt.verify (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            const {cod_estado_usuario, descripcion, fec_creacion} = req.body;
            const consulta = `CALL PROC_INSERTAR_ESTADO_USUARIOS('${cod_estado_usuario}','${descripcion}','${fec_creacion}')`;

            req.getConnection((err, conn)=>{  
            conn.query(consulta, (err, rows)=>{
                    if(!err)   
                res.send("Registro realizado correctamente");  
                    else  
                console.log(err);  
                })
            })

        }
    })    
});


//Actualizar estado de usuario
routes.put('/actualizar_estado',(req,res)=>{  

    jwt.verify = (req.token, 'my_secret_key', (err, data ) => {
        if(error){
            res.send('Acceso denegado');
         }else{
            const {cod_estado_usuario, descripcion, fec_creacion} = req.body;
            const consulta = `call PROC_ACTUALIZAR_ESTADO_USUARIO('${cod_estado_usuario}','${descripcion}','${fec_creacion}')`;

             req.getConnection((err, conn)=>{  
             conn.query(consulta, (err, rows)=>{
                if(!err)   
                res.send("Actualización realizada correctamente");  
                else  
                    console.log(err);  
                })      
                
            })
        } 
    })            
}); 

//Eliminar el estado de usuario 
routes.delete('/eliminar_estado/:cod_estado_usuario',(req,res)=>{ 
    
    jwt.verify = (req.token, 'my_secret_key', (err, data ) => {
        if(error){
            res.send('Acceso denegado');
        }else{
            const {cod_estado_usuario}=req.params;
            const consulta = `Call PROC_ELIMINAR_ESTADO_USUARIO (?)`;

             req.getConnection((err, conn)=>{  
             conn.query(consulta, [cod_estado_usuario], (err, rows)=>{
                if(!err)   
                    res.send("Dato borrado correctamente");  
                 else  
                 console.log(err);  
                })
            })    
        }    
    })
});


 



module.exports = routes
