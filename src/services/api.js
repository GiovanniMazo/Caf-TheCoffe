import axios from 'axios';

const API_URL = "http://localhost:4000/api";

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    await axios.get(`${API_URL}/products`, { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};

// Local fallback for demo/development when backend is down
const localUsersKey = 'coffeeclub_local_users';
const getLocalUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(localUsersKey)) || [];
  } catch {
    return [];
  }
};
const saveLocalUsers = (users) => {
  localStorage.setItem(localUsersKey, JSON.stringify(users));
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    // Network error - backend is not running
    if (!error.response) {
      console.warn('⚠️ Backend no disponible. Usando modo local para registro.');
      
      // Local fallback
      const users = getLocalUsers();
      const exists = users.find(u => u.email === userData.email);
      if (exists) {
        throw new Error('El email ya está registrado');
      }
      const newUser = {
        id: Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        telefono: userData.telefono || '',
        direccion: userData.direccion || '',
        rol: 'cliente',
        fecha_registro: new Date().toISOString()
      };
      users.push(newUser);
      saveLocalUsers(users);
      return { mensaje: '✅ Usuario registrado correctamente (modo local)' };
    }
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Error al registrar usuario');
    }
    throw new Error(error.response?.data?.error || 'Error al registrar usuario. Intenta nuevamente.');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    // Network error - backend is not running
    if (!error.response) {
      console.warn('⚠️ Backend no disponible. Usando modo local para login.');
      
      // Local fallback
      const users = getLocalUsers();
      const user = users.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Este email no está registrado. Por favor crea una cuenta primero.');
      }
      
      if (user.password !== credentials.password) {
        throw new Error('Contraseña incorrecta');
      }
      
      return { 
        mensaje: '✅ Login exitoso (modo local)',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          telefono: user.telefono,
          direccion: user.direccion,
          rol: user.rol
        }
      };
    }
    
    if (error.response?.status === 401) {
      throw new Error(error.response.data.error || 'Credenciales incorrectas');
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Email y contraseña requeridos');
    }
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión. Intenta nuevamente.');
  }
};

