import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los suscriptores
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, email, nombre, fecha, activo
      FROM dbo.Newsletter
      ORDER BY fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener suscriptores:', error);
    res.status(500).json({ error: 'Error al obtener suscriptores' });
  }
});

// Suscribirse al newsletter
router.post('/', async (req, res) => {
  const { email, nombre } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  try {
    const pool = await getPool();
    
    // Verificar si el email ya está registrado
    const existing = await pool.request()
      .input('email', email)
      .query('SELECT id FROM dbo.Newsletter WHERE email = @email');
    
    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: 'El email ya está suscrito' });
    }

    await pool.request()
      .input('email', email)
      .input('nombre', nombre || '')
      .query('INSERT INTO dbo.Newsletter (email, nombre, fecha, activo) VALUES (@email, @nombre, GETDATE(), 1)');
    
    res.json({ mensaje: '✅ Suscripción exitosa' });
  } catch (error) {
    console.error('❌ Error al suscribir:', error);
    res.status(500).json({ error: 'Error al suscribir' });
  }
});

// Cancelar suscripción
router.delete('/:email', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('email', req.params.email)
      .query('DELETE FROM dbo.Newsletter WHERE email = @email');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }
    res.json({ mensaje: '✅ Suscripción cancelada correctamente' });
  } catch (error) {
    console.error('❌ Error al cancelar suscripción:', error);
    res.status(500).json({ error: 'Error al cancelar suscripción' });
  }
});

// Activar/desactivar suscripción
router.put('/:email/toggle', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('email', req.params.email)
      .query('UPDATE dbo.Newsletter SET activo = CASE WHEN activo = 1 THEN 0 ELSE 1 END WHERE email = @email');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }
    res.json({ mensaje: '✅ Estado de suscripción actualizado' });
  } catch (error) {
    console.error('❌ Error al actualizar suscripción:', error);
    res.status(500).json({ error: 'Error al actualizar suscripción' });
  }
});

export default router;

