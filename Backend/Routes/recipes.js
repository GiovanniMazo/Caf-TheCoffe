import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha
      FROM Recetas
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Obtener receta por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha FROM Recetas WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener receta:', error);
    res.status(500).json({ error: 'Error al obtener receta' });
  }
});

// Crear nueva receta
router.post('/', async (req, res) => {
  const { titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen } = req.body;
  
  if (!titulo || !instrucciones) {
    return res.status(400).json({ error: 'Título e instrucciones son requeridos' });
  }

  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO Recetas (titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
      [titulo, descripcion || '', ingredientes || '', instrucciones, tiempo_preparacion || 0, dificultad || 'Fácil', imagen || '']
    );
    
    res.json({ mensaje: 'Receta creada correctamente' });
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ error: 'Error al crear receta' });
  }
});

// Actualizar receta
router.put('/:id', async (req, res) => {
  const { titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Recetas SET titulo = $1, descripcion = $2, ingredientes = $3, instrucciones = $4, tiempo_preparacion = $5, dificultad = $6, imagen = $7 WHERE id = $8',
      [titulo, descripcion || '', ingredientes || '', instrucciones, tiempo_preparacion || 0, dificultad || 'Fácil', imagen || '', req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json({ mensaje: 'Receta actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ error: 'Error al actualizar receta' });
  }
});

// Eliminar receta
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Recetas WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json({ mensaje: 'Receta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar receta:', error);
    res.status(500).json({ error: 'Error al eliminar receta' });
  }
});

export default router;

