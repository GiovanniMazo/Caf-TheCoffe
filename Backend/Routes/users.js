import express from 'express';
import { getPool } from '../database.js';
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, nombre, email, telefono, direccion, fecha_registro, rol
      FROM dbo.Usuarios
      ORDER BY fecha_registro DESC
    `);
    // No devolver contraseñas
    const users = result.recordset.map(user => ({
      ...user,
      password: undefined
    }));
    res.json(users);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT id, nombre, email, telefono, direccion, fecha_registro, rol FROM dbo.Usuarios WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const user = result.recordset[0];
    user.password = undefined;
    res.json(user);
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
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
    const existing = await pool.request()
      .input('email', email)
      .query('SELECT id FROM dbo.Usuarios WHERE email = @email');
    
    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    await pool.request()
      .input('nombre', nombre)
      .input('email', email)
      .input('password', password) // En producción, usar hash: bcrypt
      .input('telefono', telefono || '')
      .input('direccion', direccion || '')
      .input('rol', 'cliente')
      .query('INSERT INTO dbo.Usuarios (nombre, email, password, telefono, direccion, rol, fecha_registro) VALUES (@nombre, @email, @password, @telefono, @direccion, @rol, GETDATE())');
    
    res.json({ mensaje: '✅ Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
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
    const emailCheck = await pool.request()
      .input('email', email)
      .query('SELECT id FROM dbo.Usuarios WHERE email = @email');
    
    if (emailCheck.recordset.length === 0) {
      return res.status(401).json({ error: 'Este email no está registrado. Por favor crea una cuenta primero.' });
    }
    
    // Verificar credenciales
    const result = await pool.request()
      .input('email', email)
      .input('password', password)
      .query('SELECT id, nombre, email, telefono, direccion, rol FROM dbo.Usuarios WHERE email = @email AND password = @password');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const user = result.recordset[0];
    res.json({ 
      mensaje: '✅ Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { nombre, email, telefono, direccion, rol } = req.body;
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .input('nombre', nombre)
      .input('email', email)
      .input('telefono', telefono || '')
      .input('direccion', direccion || '')
      .input('rol', rol || 'cliente')
      .query('UPDATE dbo.Usuarios SET nombre = @nombre, email = @email, telefono = @telefono, direccion = @direccion, rol = @rol WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: '✅ Usuario actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Usuarios WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: '✅ Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

export default router;

