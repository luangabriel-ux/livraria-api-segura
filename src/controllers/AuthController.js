const authService = require('../services/AuthService');

module.exports = {
  async registrar(req, res, next) {
    try {
      const usuario = await authService.registrar(req.body || {});
      return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario });
    } catch (erro) { return next(erro); }
  },
  async login(req, res, next) {
    try {
      const resultado = await authService.login(req.body || {});
      return res.status(200).json(resultado);
    } catch (erro) { return next(erro); }
  }
};
