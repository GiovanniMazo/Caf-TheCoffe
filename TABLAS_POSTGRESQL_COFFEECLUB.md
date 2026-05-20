# Tablas necesarias para CoffeeClub (PostgreSQL)

> Fuente: `Backend/schema.sql`.
> Ejecuta en tu BD `coffeeclub` para crear el esquema y datos semilla.

---

## 1) Categorias
```sql
CREATE TABLE IF NOT EXISTS Categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255)
);
```

---

## 2) Testimonios
```sql
CREATE TABLE IF NOT EXISTS Testimonios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  comentario TEXT NOT NULL,
  calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  fecha TIMESTAMP DEFAULT NOW(),
  imagen VARCHAR(255)
);
```

---

## 3) Recetas
```sql
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
```

---

## 4) Blog
```sql
CREATE TABLE IF NOT EXISTS Blog (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT NOT NULL,
  autor VARCHAR(100) DEFAULT 'Admin',
  imagen VARCHAR(255),
  categoria VARCHAR(50) DEFAULT 'General',
  fecha TIMESTAMP DEFAULT NOW()
);
```

---

## 5) Contacto
```sql
CREATE TABLE IF NOT EXISTS Contacto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  leido BOOLEAN DEFAULT false
);
```

---

## 6) Newsletter
```sql
CREATE TABLE IF NOT EXISTS Newsletter (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  nombre VARCHAR(100),
  fecha TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT true
);
```

---

## 7) Productos
```sql
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
```

---

## 8) Usuarios
```sql
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
```

---

## 9) Ordenes
```sql
CREATE TABLE IF NOT EXISTS Ordenes (
  id SERIAL PRIMARY KEY,
  cliente VARCHAR(255) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  userId INT,
  fecha TIMESTAMP DEFAULT NOW()
);
```

---

# Datos semilla (incluidos en schema.sql)
- Inserta categorías y productos de ejemplo.
- Inserta usuarios por defecto, incluyendo el usuario con contraseña `Mepecihe03` (según el script).
- Inserta testimonios de ejemplo.
- Inserta órdenes de ejemplo.

---

# Cómo ejecutarlo (recomendado)
1. Tener creada la BD: `coffeeclub`.
2. Ejecutar:
   - `Backend/schema.sql`

> Si ya ejecutaste `schema.sql` y tus endpoints empezaron a funcionar, el esquema ya está correctamente cargado.

