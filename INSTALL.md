# Proyecto consumo de api publica de peliculas

## 2. Instalación

### Clonación del proyecto e instalación de dependencias

```bash
# Clonación del proyecto
git clone 

# Ingresamos a las respectivas carpetas del proyecto
cd backend
cd frontend

# Ejecutamos el siguiente comando en las dos carpetas para instalar las dependencias
npm install
```

### Archivos de configuración.


Crear archivos de configuración.

```bash
# Para BACKEND
# Variables de entorno globales
cp .env.sample .env

```

Para FRONTEND

- 1: Configuracion del PORT_URL, dirigirse a las siguentes carpetas .

```bash
# Para FRONTEND
src/config/constants.js  # Colocar el PORT_URL para la conexion con el backend.

```


- 2: Configuracion de la API peliculas, dirigirse a las siguentes carpetas .

```bash
# Para FRONTEND
src/helpers/getItems.js  # Colocar API_URL del servico externo (http://www.omdbapi.com)

```

## Despliegue de la aplicación

```bash
# Ejecución en modo desarrollo en backend y frontend
npm run start
```

## Funcionalidades

- Autenticación JWT
- Registro de nuevos usuarios
- Mostrar la lista de peliculas
- Ver información de cada pelicula
- Agregar a mis peliculas
- Cambio de theme dark o light 
- Responsivo
