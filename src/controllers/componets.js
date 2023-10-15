
const { obtenerJoyas,obtenerJoyasFiltros} = require('./consultas') 

const getObtenerjoyas = async(req,res,next)=>{
    try {
          reportMiddleware(req, res);
     
          const queryString  = req.query;
          const joyas = await obtenerJoyas(queryString)
         
          res.json(joyas)
      } catch (error) {
          res.status(500).json({ error: "Error al obtener las joyas" });
    }
} 

const getObtenerjoyasfiltro = async(req,res)=>{
    try {
         reportMiddleware(req, res);
         const queryString  = req.query;
         const joyas = await obtenerJoyasFiltros(queryString)
       
         res.json(joyas)
      } catch (error) {
        res.status(500).json({ error: "Error al obtener las joyas por filtro." });
 
      }
} 

const getDefautl =(req, res)=>{
    res.status(404).send("Esta ruta no existe");
}

// Middleware para registrar información de las solicitudes recibidas
const reportMiddleware = (req, res) => {
    try {
        fecha=new Date().toLocaleString('es-Es');
        console.log(`---------------------`);
        console.log(`SOLICITUD DESDE LA WEB`);
        console.log('Url Origen:', req.hostname);
        console.log(`Solicitud Enviada: ${req.method}`);
        console.log(`EndPoint: ${req.path}`);
        console.log("Fecha Solicitud: ",fecha);
        if (Object.keys(req.params).length > 0) console.log('req.params:', JSON.stringify(req.params, null, 2));
        if (Object.keys(req.query).length > 0) console.log('req.query: ', JSON.stringify(req.query, null, 2));
        
        console.log(`---------------------`);
        return;
    } catch (error) {
        res.status(500).json({ error: "Error al obtener al realizar el reporte." });
    }
};
module.exports={getObtenerjoyas,getObtenerjoyasfiltro,getDefautl};
