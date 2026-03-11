import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los posts del blog
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, titulo, contenido, autor, imagen, fecha, categoria
      FROM dbo.Blog
      ORDER BY fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener posts del blog:', error);
    res.status(500).json({ error: 'Error al obtener posts del blog' });
  }
});

// Obtener post por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, titulo, contenido, autor, imagen, fecha, categoria FROM dbo.Blog WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener post:', error);
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
    await pool.request()
      .input('titulo', titulo)
      .input('contenido', contenido)
      .input('autor', autor || 'Admin')
      .input('imagen', imagen || '')
      .input('categoria', categoria || 'General')
      .query('INSERT INTO dbo.Blog (titulo, contenido, autor, imagen, categoria, fecha) VALUES (@titulo, @contenido, @autor, @imagen, @categoria, GETDATE())');
    
    res.json({ mensaje: '✅ Post creado correctamente' });
  } catch (error) {
    console.error('❌ Error al crear post:', error);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Actualizar post
router.put('/:id', async (req, res) => {
  const { titulo, contenido, autor, imagen, categoria } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .input('titulo', titulo)
      .input('contenido', contenido)
      .input('autor', autor || 'Admin')
      .input('imagen', imagen || '')
      .input('categoria', categoria || 'General')
      .query('UPDATE dbo.Blog SET titulo = @titulo, contenido = @contenido, autor = @autor, imagen = @imagen, categoria = @categoria WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ mensaje: '✅ Post actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar post:', error);
    res.status(500).json({ error: 'Error al actualizar post' });
  }
});

// Eliminar post
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Blog WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ mensaje: '✅ Post eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar post:', error);
    res.status(500).json({ error: 'Error al eliminar post' });
  }
});

export default router;

