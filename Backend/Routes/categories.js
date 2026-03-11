import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, nombre, descripcion, imagen
      FROM dbo.Categorias
      ORDER BY id ASC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Obtener categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, nombre, descripcion, imagen FROM dbo.Categorias WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener categoría:', error);
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
    await pool.request()
      .input('nombre', nombre)
      .input('descripcion', descripcion || '')
      .input('imagen', imagen || '')
      .query('INSERT INTO dbo.Categorias (nombre, descripcion, imagen) VALUES (@nombre, @descripcion, @imagen)');
    
    res.json({ mensaje: '✅ Categoría creada correctamente' });
  } catch (error) {
    console.error('❌ Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar categoría
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .input('nombre', nombre)
      .input('descripcion', descripcion || '')
      .input('imagen', imagen || '')
      .query('UPDATE dbo.Categorias SET nombre = @nombre, descripcion = @descripcion, imagen = @imagen WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ mensaje: '✅ Categoría actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Categorias WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ mensaje: '✅ Categoría eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

export default router;

