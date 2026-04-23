import axios from 'axios';

const API_URL = "http://localhost:4000/api";

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/subscribe`, { email });
    return response.data;
  } catch (error) {
    throw new Error("Error subscribing to newsletter");
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating order");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Error al registrar usuario');
    }
    throw new Error('Error al registrar usuario');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error(error.response.data.error || 'Credenciales incorrectas');
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Email y contraseña requeridos');
    }
    throw new Error('Error al iniciar sesión');
  }
};

