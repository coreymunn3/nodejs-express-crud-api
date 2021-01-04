const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.js');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// routes
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Home');
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
