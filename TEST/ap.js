const express = require('express');
const app = express();
const port = 3000;

// Endpoint untuk tes AI
app.get('/api/ping', (req, res) => {
  res.json({ message: "API work" });
});

// Endpoint default
app.get('/', (req, res) => {
  res.send('Server is running. Test the /api/ping endpoint.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  console.log(`Open http://localhost:${port}/api/ping in your browser to test.`);
});