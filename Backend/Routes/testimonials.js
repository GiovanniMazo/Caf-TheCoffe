import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los testimonios
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, nombre, comentario, calificacion, fecha, imagen
      FROM dbo.Testimonios
      ORDER BY fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener testimonios:', error);
    res.status(500).json({ error: 'Error al obtener testimonios' });
  }
});

// Obtener testimonio por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, nombre, comentario, calificacion, fecha, imagen FROM dbo.Testimonios WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener testimonio:', error);
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
    await pool.request()
      .input('nombre', nombre)
      .input('comentario', comentario)
      .input('calificacion', calificacion)
      .input('imagen', imagen || '')
      .query('INSERT INTO dbo.Testimonios (nombre, comentario, calificacion, imagen, fecha) VALUES (@nombre, @comentario, @calificacion, @imagen, GETDATE())');
    
    res.json({ mensaje: '✅ Testimonio creado correctamente' });
  } catch (error) {
    console.error('❌ Error al crear testimonio:', error);
    res.status(500).json({ error: 'Error al crear testimonio' });
  }
});

// Actualizar testimonio
router.put('/:id', async (req, res) => {
  const { nombre, comentario, calificacion, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .input('nombre', nombre)
      .input('comentario', comentario)
      .input('calificacion', calificacion)
      .input('imagen', imagen || '')
      .query('UPDATE dbo.Testimonios SET nombre = @nombre, comentario = @comentario, calificacion = @calificacion, imagen = @imagen WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json({ mensaje: '✅ Testimonio actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar testimonio:', error);
    res.status(500).json({ error: 'Error al actualizar testimonio' });
  }
});

// Eliminar testimonio
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Testimonios WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    res.json({ mensaje: '✅ Testimonio eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar testimonio:', error);
    res.status(500).json({ error: 'Error al eliminar testimonio' });
  }
});

export default router;

