// app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

// routes
app.use('/tasks', tasksRouter);

// basic healthcheck
app.get('/', (req, res) => res.json({ status: 'ok', time: new Date() }));

// centralized error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // sync models without destructive force. In development you can set { alter: true }
    await sequelize.sync({ alter: true });
    console.log('Models synced');
    app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

start();