import express from 'express';
import cors from 'cors';

const app = express();

const allowed = process.env.CORS_ORIGIN.split(' ');

app.use(
   cors({
      origin: (origin, cb) => {
         if (!origin || allowed.includes(origin)) return cb(null, true);
         return cb(new Error('CORS Blocked'));
      },
      credentials: true,
   }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routers
import userRouter from './routes/user.routes.js';
import bookRouter from './routes/book.routes.js';
import cartRouter from './routes/cart.routes.js';
import favoritesRouter from './routes/favourites.routes.js';
import orderRouter from './routes/order.routes.js';

// decleration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/favourites', favoritesRouter);
app.use('/api/v1/orders', orderRouter);

app.get('/', (req, res) => {
   res.send('Backend is running...');
});

export { app };
