-- Script de creación de tablas para CoffeeClub
-- Ejecutar en PostgreSQL

-- Crear base de datos: CREATE DATABASE coffeeclub;

CREATE TABLE IF NOT EXISTS Categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Testimonios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    fecha TIMESTAMP DEFAULT NOW(),
    imagen VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Recetas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    ingredientes TEXT,
    instrucciones TEXT NOT NULL,
    tiempo_preparacion INT DEFAULT 0,
    dificultad VARCHAR(50) DEFAULT 'Fácil',
    imagen VARCHAR(255),
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Blog (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    autor VARCHAR(100) DEFAULT 'Admin',
    imagen VARCHAR(255),
    categoria VARCHAR(50) DEFAULT 'General',
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    leido BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS Newsletter (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    nombre VARCHAR(100),
    fecha TIMESTAMP DEFAULT NOW(),
    activo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS Productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    categoria_id INT,
    stock INT DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    rol VARCHAR(20) DEFAULT 'cliente',
    fecha_registro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Ordenes (
    id SERIAL PRIMARY KEY,
    cliente VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    userId INT,
    fecha TIMESTAMP DEFAULT NOW()
);

-- Insertar datos de ejemplo para Categorías
INSERT INTO Categorias (nombre, descripcion, imagen) VALUES 
('Café en Granos', 'Los mejores granos de café premium', '/images/categories/granos.jpg'),
('Café Molido', 'Café molido fresco de diversas variedades', '/images/categories/molido.jpg'),
('Accesorios', 'Todo para preparar tu café perfecto', '/images/categories/accesorios.jpg'),
('Bebidas Frías', 'Refrescantes bebidas de café', '/images/categories/frio.jpg')
ON CONFLICT DO NOTHING;

-- Insertar productos de ejemplo
INSERT INTO Productos (nombre, descripcion, precio, imagen, categoria_id, stock, activo) VALUES 
('Café Colombiano Premium', 'Granos selectos de las montañas colombianas, con cuerpo balanceado y notas dulces.', 57000, '/images/CafeColombia.jpg', 1, 50, true),
('Café Espresso Italiano', 'Intenso y aromático, ideal para una taza de espresso perfecta.', 38000, '/images/CafeItaliano.jpg', 1, 30, true),
('Café con Leche de Coco', 'Suave fusión tropical con notas de coco y vainilla natural.', 43000, '/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg', 2, 25, true),
('Café de Guatemala', 'Aromas a cacao con matices frutales, ideal para los amantes del café equilibrado.', 76100, '/images/nathan-dumlao-dvuHNTJxIsg-unsplash.jpg', 1, 20, true),
('Café Sumatra Mandheling', 'Café robusto, terroso y con notas especiadas de la isla de Sumatra.', 32600, '/images/nathan-dumlao-So7cyDtlmls-unsplash.jpg', 1, 15, true),
('Café Latte Clásico', 'La combinación perfecta de espresso y leche espumosa.', 65200, '/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg', 2, 40, true),
('Café de la Casa', 'Nuestra mezcla exclusiva, creada para quienes disfrutan cada sorbo.', 33000, '/images/tabitha-turner-3n3mPoGko8g-unsplash.jpg', 2, 35, true)
ON CONFLICT DO NOTHING;

-- Insertar usuario administrador por defecto
INSERT INTO Usuarios (nombre, email, password, telefono, direccion, rol, fecha_registro) VALUES 
('Administrador', 'admin@coffeeclub.com', 'admin123', '3000000000', 'Calle Admin 123', 'admin', NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario administrativo principal
INSERT INTO Usuarios (nombre, email, password, telefono, direccion, rol, fecha_registro) VALUES 
('Henrry Mazo', 'henrrymazo31@gmail.com', 'Mepecihe03', '3001234567', 'Calle Principal 456', 'admin', NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar datos de ejemplo para Testimonios
INSERT INTO Testimonios (nombre, comentario, calificacion, imagen) VALUES 
('María García', 'El mejor café que he probado. Excelente calidad y servicio.', 5, '/images/testimonials/maria.jpg'),
('Carlos López', 'Me encanta la variedad de productos. Muy recomendable.', 4, '/images/testimonials/carlos.jpg'),
('Ana Martínez', 'El café colombiano es exquisito. Repetiré pronto.', 5, '/images/testimonials/ana.jpg')
ON CONFLICT DO NOTHING;

-- Insertar órdenes de ejemplo
INSERT INTO Ordenes (cliente, total, userId, fecha) VALUES 
('María García', 57000, NULL, NOW() - INTERVAL '2 days'),
('Carlos López', 95000, NULL, NOW() - INTERVAL '1 day'),
('Ana Martínez', 43000, NULL, NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;

-- Script de base de datos completado correctamente

