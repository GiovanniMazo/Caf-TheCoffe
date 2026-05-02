import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, nombre, descripcion, precio, imagen, categoria_id, stock, activo, fecha_creacion
      FROM Productos
      ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, nombre, descripcion, precio, imagen, categoria_id, stock, activo FROM Productos WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Crear producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, imagen, categoria_id, stock } = req.body;
  
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  try {
    const pool = await getPool();
    const result = await pool.query(
      'INSERT INTO Productos (nombre, descripcion, precio, imagen, categoria_id, stock, activo, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6, true, NOW()) RETURNING id',
      [nombre, descripcion || '', precio, imagen || '', categoria_id || null, stock || 0]
    );
    
    res.json({ mensaje: 'Producto creado correctamente', id: result.rows[0].id });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, precio, imagen, categoria_id, stock, activo } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, categoria_id = $5, stock = $6, activo = $7 WHERE id = $8',
      [nombre, descripcion || '', precio, imagen || '', categoria_id || null, stock || 0, activo !== undefined ? activo : true, req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Productos WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;

