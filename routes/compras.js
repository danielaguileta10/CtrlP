const express = require('express');
const routes = express.Router();
var jwt = require('jsonwebtoken');

// Seleccionar todas las compras
routes.get('/compras', ensureToken , function (req, res){
   jwt.verify(req.token, 'my_secret_password', function(err, data){
     if (err){
      res.send('Token Incorrecto')
     }
     else{
      req.getConnection((err, conn)=>{
         if(err) return res.send(err)
 
          conn.query('CALL PROC_SELECT_COMPRAS()',(err, rows)=>{
             if(err) return res.send(err)
 
             res.json(rows)
          })
     })
     }
   })
 })


 // Insertar una compra
 routes.post('/ins_compra', ensureToken, function (req, res) {
   jwt.verify(req.token, 'my_secret_password', function(err, data){
      if (err){
         res.send('Token Incorrecto')
      }
      else {
         const { cod_proveedor,cod_forma_pago, no_factura, fec_compra, cod_producto, cantidad, precio} = req.body;
         const consulta = `call PROC_INSERTAR_COMPRAS('${cod_proveedor}','${cod_forma_pago}','${no_factura}','${fec_compra}','${cod_producto}','${cantidad}','${precio}')`;
       
          req.getConnection((err, conn)=>{
               conn.query(consulta, (err, rows)=>{
                   if(!err) 
                   res.send('Compra ingresada correctamente')
                   else 
                   console.log(err)
                }) 
           })
      }
   })
  
 })

  // Actualizar una compra
  routes.put('/compras/:cod_compra', ensureToken , function (req, res){
   jwt.verify(req.token, 'my_secret_password', function(err, data){
            if (err) {
               res.send('Token Incorrecto')
            }
            else{
               const {cod_compra} = req.params;
               const { cod_proveedor, cod_forma_pago, no_factura, fec_compra, cod_producto, cantidad, precio} = req.body;
             const consulta = `call PROC_ACTUALIZAR_COMPRAS(?,'${cod_proveedor}','${cod_forma_pago}','${no_factura}','${fec_compra}','${cod_producto}','${cantidad}','${precio}')`;
             
                req.getConnection((err, conn)=>{
                     conn.query(consulta, [cod_compra],(err, rows)=>{
                         if(!err) 
                         res.send('Compra actualizada correctamente')
                         else 
                         console.log(err)
                      }) 
                 })
            }
   })
  })



  // Borrar una Compra
  routes.delete('/compras/:cod_compra', ensureToken , function  (req, res) {
   jwt.verify(req.token, 'my_secret_password', function(err, data){
        if (err){
         res.send('Token Incorrecto')
        }
        else {
         const { cod_compra } = req.params;
         const consulta = `call PROC_ELIMINAR_COMPRAS(?)`;
         
            req.getConnection((err, conn)=>{
                 conn.query(consulta, [cod_compra], (err, rows)=>{
                     if(!err) 
                     res.send('Datos borrados correctamente')
                     else 
                     console.log(err)
                  }) 
             })
        }
   })
  
  
   })

   routes.get('/login', function(req, res){
      const user = {id: 3  };
      const token = jwt.sign({ user }, 'my_secret_password');
   
      res.json({
         token : token 
      })
   
   
   });
   
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






 

module.exports = routes