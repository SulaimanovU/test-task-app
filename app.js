// All Imported External Modules
const express = require('express');
const cors = require('cors');
const sequelize = require('./models/database');
const device = require('./routes/device');

const app = express();

// All Used Express Middlewares
app.use(express.json());
app.use(cors());
app.use('/', device);

// All Used Models Declaration
const Device = require('./models/device');
const User = require('./models/user');

// All Models Associations
User.hasMany(Device, {onDelete: 'CASCADE'});
Device.belongsTo(User);

// Error Handler Middleware
app.use((error, req, res, next) => {
  const { message } = error
  res.status(404).json({ message });
});


sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('Server started on port 3000')); 
    })
    .catch(err => {
        console.log(err);
    });