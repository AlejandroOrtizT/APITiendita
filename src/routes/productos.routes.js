import { Router } from "express";
import { getProductos,getProducto,ActualizaProductos,CreateProductos,EliminaProductos } from "../controllers/productos.controller.js";

const router = Router()

router.get('/Productos',getProductos )

router.get('/Productos/:id',getProducto )

router.post('/Productos', CreateProductos)

router.put('/Productos/:id', ActualizaProductos )

router.delete('/Productos/:id',EliminaProductos)


export default router