const { application } = require('express');
const express = require('express')
const routes = express.Router()
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
        res.send('ACCESO DENEGADO')
     }
  }

// Ruta para Seleccionar Reportes generales
routes.get('/reportes', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            req.getConnection((err, conn)=>{
                if(err) return res.send(err)
                conn.query(`Call PROC_SELECCIONAR_REPORTES_GENERALES`, (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
            })
        }
    })
})

// Ruta para Seleccionar Reportes guardados
routes.get('/reporte_guardados', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            req.getConnection((err, conn)=>{
                if(err) return res.send(err)
                conn.query(`Call PROC_SELECCIONAR_REPORTES_GUARDADOS`, (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
            })
        }
    })    
})

// Ruta para Seleccionar Reportes historicos
routes.get('/reporte_historicos', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            req.getConnection((err, conn)=>{
                if(err) return res.send(err)
                conn.query(`Call PROC_SELECCIONAR_REPORTES_HISTORICOS`, (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
            })
        }
    })
})

// Ruta para Insertar Reportes
routes.post('/insertar_routes', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {nombre_reporte, tipo_reporte, fec_inicial, fec_final } = req.body;
            const consulta = `Call PROC_INSERTAR_REPORTES('${nombre_reporte}','${tipo_reporte}','${fec_inicial}','${fec_final}')`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                    if(!err) 
                    res.send('Datos Ingresados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para Actualizar un Reporte General
routes.put('/actualizar_reportes', ensureToken, function (req, res){ 
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_reporte, nombre_reporte, tipo_reporte, fec_inicial, fec_final } = req.body;
            const consulta = `Call PROC_ACTUALIZAR_REPORTES('${cod_reporte}','${nombre_reporte}','${tipo_reporte}','${fec_inicial}','${fec_final}')`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                    if(!err) 
                    res.send('Datos Actualizados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para Actualizar un Reporte Guardado
routes.put('/actualizar_reportes_guardados', ensureToken, function (req, res){ 
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_reporte_guardado, cod_reporte } = req.body;
            const consulta = `Call PROC_ACTUALIZAR_REPORTES_GUARDADOS('${cod_reporte_guardado}','${cod_reporte}')`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                    if(!err) 
                    res.send('Datos Actualizados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    }) 
})

// Ruta para Actualizar un Reporte Historico
routes.put('/actualizar_reportes_historicos', ensureToken, function (req, res){ 
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const {cod_historico, cod_reporte } = req.body;
            const consulta = `Call PROC_ACTUALIZAR_REPORTES_HISTORICOS('${cod_historico}','${cod_reporte}')`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, (err, rows)=>{
                    if(!err) 
                    res.send('Datos Actualizados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para Eliminar un Reporte General
routes.delete('/eliminar_reportes/:cod_reporte', ensureToken, function (req, res){ 
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { cod_reporte } = req.params;
            const consulta = `Call PROC_ELIMINAR_REPORTES_GENERALES (?)`; 
            req.getConnection((err, conn)=>{
                conn.query(consulta, [cod_reporte], (err, rows)=>{
                    if(!err) 
                    res.send('Datos Eliminados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para Eliminar un Reporte Guardado
routes.delete('/eliminar_reportes_guardados/:cod_reporte_guardado', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { cod_reporte_guardado } = req.params;
            const consulta = `Call PROC_ELIMINAR_REPORTES_GUARDADOS (?)`;  
            req.getConnection((err, conn)=>{
                conn.query(consulta, [cod_reporte_guardado], (err, rows)=>{
                    if(!err) 
                    res.send('Datos Eliminados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para Eliminar un Reporte historico
routes.delete('/eliminar_reportes_historicos/:cod_historico', ensureToken, function (req, res){ 
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { cod_historico } = req.params;
            const consulta = `Call PROC_ELIMINAR_REPORTES_HISTORICOS (?)`;  
            req.getConnection((err, conn)=>{
                conn.query(consulta, [cod_historico], (err, rows)=>{
                    if(!err) 
                    res.send('Datos Eliminados Correctamente!')
                    else 
                    console.log(err)
                }) 
            })
        }
    })
})

// Ruta para seleccionar las Compras
routes.get('/reporte_compras/:fec_compra', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { fec_compra } = req.params;
            const consulta = `Call PROC_REPORTE_COMPRAS (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [fec_compra], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar las Ventas
routes.get('/reporte_ventas/:fec_venta', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { fec_venta } = req.params;
            const consulta = `Call PROC_REPORTE_VENTAS (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [fec_venta], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar los Usuarios
routes.get('/reporte_usuarios/:fec_creacion', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { fec_creacion } = req.params;
            const consulta = `Call PROC_REPORTE_USUARIOS (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [fec_creacion], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar los Clientes
routes.get('/reporte_clientes/:nombres', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { nombres } = req.params;
            const consulta = `Call PROC_REPORTE_CLIENTES (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [nombres], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar los Proveedores
routes.get('/reporte_proveedores/:nombre', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { nombre } = req.params;
            const consulta = `Call PROC_REPORTE_PROVEEDORES (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [nombre], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar los Productos
routes.get('/reporte_productos/:fec_creacion', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { fec_creacion } = req.params;
            const consulta = `Call PROC_REPORTE_PRODUCTOS (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [fec_creacion], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

// Ruta para seleccionar los Inventarios
routes.get('/reporte_inventarios/:fec_creacion', ensureToken, function (req, res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
            const { fec_creacion } = req.params;
            const consulta = `Call PROC_REPORTE_INVENTARIOS (?)`;
            req.getConnection((err, conn)=>{
                conn.query(consulta, [fec_creacion], (err, rows)=>{
                    if(!err) 
                    res.json(rows)
                    else 
                    console.log(err)
                })
            })
        }
    })
})

module.exports = routes