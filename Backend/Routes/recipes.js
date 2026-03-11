import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha
      FROM dbo.Recetas
      ORDER BY fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener recetas:', error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Obtener receta por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha FROM dbo.Recetas WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener receta:', error);
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
    await pool.request()
      .input('titulo', titulo)
      .input('descripcion', descripcion || '')
      .input('ingredientes', ingredientes || '')
      .input('instrucciones', instrucciones)
      .input('tiempo_preparacion', tiempo_preparacion || 0)
      .input('dificultad', dificultad || 'Fácil')
      .input('imagen', imagen || '')
      .query('INSERT INTO dbo.Recetas (titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen, fecha) VALUES (@titulo, @descripcion, @ingredientes, @instrucciones, @tiempo_preparacion, @dificultad, @imagen, GETDATE())');
    
    res.json({ mensaje: '✅ Receta creada correctamente' });
  } catch (error) {
    console.error('❌ Error al crear receta:', error);
    res.status(500).json({ error: 'Error al crear receta' });
  }
});

// Actualizar receta
router.put('/:id', async (req, res) => {
  const { titulo, descripcion, ingredientes, instrucciones, tiempo_preparacion, dificultad, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .input('titulo', titulo)
      .input('descripcion', descripcion || '')
      .input('ingredientes', ingredientes || '')
      .input('instrucciones', instrucciones)
      .input('tiempo_preparacion', tiempo_preparacion || 0)
      .input('dificultad', dificultad || 'Fácil')
      .input('imagen', imagen || '')
      .query('UPDATE dbo.Recetas SET titulo = @titulo, descripcion = @descripcion, ingredientes = @ingredientes, instrucciones = @instrucciones, tiempo_preparacion = @tiempo_preparacion, dificultad = @dificultad, imagen = @imagen WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json({ mensaje: '✅ Receta actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar receta:', error);
    res.status(500).json({ error: 'Error al actualizar receta' });
  }
});

// Eliminar receta
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Recetas WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json({ mensaje: '✅ Receta eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar receta:', error);
    res.status(500).json({ error: 'Error al eliminar receta' });
  }
});

export default router;

