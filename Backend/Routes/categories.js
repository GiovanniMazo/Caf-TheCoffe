import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, nombre, descripcion, imagen
      FROM Categorias
      ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Obtener categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, nombre, descripcion, imagen FROM Categorias WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
});

// Crear nueva categoría
router.post('/', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
  }

  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO Categorias (nombre, descripcion, imagen) VALUES ($1, $2, $3)',
      [nombre, descripcion || '', imagen || '']
    );
    
    res.json({ mensaje: 'Categoría creada correctamente' });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar categoría
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Categorias SET nombre = $1, descripcion = $2, imagen = $3 WHERE id = $4',
      [nombre, descripcion || '', imagen || '', req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ mensaje: 'Categoría actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Categorias WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

export default router;

