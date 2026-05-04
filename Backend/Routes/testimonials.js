import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los testimonios
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, nombre, comentario, calificacion, fecha, imagen
      FROM Testimonios
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    res.status(500).json({ error: 'Error al obtener testimonios' });
  }
});

// Obtener testimonio por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, nombre, comentario, calificacion, fecha, imagen FROM Testimonios WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener testimonio:', error);
    res.status(500).json({ error: 'Error al obtener testimonio' });
  }
});

// Crear nuevo testimonio
router.post('/', async (req, res) => {
  const { nombre, comentario, calificacion, imagen } = req.body;
  
  if (!nombre || !comentario || !calificacion) {
    return res.status(400).json({ error: 'Nombre, comentario y calificación son requeridos' });
  }

  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO Testimonios (nombre, comentario, calificacion, imagen, fecha) VALUES ($1, $2, $3, $4, NOW())',
      [nombre, comentario, calificacion, imagen || '']
    );
    
    res.json({ mensaje: 'Testimonio creado correctamente' });
  } catch (error) {
    console.error('Error al crear testimonio:', error);
    res.status(500).json({ error: 'Error al crear testimonio' });
  }
});

// Actualizar testimonio
router.put('/:id', async (req, res) => {
  const { nombre, comentario, calificacion, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Testimonios SET nombre = $1, comentario = $2, calificacion = $3, imagen = $4 WHERE id = $5',
      [nombre, comentario, calificacion, imagen || '', req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json({ mensaje: 'Testimonio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar testimonio:', error);
    res.status(500).json({ error: 'Error al actualizar testimonio' });
  }
});

// Eliminar testimonio
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Testimonios WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json({ mensaje: 'Testimonio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar testimonio:', error);
    res.status(500).json({ error: 'Error al eliminar testimonio' });
  }
});

export default router;

