import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los mensajes de contacto
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, nombre, email, mensaje, fecha, leido
      FROM dbo.Contacto
      ORDER BY fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener mensajes de contacto:', error);
    res.status(500).json({ error: 'Error al obtener mensajes de contacto' });
  }
});

// Obtener mensaje por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, nombre, email, mensaje, fecha, leido FROM dbo.Contacto WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener mensaje:', error);
    res.status(500).json({ error: 'Error al obtener mensaje' });
  }
});

// Enviar mensaje de contacto
router.post('/', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
  }

  try {
    const pool = await getPool();
    await pool.request()
      .input('nombre', nombre)
      .input('email', email)
      .input('mensaje', mensaje)
      .query('INSERT INTO dbo.Contacto (nombre, email, mensaje, fecha, leido) VALUES (@nombre, @email, @mensaje, GETDATE(), 0)');
    
    res.json({ mensaje: '✅ Mensaje enviado correctamente' });
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Marcar mensaje como leído
router.put('/:id/read', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('UPDATE dbo.Contacto SET leido = 1 WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ mensaje: '✅ Mensaje marcado como leído' });
  } catch (error) {
    console.error('❌ Error al marcar mensaje:', error);
    res.status(500).json({ error: 'Error al marcar mensaje' });
  }
});

// Eliminar mensaje
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Contacto WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ mensaje: '✅ Mensaje eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar mensaje:', error);
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
});

export default router;

