const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = 3000;

// starts the Mongo DB when the server is started
require('dotenv').config();
require('./db');

// routers are defined here
const apiRouter = require('./routes/apiRouter');
const userRouter = require('./routes/userRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const recipesRouter = require('./routes/recipesRouter');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/shelflife', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, 'shelflife.json'));
});

// created a route file to keep code organized
// all routes to /api/inventory go to inventoryRoutes
app.use('/api/inventory', inventoryRouter);
app.use('/api/users', userRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api', apiRouter);

// catch all route for any unknown routes
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

// create error handler to replace default express error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
