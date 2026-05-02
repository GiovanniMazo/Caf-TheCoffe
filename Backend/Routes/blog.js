import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los posts del blog
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, titulo, contenido, autor, imagen, fecha, categoria
      FROM Blog
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener posts del blog:', error);
    res.status(500).json({ error: 'Error al obtener posts del blog' });
  }
});

// Obtener post por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, titulo, contenido, autor, imagen, fecha, categoria FROM Blog WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({ error: 'Error al obtener post' });
  }
});

// Crear nuevo post
router.post('/', async (req, res) => {
  const { titulo, contenido, autor, imagen, categoria } = req.body;
  
  if (!titulo || !contenido) {
    return res.status(400).json({ error: 'Título y contenido son requeridos' });
  }

  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO Blog (titulo, contenido, autor, imagen, categoria, fecha) VALUES ($1, $2, $3, $4, $5, NOW())',
      [titulo, contenido, autor || 'Admin', imagen || '', categoria || 'General']
    );
    
    res.json({ mensaje: 'Post creado correctamente' });
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Actualizar post
router.put('/:id', async (req, res) => {
  const { titulo, contenido, autor, imagen, categoria } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Blog SET titulo = $1, contenido = $2, autor = $3, imagen = $4, categoria = $5 WHERE id = $6',
      [titulo, contenido, autor || 'Admin', imagen || '', categoria || 'General', req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ mensaje: 'Post actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar post:', error);
    res.status(500).json({ error: 'Error al actualizar post' });
  }
});

// Eliminar post
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Blog WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ mensaje: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({ error: 'Error al eliminar post' });
  }
});

export default router;

