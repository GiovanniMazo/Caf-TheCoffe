-- Script de creación de tablas para CoffeeClub
-- Ejecutar en SQL Server

-- Tabla de Categorías
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categorias')
BEGIN
    CREATE TABLE dbo.Categorias (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        descripcion NVARCHAR(MAX),
        imagen NVARCHAR(255)
    );
    PRINT '✅ Tabla Categorias creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Categorias ya existe';
END
GO

-- Tabla de Testimonios
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Testimonios')
BEGIN
    CREATE TABLE dbo.Testimonios (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        comentario NVARCHAR(MAX) NOT NULL,
        calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
        fecha DATETIME DEFAULT GETDATE(),
        imagen NVARCHAR(255)
    );
    PRINT '✅ Tabla Testimonios creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Testimonios ya existe';
END
GO

-- Tabla de Recetas
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Recetas')
BEGIN
    CREATE TABLE dbo.Recetas (
        id INT IDENTITY(1,1) PRIMARY KEY,
        titulo NVARCHAR(200) NOT NULL,
        descripcion NVARCHAR(MAX),
        ingredientes NVARCHAR(MAX),
        instrucciones NVARCHAR(MAX) NOT NULL,
        tiempo_preparacion INT DEFAULT 0,
        dificultad NVARCHAR(50) DEFAULT 'Fácil',
        imagen NVARCHAR(255),
        fecha DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Tabla Recetas creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Recetas ya existe';
END
GO

-- Tabla de Blog
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Blog')
BEGIN
    CREATE TABLE dbo.Blog (
        id INT IDENTITY(1,1) PRIMARY KEY,
        titulo NVARCHAR(200) NOT NULL,
        contenido NVARCHAR(MAX) NOT NULL,
        autor NVARCHAR(100) DEFAULT 'Admin',
        imagen NVARCHAR(255),
        categoria NVARCHAR(50) DEFAULT 'General',
        fecha DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Tabla Blog creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Blog ya existe';
END
GO

-- Tabla de Contacto
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Contacto')
BEGIN
    CREATE TABLE dbo.Contacto (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        mensaje NVARCHAR(MAX) NOT NULL,
        fecha DATETIME DEFAULT GETDATE(),
        leido BIT DEFAULT 0
    );
    PRINT '✅ Tabla Contacto creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Contacto ya existe';
END
GO

-- Tabla de Newsletter
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Newsletter')
BEGIN
    CREATE TABLE dbo.Newsletter (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(100) NOT NULL UNIQUE,
        nombre NVARCHAR(100),
        fecha DATETIME DEFAULT GETDATE(),
        activo BIT DEFAULT 1
    );
    PRINT '✅ Tabla Newsletter creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Newsletter ya existe';
END
GO

-- Tabla de Usuarios
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Usuarios')
BEGIN
    CREATE TABLE dbo.Usuarios (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        telefono NVARCHAR(20),
        direccion NVARCHAR(255),
        rol NVARCHAR(20) DEFAULT 'cliente',
        fecha_registro DATETIME DEFAULT GETDATE()
    );
    PRINT '✅ Tabla Usuarios creada';
END
ELSE
BEGIN
    PRINT '⚠️ Tabla Usuarios ya existe';
END
GO

-- Insertar datos de ejemplo para Categorías
IF NOT EXISTS (SELECT * FROM dbo.Categorias)
BEGIN
    INSERT INTO dbo.Categorias (nombre, descripcion, imagen) VALUES 
    ('Café en Granos', 'Los mejores granos de café premium', '/images/categories/granos.jpg'),
    ('Café Molido', 'Café molido fresco de diversas variedades', '/images/categories/molido.jpg'),
    ('Accesorios', 'Todo para preparar tu café perfecto', '/images/categories/accesorios.jpg'),
    ('Bebidas Frías', 'Refrescantes bebidas de café', '/images/categories/frio.jpg');
    PRINT '✅ Datos de ejemplo insertados en Categorias';
END
GO

-- Insertar datos de ejemplo para Testimonios
IF NOT EXISTS (SELECT * FROM dbo.Testimonios)
BEGIN
    INSERT INTO dbo.Testimonios (nombre, comentario, calificacion, imagen) VALUES 
    ('María García', 'El mejor café que he probado. Excelente calidad y servicio.', 5, '/images/testimonials/maria.jpg'),
    ('Carlos López', 'Me encanta la variedad de productos. Muy recomendable.', 4, '/images/testimonials/carlos.jpg'),
    ('Ana Martínez', 'El café colombiano es exquisito. Repetiré pronto.', 5, '/images/testimonials/ana.jpg');
    PRINT '✅ Datos de ejemplo insertados en Testimonios';
END
GO

PRINT '🎉 Script de base de datos completado correctamente';

