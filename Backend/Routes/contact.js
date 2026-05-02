import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los mensajes de contacto
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, nombre, email, mensaje, fecha, leido
      FROM Contacto
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mensajes de contacto:', error);
    res.status(500).json({ error: 'Error al obtener mensajes de contacto' });
  }
});

// Obtener mensaje por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, nombre, email, mensaje, fecha, leido FROM Contacto WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener mensaje:', error);
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
    await pool.query(
      'INSERT INTO Contacto (nombre, email, mensaje, fecha, leido) VALUES ($1, $2, $3, NOW(), false)',
      [nombre, email, mensaje]
    );
    
    res.json({ mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Marcar mensaje como leído
router.put('/:id/read', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Contacto SET leido = true WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ mensaje: 'Mensaje marcado como leído' });
  } catch (error) {
    console.error('Error al marcar mensaje:', error);
    res.status(500).json({ error: 'Error al marcar mensaje' });
  }
});

// Eliminar mensaje
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Contacto WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ mensaje: 'Mensaje eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar mensaje:', error);
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
});

export default router;

