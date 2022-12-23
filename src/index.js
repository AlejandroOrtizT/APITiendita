import express from "express";
import  productosRoutes  from "./routes/productos.routes.js";


const tiendita = express();

tiendita.use(express.json())

tiendita.use('/api',productosRoutes)

tiendita.listen(3000);
console.log("Iniciando servidor");
