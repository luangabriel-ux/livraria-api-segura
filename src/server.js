require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/api/v1', api);
app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
app.use((erro, req, res, next) => {
  const status = Number(erro.status) || 500;
  if (status >= 500) console.error(erro);
  return res.status(status).json({ erro: status === 500 ? 'Erro interno do servidor.' : erro.message });
});

const port = Number(process.env.PORT) || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Livraria API rodando em http://localhost:${port}`));
}
module.exports = app;
