import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los suscriptores
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, email, nombre, fecha, activo
      FROM Newsletter
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener suscriptores:', error);
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
    const existing = await pool.query('SELECT id FROM Newsletter WHERE email = $1', [email]);
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está suscrito' });
    }

    await pool.query(
      'INSERT INTO Newsletter (email, nombre, fecha, activo) VALUES ($1, $2, NOW(), true)',
      [email, nombre || '']
    );
    
    res.json({ mensaje: 'Suscripción exitosa' });
  } catch (error) {
    console.error('Error al suscribir:', error);
    res.status(500).json({ error: 'Error al suscribir' });
  }
});

// Cancelar suscripción
router.delete('/:email', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Newsletter WHERE email = $1', [req.params.email]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }
    res.json({ mensaje: 'Suscripción cancelada correctamente' });
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ error: 'Error al cancelar suscripción' });
  }
});

// Activar/desactivar suscripción
router.put('/:email/toggle', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Newsletter SET activo = NOT activo WHERE email = $1',
      [req.params.email]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }
    res.json({ mensaje: 'Estado de suscripción actualizado' });
  } catch (error) {
    console.error('Error al actualizar suscripción:', error);
    res.status(500).json({ error: 'Error al actualizar suscripción' });
  }
});

export default router;

