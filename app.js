const express = require('express');
const path = require('path');
const clientRoutes = require('./routes/client');
const serverRoutes = require('./routes/server');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

app.use('/', clientRoutes);
app.use('/api', serverRoutes);
