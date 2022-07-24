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

//-----------------------PERSONA TELEFONO------------------------------------
//SELECCIONAR PERSONA
routes.get('/personas', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
          if(err) {
            res.send('ACCESO DENEGADO')
             }else{
              req.getConnection((err, conn)=>{
              if(err) return res.send
              conn.query('call proc_seleccionar_personas', (err, rows)=>{
               if(err) return res.send(err)
            res.json(rows)
         })         
       })
    }
  })
})
//INSERTAR PERSONAS Y TELEFONO
routes.post('/INS_PERSONA', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const{nombres,apellidos,dni,sexo,direccion,estado_civil,fecha_nacimiento,num_telefono} = req.body;
             const consulta = `call PROC_INSERTAR_PERSONAS('${nombres}','${apellidos}','${dni}','${sexo}','${direccion}','${estado_civil}','${fecha_nacimiento}','${num_telefono}')`;
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
//ACTUALIZAR PERSONAS Y TELEFONO
routes.put('/actualizar_personas', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
    const{cod_persona,nombres,apellidos,dni,sexo,direccion,estado_civil,fecha_nacimiento,num_telefono} = req.body;
    const consulta = `call PROC_ACTUALIZAR_PERSONAS('${cod_persona}','${nombres}','${apellidos}','${dni}','${sexo}','${direccion}','${estado_civil}','${fecha_nacimiento}','${num_telefono}')`;
   
    req.getConnection((err, conn)=>{
        conn.query(consulta, (err, rows)=>{
           if(!err)
           res.send('Registro se actualizo correctamente')
           else
           console.log(err)
        })         
      })
     }
   })
})
//ELIMINAR PERSONAS Y TELEFONOS
routes.delete('/eliminar_persona/:cod_persona', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const {cod_persona} = req.params;
             const consulta = `call PROC_ELIMNAR_PERSONAS(?)`;
             req.getConnection((err, conn)=>{
             conn.query(consulta, [cod_persona], (err, rows)=>{
             if(!err)
             res.send('Registro eliminado correctamente')
             else
             console.log(err)
           })         
        })
       }
    })
})

//------------------------TIPO_PAGO_PLANILLA------------------------------------
//SELECCIONAR TIPO_PAGO_PLANILLA
routes.get('/forma_pago', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             req.getConnection((err, conn)=>{
             if(err) return res.send
              conn.query('call PROC_SELECCIONAR_TIPO_PAGO_PLANILLAS', (err, rows)=>{
               if(err) return res.send(err)

            res.json(rows)
        })         
      })
     }
   })
})
//INSERTAR TIPO_PAGO_PLANILLA
routes.post('/insertar_forma_pago', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const{descripcion} = req.body;
             const consulta = `call PROC_INSERTAR_TIPO_PAGO_PLANILLAS('${descripcion}')`;
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
//ACTUALIZAR TIPO_PAGO_PLANILLA
routes.put('/actualizar_forma_pago', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{cod_forma_pago,descripcion} = req.body;
              const consulta = `call PROC_ACTUALIZAR_TIPO_PAGO_PLANILLAS('${cod_forma_pago}','${descripcion}')`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, (err, rows)=>{
              if(!err)
              res.send('Registro se actualizo correctamente')
              else
              console.log(err)
        })         
       })
      }
    })
})
//ELIMINAR TIPO_PAGO_PLANILLA
routes.delete('/eliminar_formpago/:cod_forma_pago', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const {cod_forma_pago} = req.params;
              const consulta = `call PROC_ELIMINAR_TIPO_PAGO_PLANILLA(?)`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, [cod_forma_pago], (err, rows)=>{
              if(!err)
              res.send('Registro eliminado correctamente')
              else
            console.log(err)
        })         
      })
     }
   })
})

//------------------------DEPARTAMENTO------------------------------------
//SELECCIONAR DEPARTAMENTO------------------------------------------
routes.get('/departamento', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
          res.send('ACCESO DENEGADO')
           }else{
               req.getConnection((err, conn)=>{
              if(err) return res.send
              conn.query('call PROC_SELECCIONAR_DEPARTAMENTOS', (err, rows)=>{
             if(err) return res.send(err)
            res.json(rows)
        })         
      })
    }
  })
})
//INSERTAR DEPARTAMENTO
routes.post('/insertar_departamento', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const{descripcion} = req.body;
             const consulta = `call PROC_INSERTAR_DEPARTAMENTO('${descripcion}')`;
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
//ACTUALIZAR DEPARTAMENTO
routes.put('/actualizar_departamento', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{cod_departamento,descripcion} = req.body;
              const consulta = `call PROC_ACTUALIZAR_DEPARTAMENTO('${cod_departamento}','${descripcion}')`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, (err, rows)=>{
              if(!err)
              res.send('Registro se actualizo correctamente')
              else
             console.log(err)
           })         
        })
      }
   })
})
//ELIMINAR DEPARTAMENTO
routes.delete('/eliminar_departamento/:cod_departamento', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const {cod_departamento} = req.params;
              const consulta = `call PROC_ELIMINAR_DEPARTAMENTOS(?)`;  
              req.getConnection((err, conn)=>{
              conn.query(consulta, [cod_departamento], (err, rows)=>{
              if(!err)
              res.send('Registro eliminado correctamente')
              else
           console.log(err)
         })         
       })
      }
    })
})

//------------------TIPO DE CONTRATO-----------------------------------------
//SELECCIONAR TIPO DE CONTRATO------------------------------------------
routes.get('/TIPO_CONTRATO', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              req.getConnection((err, conn)=>{
              if(err) return res.send
              conn.query('call PROC_SELECCIONAR_TIPO_CONTRATO', (err, rows)=>{
             if(err) return res.send(err)
            res.json(rows)
        })         
       })
      }
   })
})
//INSERTAR TIPO DE CONTRATO
routes.post('/insertar_tipo_contrato', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{descripcion} = req.body;
              const consulta = `call PROC_INSERTAR_TIPO_CONTRATO('${descripcion}')`;
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
//ACTUALIZAR TIPO DE CONTRATO
routes.put('/actualizar_tipo_contrato', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const{cod_tipo_contrato,descripcion} = req.body;
             const consulta = `call PROC_ACTUALIZAR_TIPO_CONTRATO('${cod_tipo_contrato}','${descripcion}')`;
             req.getConnection((err, conn)=>{
             conn.query(consulta, (err, rows)=>{
             if(!err)
             res.send('Registro se actualizo correctamente')
             else
             console.log(err)
         })         
       })
      }
    })
})
//ELIMINAR TIPO DE CONTRATO
routes.delete('/eliminar_tipo_contrato/:cod_tipo_contrato', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const {cod_tipo_contrato} = req.params;
             const consulta = `call PROC_ELIMINAR_TIPO_CONTRATO(?)`;
             req.getConnection((err, conn)=>{
             conn.query(consulta, [cod_tipo_contrato], (err, rows)=>{
             if(!err)
             res.send('Registro eliminado correctamente')
             else
           console.log(err)
         })         
       })
      }
    })
})
//------------------------EMPLEADOS------------------------------------------
//SELECCIONAR EMPLEADOS------------------------------------------
routes.get('/empleados', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              req.getConnection((err, conn)=>{
              if(err) return res.send
              conn.query('call proc_seleccionar_empleado()', (err, rows)=>{
              if(err) return res.send(err)
            res.json(rows)
         })         
      })
     }
   })
})
//INSERTAR EMPLEADOS
routes.post('/insertar_empleados', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{nombres,apellidos,dni,sexo,direccion,estado_civil,fecha_nacimiento,num_telefono,puestos_id,tipo_contrato_id,tipo_pago,fecha_ingreso,salario} = req.body;
              const consulta = `call PROC_INSERTAR_EMPLEADOS('${nombres}','${apellidos}','${dni}','${sexo}','${direccion}','${estado_civil}','${fecha_nacimiento}','${num_telefono}','${puestos_id}','${tipo_contrato_id}','${tipo_pago}','${fecha_ingreso}','${salario}')`;
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
//ACTUALIZAR EMPLEADOS
routes.put('/actualizar_empleado', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
               const{cod_empleado,puestos_id,tipo_contrato_id,tipo_pago,fecha_ingreso,fecha_egreso,salario,estado_empleado} = req.body;
               const consulta = `call PROC_ACTUALIZAR_EMPLEADOS('${cod_empleado}','${puestos_id}','${tipo_contrato_id}','${tipo_pago}','${fecha_ingreso}','${fecha_egreso}','${salario}','${estado_empleado}')`;
               req.getConnection((err, conn)=>{
               conn.query(consulta, (err, rows)=>{
               if(!err)
               res.send('Registro se actualizo correctamente')
               else
               console.log(err)
            })         
        })
      }
    })
})
///ELIMINAR EMPLEADO
routes.delete('/eliminar_empleado/:cod_empleado', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
               const {cod_empleado} = req.params;
               const consulta = `call PROC_ELIMINAR_EMPLEADOS(?)`;
               req.getConnection((err, conn)=>{
               conn.query(consulta, [cod_empleado], (err, rows)=>{
               if(!err)
               res.send('Registro eliminado correctamente')
               else
              console.log(err)
           })         
        })
      }
   })
})

//------------------------NOMINA------------------------------------------
//SELECCIONAR NOMINA------------------------------------------
routes.get('/nomina', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
               req.getConnection((err, conn)=>{
               if(err) return res.send
               conn.query('call proc_seleccionar_nominas()', (err, rows)=>{
               if(err) return res.send(err)
               res.json(rows)
            })         
        })
      }
    })
})
//INSERTAR NOMINA
routes.post('/insertar_nomina', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
               const{cod_persona,dias_laborados,monto_devengado,monto_neto,cod_deduccion} = req.body;
               const consulta = `call PROC_INSERTAR_NOMINAS('${cod_persona}','${dias_laborados}','${monto_devengado}','${monto_neto}','${cod_deduccion}')`;
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
//ACTUALIZAR NOMINA
routes.put('/actualizar_nomina', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{cod_nomina,cod_persona,dias_laborados,monto_devengado,monto_neto,cod_deduccion} = req.body;
              const consulta = `call PROC_ACTUALIZAR_NOMINAS('${cod_nomina}','${cod_persona}','${dias_laborados}','${monto_devengado}','${monto_neto}','${cod_deduccion}')`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, (err, rows)=>{
              if(!err)
              res.send('Registro se actualizo correctamente')
              else
              console.log(err)
            })         
         })
       }
    })
})
///ELIMINAR EMPLEADO
routes.delete('/eliminar_nomina/:cod_nomina', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const {cod_nomina} = req.params;
              const consulta = `call PROC_ELIMINAR_NOMINAS(?)`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, [cod_nomina], (err, rows)=>{
              if(!err)
              res.send('Registro eliminado correctamente')
              else
              console.log(err)
            })         
         })
       }
    })
})

//-------------------DEDUCCIONES------------------------------------------
//SELECCIONAR DEDUCCIONES------------------------------------------
routes.get('/deduccion', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              req.getConnection((err, conn)=>{
              if(err) return res.send
              conn.query('call PROC_SELECCIONAR_DEDUCCIONES', (err, rows)=>{
              if(err) return res.send(err)
               res.json(rows)
            })         
         })
       }
    })
})
//INSERTAR DEDUCCION
routes.post('/insertar_deduccion', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
               const{cod_persona ,fecha_efectiva ,monto_deducir ,descripcion_deduccion} = req.body;
               const consulta = `call PROC_INSERTAR_DEDUCCIONES('${cod_persona }','${fecha_efectiva}','${monto_deducir}','${descripcion_deduccion}')`;
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
//ACTUALIZAR DEDUCCION
routes.put('/actualizar_deduccion', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
              const{cod_deduccion,cod_persona ,fecha_efectiva ,monto_deducir ,descripcion_deduccion} = req.body;
              const consulta = `call PROC_ACTUALIZAR_DEDUCCIONES('${cod_deduccion }','${cod_persona }','${fecha_efectiva}','${monto_deducir}','${descripcion_deduccion}')`;
              req.getConnection((err, conn)=>{
              conn.query(consulta, (err, rows)=>{
              if(!err)
              res.send('Registro se actualizo correctamente')
              else
              console.log(err)
            })         
          })
       }
    })
})
//ELIMINAR DEDEUCCION
routes.delete('/eliminar_deduccion/:cod_deduccion', ensureToken, function (req,res){
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if(err) {
            res.send('ACCESO DENEGADO')
        }else{
             const {cod_deduccion} = req.params;
             const consulta = `call PROC_ELIMINAR_DEDUCIONES(?)`;
             req.getConnection((err, conn)=>{
             conn.query(consulta, [cod_deduccion], (err, rows)=>{
             if(!err)
             res.send('Registro eliminado correctamente')
             else
             console.log(err)
            })         
         })
       }
    })
})


module.exports = routes
