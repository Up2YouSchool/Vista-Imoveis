const express = require('express');
const cors = require('cors');
const imovelRoutes = require('./routes/imovelRoutes');
const corretorRoutes = require('./routes/corretorRoutes');

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

app.use('/imoveis', imovelRoutes);
app.use('/corretores', corretorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});