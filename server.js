const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (Usando la variable de Render)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err));

// Esquema para los productos de la Ferretería
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
});
const Producto = mongoose.model('Producto', ProductoSchema);

// RUTA PARA OBTENER PRODUCTOS (GET)
app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// RUTA PARA GUARDAR PRODUCTOS (POST)
app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json(nuevoProducto);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
