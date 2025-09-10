const express = require('express');
const path = require('path');

const app = express();

// servir estáticos
app.use(express.static(path.join(__dirname, 'public')));

// endpoint raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// endpoint API obligatorio
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,                      // ip
    language: req.headers['accept-language'], // idioma
    software: req.headers['user-agent']       // user-agent completo
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
