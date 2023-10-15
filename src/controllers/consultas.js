// Importar los módulos necesarios
const { Pool } = require('pg'); // Módulo para la conexión con PostgreSQL
const format = require('pg-format'); // Módulo para formatear las consultas SQL
require('dotenv').config(); // Módulo para cargar variables de entorno desde un archivo .env


//configuramos el entorno del servidor de conexion a pg
const conexion =  new Pool({
    user: process.env.DBP_USER,
    host: process.env.DBP_SERVER,
    database: process.env.DBP_DATABASE,
    password: process.env.DBP_PASSWORD,
    port: process.env.DBP_PORT,
    allowExitOnIdle: true,
    max:20   
});

const obtenerJoyas = async ({ limits = 10, order_by ="id_ASC",page = 1}) => {
    try {
        const [campo, direccion] = order_by.split("_");
        
        //Bloque que permite que la página 1 sea la primera, al igual que la página 0. También transforma las páginas con valor negativo a positivo. 
        let fix;
        if (!page) fix = 0;
        else if (page==0) fix = 0;
        else fix = Math.abs(page)-1;
        
        const offset = (fix * limits);
     
        const consulta = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, offset);
        const result = await conexion.query(consulta);
        const joyas = result.rows;

        const HATEOAS = await prepararHATEOAS(joyas);
        return (HATEOAS);
    } catch (error) {
        console.log("Error al obtener las joyas");
    }

}

const obtenerJoyasFiltros= async({precio_min,precio_max, categoria, metal})=>{
    try {
        let filtros = [];
        let values = [];
        console.log ("hol1");  

        // Función auxiliar para agregar un filtro a la consulta
        const agregarFiltro = (campo, comparador, valor) => {
            values.push(valor);
            const { length } = filtros;
            filtros.push(`${campo} ${comparador} $${length + 1}`);
        };

        if (precio_max) agregarFiltro('precio', '<=', precio_max);
        if (precio_min) agregarFiltro('precio', '>=', precio_min);
        if (categoria) agregarFiltro('categoria', 'LIKE', `%${categoria}%`);
        if (metal) agregarFiltro('metal', 'LIKE', `%${metal}%`);

        let consulta = "SELECT * FROM inventario";

        if (filtros.length > 0) {
            filtros = filtros.join(" AND ");
            consulta += ` WHERE ${filtros}`;
        }

        const result = await conexion.query(consulta, values);
        const joyas = result.rows;

        return(joyas);
    } catch (error) {
        console.log(error);
    }
};

// Función para preparar un objeto HATEOAS
const prepararHATEOAS = (joyas) => {
    try {
        const results = joyas.map((m) => {
            return {
                name: m.nombre,
                href: `/joyas/joya/${m.id}`,
            };
        }).slice(0, 6);

        const total = joyas.length;
        const stockTotal = joyas.reduce((total, producto) => total + producto.stock, 0);

        const HATEOAS = {
            total,
            stockTotal,
            results,
        };

        return HATEOAS;
    } catch (error) {
        res.status(500).json({ error: "Error realizar HATEOAS." });
    }
};

module.exports ={obtenerJoyas,obtenerJoyasFiltros};
