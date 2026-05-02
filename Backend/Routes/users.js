import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT id, nombre, email, telefono, direccion, fecha_registro, rol
      FROM Usuarios
      ORDER BY fecha_registro DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(
      'SELECT id, nombre, email, telefono, direccion, fecha_registro, rol FROM Usuarios WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Registrar nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, password, telefono, direccion } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  try {
    const pool = await getPool();
    
    // Verificar si el email ya existe
    const existing = await pool.query('SELECT id FROM Usuarios WHERE email = $1', [email]);
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    await pool.query(
      'INSERT INTO Usuarios (nombre, email, password, telefono, direccion, rol, fecha_registro) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [nombre, email, password, telefono || '', direccion || '', 'cliente']
    );
    
    res.json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const pool = await getPool();
    
    // Verificar si el email existe
    const emailCheck = await pool.query('SELECT id FROM Usuarios WHERE email = $1', [email]);
    
    if (emailCheck.rows.length === 0) {
      return res.status(401).json({ error: 'Este email no está registrado. Por favor crea una cuenta primero.' });
    }
    
    // Verificar credenciales
    const result = await pool.query(
      'SELECT id, nombre, email, telefono, direccion, rol FROM Usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const user = result.rows[0];
    res.json({ 
      mensaje: 'Login exitoso',
      user
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Login de administrador
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const pool = await getPool();
    
    // Verificar credenciales y que sea admin
    const result = await pool.query(
      "SELECT id, nombre, email, telefono, direccion, rol FROM Usuarios WHERE email = $1 AND password = $2 AND rol = 'admin'",
      [email, password]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales de administrador incorrectas.' });
    }
    
    const user = result.rows[0];
    res.json({ 
      mensaje: 'Login de administrador exitoso',
      user
    });
  } catch (error) {
    console.error('Error al iniciar sesión de admin:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { nombre, email, telefono, direccion, rol } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.query(
      'UPDATE Usuarios SET nombre = $1, email = $2, telefono = $3, direccion = $4, rol = $5 WHERE id = $6',
      [nombre, email, telefono || '', direccion || '', rol || 'cliente', req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query('DELETE FROM Usuarios WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

export default router;

