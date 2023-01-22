import { Router } from "express";
import { getProductos,getProducto,ActualizaProductos,CreateProductos,EliminaProductos } from "../controllers/productos.controller.js";
import multer from "multer";

const router = Router()

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'C:/xampp/htdocs/Tienda/View/img/productos/')
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    },
})

const upload  = multer({storage})

router.get('/Productos',getProductos )

router.get('/Productos/:id',getProducto )

router.post('/Productos', CreateProductos)

router.put('/Productos/:id', ActualizaProductos )

router.delete('/Productos/:id',EliminaProductos)

router.post('/SubirImagen',upload.single('file'), (req, res)=> {
    res.send({

        url: req.file.filename
    })
})


export default router