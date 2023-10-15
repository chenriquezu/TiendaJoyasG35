# tienda de joyas 

>Diseño avanzado de API REST.
    1.-Obtiene información sobre las joyas disponibles dentro de la BD.
    2.-Obtiene información sobre las joyas disponibles dentro de la BD por diferentes Criterios.

## Archivo Configuración .ENV
    existe un archivo .env el cual tiene la configuración de los puertos de uso de express y la configuración de la base de datos.

### Rutas disponibles

- GET /joyas: Obtiene información y la despliega en una  estructura HATEOAS. 
- GET /joyas/filtros: Filtra las joyas por diferentes criterios.
### Middlewares

El servidor utiliza un middleware que es llamado dentro de cada Api, para poder entregar información de las peticiones solicitadas.

### try-catch

Se utiliza controladores de errores try...catch.
