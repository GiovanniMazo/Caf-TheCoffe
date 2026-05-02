import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getPool } from './database.js';
import productsRouter from './Routes/products.js';
import ordersRouter from './Routes/orders.js';
import categoriesRouter from './Routes/categories.js';
import testimonialsRouter from './Routes/testimonials.js';
import recipesRouter from './Routes/recipes.js';
import blogRouter from './Routes/blog.js';
import contactRouter from './Routes/contact.js';
import newsletterRouter from './Routes/newsletter.js';
import usersRouter from './Routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await getPool();
    console.log('Conectado a PostgreSQL correctamente');
    console.log(`Backend CoffeeClub corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  }
});

