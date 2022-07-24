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
// APIS - REST MODULO DE ROLES ///////////////////////
//////////////////////

////TABLA REGISTRO DE ROLES/////
//Mostratndo Tabla de roles

routes.get('/tbl_roles', ensureToken, function (req, res)  {

    jwt.verify (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            req.getConnection((err, conn) => {
                if(err) return res.send(err)   
                 conn.query('Call PROC_SELECCIONAR_ROL()', (err, rows) => { 
                    if(err) return res.send(err) 
                    res.json(rows); 
                })   
            })
        }        
         
    })
});

//Insertar un rol
routes.post('/insertar_rol', ensureToken, function (req,res){  

    jwt.verify  (req.token, 'my_secret_key', function (err, data )  {
        if(err){
            res.send('Acceso denegado');
        }else{
            const {cod_rol, nombre_rol, fec_creacion} = req.body;
            const consulta = `CALL PROC_INSERTAR_ROL('${cod_rol}','${nombre_rol}','${fec_creacion}')`;

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

//Actualizar un rol
routes.put('/actualizar_rol',ensureToken, function (req,res){  

    jwt.verify (req.token, 'my_secret_key', function (err, data ) {
        if(err){
            res.send('Acceso denegado');
         }else{
            const {cod_rol, nombre_rol, fec_creacion} = req.body;
            const consulta = `call PROC_ACTUALIZAR_ROL('${cod_rol}','${nombre_rol}','${fec_creacion}')`;

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

//Eliminar un rol
routes.delete('/eliminar_rol/:cod_rol',ensureToken, function (req,res){ 
    
    jwt.verify(req.token, 'my_secret_key', function (err, data ) {
        if(err){
            res.send('Acceso denegado');
        }else{
            const {cod_rol}=req.params;
            const consulta = `Call PROC_ELIMINAR_ROL (?)`;
             req.getConnection((err, conn)=>{  
             conn.query(consulta, [cod_rol], (err, rows)=>{
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
