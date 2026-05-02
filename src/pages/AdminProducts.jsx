import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBox, FaSave, FaTimes } from 'react-icons/fa';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import '../styles/pages/AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    stock: 0,
    categoria_id: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.nombre || !formData.precio) {
      setError('Nombre y precio son obligatorios');
      return;
    }

    try {
      const productPayload = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
        categoria_id: formData.categoria_id ? parseInt(formData.categoria_id) : null
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productPayload);
        setSuccess('✅ Producto actualizado correctamente');
      } else {
        await createProduct(productPayload);
        setSuccess('✅ Producto creado correctamente');
      }

      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message || 'Error al guardar producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio || '',
      imagen: product.imagen || '',
      stock: product.stock || 0,
      categoria_id: product.categoria_id || ''
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setSuccess('✅ Producto eliminado correctamente');
      setDeleteConfirm(null);
      loadProducts();
    } catch (err) {
      setError(err.message || 'Error al eliminar producto');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      stock: 0,
      categoria_id: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const openNewProduct = () => {
    resetForm();
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  if (loading && products.length === 0) {
    return (
      <div className="admin-products-loading">
        <div className="admin-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <div>
          <h1><FaBox /> Gestión de Productos</h1>
          <p>Administra el catálogo de productos de Coffee Club</p>
        </div>
        <button className="admin-btn-primary" onClick={openNewProduct}>
          <FaPlus /> Nuevo Producto
        </button>
      </div>

      {success && (
        <div className="admin-alert admin-alert-success">
          {success}
          <button onClick={() => setSuccess('')}><FaTimes /></button>
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
          <button onClick={() => setError('')}><FaTimes /></button>
        </div>
      )}

      {/* Formulario Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="admin-modal-close" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Café Colombia Premium"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Precio *</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="Ej: 25000"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Ej: 100"
                    min="0"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Categoría ID</label>
                  <input
                    type="number"
                    name="categoria_id"
                    value={formData.categoria_id}
                    onChange={handleChange}
                    placeholder="Ej: 1"
                    min="1"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción del producto..."
                  rows="3"
                />
              </div>
              <div className="admin-form-group">
                <label>URL de imagen</label>
                <input
                  type="text"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="Ej: /images/CafeColombia.jpg"
                />
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn-secondary" onClick={resetForm}>
                  <FaTimes /> Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  <FaSave /> {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal admin-modal-small">
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer. ¿Estás seguro de eliminar <strong>{deleteConfirm.nombre}</strong>?</p>
            <div className="admin-form-actions">
              <button className="admin-btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button className="admin-btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>
                <FaTrash /> Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de productos */}
      <div className="admin-table-container">
        <table className="admin-data-table admin-products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="admin-empty-row">
                  No hay productos registrados. Haz clic en "Nuevo Producto" para agregar uno.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>
                    <div className="admin-product-img">
                      {product.imagen ? (
                        <img src={product.imagen} alt={product.nombre} />
                      ) : (
                        <div className="admin-product-placeholder">🖼️</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <strong>{product.nombre}</strong>
                    <small>{product.descripcion?.substring(0, 60)}...</small>
                  </td>
                  <td className="admin-price">${parseFloat(product.precio).toLocaleString()}</td>
                  <td>{product.stock || 0}</td>
                  <td>
                    <span className={`admin-status ${product.activo ? 'active' : 'inactive'}`}>
                      {product.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-edit" onClick={() => handleEdit(product)} title="Editar">
                        <FaEdit />
                      </button>
                      <button className="admin-btn-delete" onClick={() => setDeleteConfirm(product)} title="Eliminar">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
