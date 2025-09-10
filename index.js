// server.js
const express = require('express');
const path = require('path');

const app = express();

// servir archivos estáticos en /public
app.use(express.static(path.join(__dirname, 'public')));

// endpoint API requerido por FreeCodeCamp
app.get('/api/whoami', (req, res) => {
  // IP: preferir X-Forwarded-For (proxies) y fallback a req.ip
  const forwarded = req.headers['x-forwarded-for'];
  const ipaddress = (forwarded ? forwarded.split(',')[0] : req.ip).replace('::ffff:', '');

  // lenguaje
  const language = (req.headers['accept-language'] || '').split(',')[0];

  // software: extraer lo que está entre paréntesis en User-Agent si existe, si no devolver todo
  const ua = req.headers['user-agent'] || '';
  const parenMatch = ua.match(/\(([^)]+)\)/);
  const software = parenMatch ? parenMatch[1] : ua;

  res.json({
    ipaddress,
    language,
    software
  });
});

// root: enviar index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
