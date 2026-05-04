import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, cliente, total, userId, fecha
      FROM Ordenes
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

router.post('/', async (req, res) => {
  const { cliente, total, userId } = req.body;
  if (!cliente || !total) {
    return res.status(400).json({ error: 'Faltan datos de la orden' });
  }

  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO Ordenes (cliente, total, userId) VALUES ($1, $2, $3)',
      [cliente, total, userId || null]
    );
    
    res.json({ mensaje: 'Orden registrada correctamente' });
  } catch (error) {
    console.error('Error al registrar orden:', error);
    res.status(500).json({ error: 'Error al registrar la orden' });
  }
});

export default router;

