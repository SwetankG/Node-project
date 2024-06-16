const express = require('express');
const app = express();
const port = 1001;

app.get('/', (req, res) => {
  res.send('Hi, welcome');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});