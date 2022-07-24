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
 

//Mostratndo Tabla de ususarios
routes.get('/tbl_usuarios', ensureToken , function  (req, res)  {

    jwt.verify (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            req.getConnection((err, conn) => {
                if(err) return res.send(err)   
                 conn.query('Call PROC_SELECCIONAR_USUARIO', (err, rows) => { 
                    if(err) return res.send(err) 
                    res.json(rows); 
                })   
            })
        }        
         
    })
});

//Insertar un usuario
routes.post('/insertar_usuario', ensureToken, function (req,res){  

    jwt.verify (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
         }else{
            const {cod_usuario, cod_persona, nombre_usuario, correo, password, cod_estado_usuario, cod_rol, fec_creacion} = req.body;
            const consulta = `CALL PROC_INSERTAR_USUARIO('${cod_usuario}','${cod_persona}','${nombre_usuario}','${correo}','${password}','${cod_estado_usuario}','${cod_rol}','${fec_creacion}')`;

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


//Actualizar un usuario
routes.put('/actualizar_usuario', ensureToken, function (req,res){  

    jwt.verify (req.token, 'my_secret_key', function  (err, data ) {
        if(err){
            res.send('Acceso denegado');
        }else{
            const {cod_usuario, cod_persona, nombre_usuario, correo, password, cod_estado_usuario, cod_rol, fec_creacion} = req.body;
            const consulta = `call PROC_ACTUALIZAR_USUARIO('${cod_usuario}','${cod_persona}','${nombre_usuario}','${correo}','${password}','${cod_estado_usuario}','${cod_rol}','${fec_creacion}')`;

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

//Eliminar un usuario 
routes.delete('/eliminar_usuario/:cod_usuario', ensureToken , function (req,res){ 
    
    jwt.verify  (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            const {cod_usuario}=req.params;
            const consulta = `Call PROC_ELIMINAR_USUARIO (?)`;

             req.getConnection((err, conn)=>{  
             conn.query(consulta, [cod_usuario], (err, rows)=>{
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
