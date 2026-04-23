import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { cliente, total, userId } = req.body;
  if (!cliente || !total) {
    return res.status(400).json({ error: 'Faltan datos de la orden' });
  }

  try {
    const pool = await getPool();
    await pool.request()
      .input('cliente', cliente)
      .input('total', total)
      .input('userId', userId || null)
      .query(`
        INSERT INTO dbo.Ordenes (cliente, total, userId) 
        VALUES (@cliente, @total, @userId)
      `);
    
    res.json({ mensaje: '✅ Orden registrada correctamente' });
  } catch (error) {
    console.error('❌ Error al registrar orden:', error);
    res.status(500).json({ error: 'Error al registrar la orden' });
  }
});

export default router;

