import { conexion } from "../db.js"

export const getProductos = async (req, res) => {
    try {
        const [rows] = await conexion.query('SELECT id,id_categoria,codigo,descripcion,imagen,stock,precio_compra,precio_venta,ventas,fecha FROM productos')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar"
        })
    }
}


export const getProducto = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await conexion.query('SELECT id,id_categoria,codigo,descripcion,imagen,stock,precio_compra,precio_venta,ventas,fecha FROM productos WHERE id = ?', [id])
        if (rows.length <= 0)
            return res.status(400).json({
                Message: "No exite el producto"
            })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar"
        })
    }
}



export const CreateProductos = async (req, res) => {
    try {
        const { idCategoria, codigo, descripcion, imagen, stock, precioCompra, precioVenta, ventas } = req.body
        const [rows] = await conexion.query('INSERT INTO tiendita.productos (id_categoria,codigo,descripcion,imagen,stock,precio_compra,precio_venta,ventas) VALUES(?,?,?,?,?,?,?,?)', [idCategoria, codigo, descripcion, imagen, stock, precioCompra, precioVenta, ventas])
        res.send({

            id: rows.insertId,
            idCategoria,
            codigo, descripcion, imagen, stock, precioCompra, precioVenta, ventas
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar"
        })
    }

};


export const ActualizaProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCategoria, codigo, descripcion, imagen, stock, precioCompra, precioVenta, ventas } = req.body
        const [result] = await conexion.query('UPDATE productos  SET id_categoria = IFNULL(?,id_categoria), codigo= IFNULL(?,codigo), descripcion=IFNULL(?,descripcion),imagen=IFNULL(?,imagen),stock= IFNULL(?,stock),precio_compra=IFNULL(?,precio_compra),precio_venta=IFNULL(?,precio_venta),ventas= IFNULL(?,ventas) WHERE id = ?', [idCategoria, codigo, descripcion, imagen, stock, precioCompra, precioVenta, ventas, id])

        if (result.affectedRows <= 0)
            return res.status(400).json({
                Message: "No se edito ningun producto"
            })

        const [rows] = await conexion.query('SELECT id,id_categoria,codigo,descripcion,imagen,stock,precio_compra,precio_venta,ventas,fecha FROM productos WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar"
        })
    }

}


export const EliminaProductos = async (req, res) => {
    try {
        const [result] = await conexion.query('DELETE FROM productos WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0)
            return res.status(404).json({
                Message: "No se elimino el producto"
            })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar"
        })
    }
}


