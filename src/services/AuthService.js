const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repository = require('../repositories/LivrariaRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_livraria_2026';
const SALT_ROUNDS = 10;

class AuthService {
  async registrar({ nome, email, senha, role }) {
    if (!nome || !email || !senha) {
      throw { status: 400, message: 'Campos obrigatórios ausentes: nome, email ou senha.' };
    }
    if (String(senha).length < 8) {
      throw { status: 400, message: 'A senha deve possuir pelo menos 8 caracteres.' };
    }
    if (repository.buscarUsuarioPorEmail(email)) {
      throw { status: 409, message: 'E-mail já cadastrado no sistema.' };
    }

    // Registro público nunca concede privilégios administrativos.
    const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);
    const novoUsuario = repository.salvarUsuario({
      nome: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      senha_hash,
      role: role === 'ADMIN' ? 'USER' : 'USER'
    });
    const { senha_hash: omitida, ...usuarioRetorno } = novoUsuario;
    return usuarioRetorno;
  }

  async login({ email, senha }) {
    if (!email || !senha) throw { status: 400, message: 'E-mail e senha são obrigatórios.' };
    const usuario = repository.buscarUsuarioPorEmail(email);
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      throw { status: 401, message: 'Credenciais inválidas.' };
    }

    const token = jwt.sign(
      { sub: usuario.id, nome: usuario.nome, role: usuario.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h', algorithm: 'HS256' }
    );
    return { usuario: { id: usuario.id, nome: usuario.nome, role: usuario.role }, token };
  }
}

module.exports = new AuthService();
