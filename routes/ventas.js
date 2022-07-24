const express = require('express');
const routes = express.Router();
var jwt = require('jsonwebtoken');




// Seleccionar todas las ventas
routes.get('/ventas', ensureToken , function  (req, res){
   jwt.verify(req.token, 'my_secret_key', function(err, data){
      if (err){
         res.send('Token Incorrecto')
      }
      else {
         req.getConnection((err, conn)=>{
            if(err) return res.send(err)
    
             conn.query('CALL PROC_SELECT_VENTAS()',(err, rows)=>{
                if(err) return res.send(err)
    
                res.json(rows)
             })
        })
      }
  })
})

 

 // Insertar una venta
  routes.post('/ins_venta', ensureToken, function (req, res) {
  
   jwt.verify(req.token, 'my_secret_key', function(err, data){
       if (err){
         res.send('Token Incorrecto')
       }

       else{
         const { cod_cliente,cod_forma_pago, no_factura, fec_venta, isv, cod_producto, cantidad, precio, descuento } = req.body;
         const consulta = `call PROC_INSERTAR_VENTAS('${cod_cliente}','${cod_forma_pago}','${no_factura}','${fec_venta}','${isv}','${cod_producto}','${cantidad}','${precio}','${descuento}')`;
       
          req.getConnection((err, conn)=>{
               conn.query(consulta, (err, rows)=>{
                   if(!err) 
                   res.send('Venta ingresada correctamente')
                   else 
                   console.log(err)
                }) 
           })
       }
   })
 })

  // Actualizar una venta
  routes.put('/ventas/:cod_venta', ensureToken, function (req, res){

  jwt.verify(req.token, 'my_secret_key', function(err, data){
   if (err){
      res.send('Token Incorrecto')
    }
    else{
      const { cod_venta } = req.params;
      const {cod_cliente,cod_forma_pago, no_factura, fec_venta, isv, cod_producto, cantidad, precio, descuento } = req.body;
      const consulta = `call PROC_ACTUALIZAR_VENTAS(?,'${cod_cliente}','${cod_forma_pago}','${no_factura}','${fec_venta}','${isv}','${cod_producto}','${cantidad}','${precio}','${descuento}')`;
     
       req.getConnection((err, conn)=>{
            conn.query(consulta, [cod_venta],(err, rows)=>{
                if(!err) 
                res.send('Venta actualizada correctamente')
                else 
                console.log(err)
             }) 
        })
    }
  })
 })



// Borrar una Venta
routes.delete('/ventas/:cod_venta', ensureToken, function (req, res){
   jwt.verify(req.token, 'my_secret_key', function(err, data){
       if (err){
         res.send('Token Incorrecto')
       }

       else {
         const { cod_venta } = req.params;
         const consulta = `call PROC_ELIMINAR_VENTAS(?)`;
         
            req.getConnection((err, conn)=>{
                 conn.query(consulta, [cod_venta], (err, rows)=>{
                     if(!err) 
                     res.send('Datos borrados correctamente')
                     else 
                     console.log(err)
                  }) 
             })
       }
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
      res.send('ACCESO DENEGADO')
   }
}

module.exports = routes