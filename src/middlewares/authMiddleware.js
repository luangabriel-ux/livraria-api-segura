const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_livraria_2026';

function autenticarToken(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Acesso negado: informe Authorization: Bearer <token>.' });
  }

  try {
    req.usuario = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido, corrompido ou expirado.' });
  }
}

function exigirRole(...rolesEsperadas) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ erro: 'Autenticação necessária.' });
    if (!rolesEsperadas.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Acesso proibido: perfil sem permissão para esta operação.' });
    }
    return next();
  };
}

module.exports = { autenticarToken, exigirRole };
