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
    const users = JSON.parse(localStorage.getItem(localUsersKey));
    if (!users || users.length === 0) {
      // Seed default admin users for local fallback
      const defaultAdmins = [
        {
          id: 1,
          nombre: 'Administrador',
          email: 'admin@coffeeclub.com',
          password: 'admin123',
          telefono: '3000000000',
          direccion: 'Calle Admin 123',
          rol: 'admin',
          fecha_registro: new Date().toISOString()
        },
        {
          id: 2,
          nombre: 'Henrry Mazo',
          email: 'henrrymazo31@gmail.com',
          password: 'Mepecihe03',
          telefono: '3001234567',
          direccion: 'Calle Principal 456',
          rol: 'admin',
          fecha_registro: new Date().toISOString()
        }
      ];
      localStorage.setItem(localUsersKey, JSON.stringify(defaultAdmins));
      return defaultAdmins;
    }
    return users;
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

// Ensure admin users exist in localStorage fallback
const ensureAdminUsers = () => {
  const users = getLocalUsers();
  const defaultAdmins = [
    {
      id: 1,
      nombre: 'Administrador',
      email: 'admin@coffeeclub.com',
      password: 'admin123',
      telefono: '3000000000',
      direccion: 'Calle Admin 123',
      rol: 'admin',
      fecha_registro: new Date().toISOString()
    },
    {
      id: 2,
      nombre: 'Henrry Mazo',
      email: 'henrrymazo31@gmail.com',
      password: 'Mepecihe03',
      telefono: '3001234567',
      direccion: 'Calle Principal 456',
      rol: 'admin',
      fecha_registro: new Date().toISOString()
    }
  ];

  let updated = false;
  defaultAdmins.forEach(admin => {
    if (!users.find(u => u.email === admin.email)) {
      users.push(admin);
      updated = true;
    }
  });

  if (updated) {
    saveLocalUsers(users);
  }
};

// Admin login
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/admin/login`, credentials);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend no disponible o error. Intentando modo local para admin login.');
    
    // Always try local fallback
    ensureAdminUsers();
    const users = getLocalUsers();
    const user = users.find(u => u.email === credentials.email && u.rol === 'admin');
    
    if (!user) {
      throw new Error('Credenciales de administrador incorrectas.');
    }
    
    if (user.password !== credentials.password) {
      throw new Error('Contraseña incorrecta');
    }
    
    return { 
      mensaje: '✅ Login de administrador exitoso (modo local)',
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
};

// Fetch all users (admin only)
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener usuarios');
  }
};

// Fetch all orders (admin only)
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend no disponible. Leyendo órdenes locales.');
    // Fallback: leer órdenes de localStorage
    const localOrders = JSON.parse(localStorage.getItem('coffeeclub_orders') || '[]');
    return localOrders;
  }
};

// ========== PRODUCTOS ==========

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend no disponible. Devolviendo array vacío para fallback local.');
    // Devolver array vacío - el componente Products.jsx manejará el fallback local
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener producto');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al crear producto');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al actualizar producto');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al eliminar producto');
  }
};

// ========== ORDERS ==========

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al crear orden');
  }
};

