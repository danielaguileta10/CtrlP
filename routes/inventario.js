const express = require('express');
const routes = express.Router();
var jwt = require('jsonwebtoken');


function ensureToken(req , res , next){
    const bearerHeader = req.headers["authorization"]
     if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
     }
     else{
        res.send('ACCESO DENEGADO')
     }
  }


// PRODUCTOS
// Seleccionar producto
routes.get('/productos', ensureToken, function (req,res){
     
        jwt.verify(req.token, 'my_secret_key', (err,data)=>{
            if(err) {
                res.send('ACCESO DENEGADO')
            }else{

                req.getConnection((err,conn) =>{
                    if(err)return res.send(err)
                    conn.query('CALL PROC_SELECCIONAR_PRODUCTOS', (err,rows)=>{
                        if(err) return res.send(err)
                        
                        res.json(rows)
                    })
            
                })
            }
        })
})

//INSERTAR PRODUCTOS
routes.post('/insertar_producto',ensureToken, function (req, res){

    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {nombre,descripcion,cod_medida,cod_categoria,cantidad,precio_de_venta,creado_por,fec_creacion} = req.body;
            const consulta = `call PROC_INSERTAR_PRODUCTOS('${nombre}','${descripcion}','${cod_medida}','${cod_categoria}','${cantidad}','${precio_de_venta}','${creado_por}','${fec_creacion}')`;
   
            req.getConnection((err, conn)=>{
            conn.query(consulta, (err, rows)=>{
                 if(!err)
                res.send('se registro correctamente')
                 else
                console.log(err)
                })         
            })
        }
    })

 })

// Actualizar Producto
routes.put('/actualizar_productos',ensureToken, function  (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_producto,nombre,descripcion,cod_medida,cod_categoria,cantidad,precio_de_venta,modificado_por,fec_modificacion}= req.body
            const consulta = `call PROC_ACTUALIZAR_PRODUCTOS(
             '${cod_producto}',
             '${nombre}',
             '${descripcion}',
             '${cod_medida}',
             '${cod_categoria}',
             '${cantidad}',
             '${precio_de_venta}',
             '${modificado_por}',
             '${fec_modificacion}')`;
    
            req.getConnection((err,conn)=>{
            conn.query(consulta,(err,rows)=>{
                if(!err)
                res.send('Producto actualizado')
                else
                    console.log(err)
                 })
            })    
        }
    })
})

//Eliminar producto
routes.delete('/eliminar_productos/:cod_producto',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_producto} = req.params
            const consulta = `call PROC_ELIMINAR_PRODUCTOS(?)`

             req.getConnection((err,conn)=>{
             conn.query(consulta,[cod_producto],(err,rows)=>{
                if(!err)
                res.send('Producto Eliminado')
                else
                console.log(err)
                })
            })
        }
    })
})

// MEDIDAS
// Seleccionar medida
routes.get('/medidas',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            req.getConnection((err,conn) =>{
                if(err)return res.send(err)
                conn.query('CALL PROC_SELECCIONAR_MEDIDAS', (err,rows)=>{
                    if(err) return res.send(err)
                    
                    res.json(rows)
                })
        
            })
        }
    })
})

//INSERTAR MEDIDAS
routes.post('/insertar_medida',ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const{
                descripcion,
                creado_por,
                fec_creacion} = req.body;
            const consulta = `call PROC_INSERTAR_MEDIDAS(
            '${descripcion}',
            '${creado_por}',
            '${fec_creacion}')`;
           
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                   if(!err)
                   res.send('se registro correctamente')
                   else
                   console.log(err)
                })         
            })
        }
    })    
})

// Actualizar medidas
routes.put('/actualizar_medida',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            const {cod_medida,descripcion,modificado_por,fec_modificacion}= req.body
            const consulta = `call PROC_ACTUALIZAR_MEDIDAS(
            '${cod_medida}',
            '${descripcion}',
            '${modificado_por}',
            '${fec_modificacion}')`
    
            req.getConnection((err,conn)=>{
            conn.query(consulta,(err,rows)=>{
                if(!err)
                 res.send('medida actualizado')
                else
                    console.log(err)
                })
            })
        }
    })  
})

//Eliminar medidas
routes.delete('/eliminar_medida/:cod_medida',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            const {cod_medida} = req.params;
            const consulta = `call PROC_ELIMINAR_MEDIDAS(?)`;

            req.getConnection((err,conn)=>{
            conn.query(consulta,[cod_medida],(err,rows)=>{
                if(!err)
                    res.send('Medida Eliminado')
                else
                    console.log(err)
                })
            })
        }
    })  
})

// MODULO CATEGORIA
// Seleccionar Categoria
routes.get('/categorias',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            req.getConnection((err,conn) =>{
                if(err)return res.send(err)
                conn.query('CALL PROC_SELECCIONAR_CATEGORIAS', (err,rows)=>{
                    if(err) return res.send(err)
                    
                    res.json(rows)
                })
        
            })
        }
    })
})

//INSERTAR categoria
routes.post('/insertar_categoria',ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            const{
                descripcion,
                creado_por,
                fec_creacion} = req.body;
            const consulta = `call PROC_INSERTAR_CATEGORIAS(
            '${descripcion}',
            '${creado_por}',
            '${fec_creacion}')`;
           
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                   if(!err)
                   res.send('se registro correctamente')
                   else
                   console.log(err)
                })         
            })
        }
    }) 
})

// Actualizar Categoria
routes.put('/actualizar_categoria',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{

            const {cod_categoria,descripcion,modificado_por,fec_modificacion}= req.body
            const consulta = `call PROC_ACTUALIZAR_CATEGORIAS(
            '${cod_categoria}',
            '${descripcion}',
            '${modificado_por}',
            '${fec_modificacion}')`
    
            req.getConnection((err,conn)=>{
            conn.query(consulta,(err,rows)=>{
                if(!err)
                    res.send('Categoria actualizado')
                else
                    console.log(err)
                })
            })
        }
    })    
})

//Eliminar Categoria
routes.delete('/eliminar_categoria/:cod_categoria',ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_categoria} = req.params
            const consulta = `call PROC_ELIMINAR_CATEGORIAS(?)`

            req.getConnection((err,conn)=>{
            conn.query(consulta,[cod_categoria],(err,rows)=>{
                if(!err)
                    res.send('Categoria Eliminado')
                else
                    console.log(err)
                })
             })
        }
    })
})

module.exports = routes