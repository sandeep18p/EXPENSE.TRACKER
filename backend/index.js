const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 3000;
app.use(cookieParser());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});

// Routes
app.use('/user', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/expenses/paymentOrder1', paymentRoutes);

// Sync Sequelize models and start server
(async () => {
  try {
    await sequelize.sync(); // Sync models with the database
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
