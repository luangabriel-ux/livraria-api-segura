const crypto = require('crypto');

const autores = [
  { id: 'autor-1', nome: 'Machado de Assis', nacionalidade: 'Brasileira' },
  { id: 'autor-2', nome: 'Clarice Lispector', nacionalidade: 'Brasileira' }
];
const livros = [
  { id: 'livro-1', titulo: 'Dom Casmurro', autorId: 'autor-1', ano: 1899, comentarios: [] },
  { id: 'livro-2', titulo: 'A Hora da Estrela', autorId: 'autor-2', ano: 1977, comentarios: [] }
];
const usuarios = [];

const novoId = (prefixo) => prefixo + '-' + crypto.randomUUID();

module.exports = {
  listarLivros() {
    return livros.map((livro) => ({
      ...livro,
      autor: autores.find((autor) => autor.id === livro.autorId) || null
    }));
  },
  buscarLivroPorId(id) {
    const livro = livros.find((item) => item.id === id);
    if (!livro) return null;
    return { ...livro, autor: autores.find((autor) => autor.id === livro.autorId) || null };
  },
  salvarLivro(dados) {
    const livro = { id: novoId('livro'), comentarios: [], ...dados };
    livros.push(livro);
    return this.buscarLivroPorId(livro.id);
  },
  salvarAutor(dados) {
    const autor = { id: novoId('autor'), ...dados };
    autores.push(autor);
    return autor;
  },
  salvarComentario(livroId, comentario) {
    const livro = livros.find((item) => item.id === livroId);
    if (!livro) return null;
    const novoComentario = { id: novoId('comentario'), ...comentario, criadoEm: new Date().toISOString() };
    livro.comentarios.push(novoComentario);
    return novoComentario;
  },
  buscarUsuarioPorEmail(email) {
    return usuarios.find((usuario) => usuario.email.toLowerCase() === String(email).toLowerCase()) || null;
  },
  salvarUsuario(dados) {
    const usuario = { id: novoId('usuario'), ...dados };
    usuarios.push(usuario);
    return usuario;
  }
};
