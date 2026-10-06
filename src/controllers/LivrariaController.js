const repository = require('../repositories/LivrariaRepository');

module.exports = {
  listarLivros(req, res) {
    return res.status(200).json(repository.listarLivros());
  },
  buscarLivro(req, res) {
    const livro = repository.buscarLivroPorId(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
    return res.status(200).json(livro);
  },
  criarLivro(req, res) {
    const { titulo, autorId, ano, descricao, isbn } = req.body || {};
    if (!titulo || !autorId) return res.status(400).json({ erro: 'Título e autorId são obrigatórios.' });
    return res.status(201).json(repository.salvarLivro({ titulo, autorId, ano, descricao, isbn }));
  },
  criarAutor(req, res) {
    const { nome, nacionalidade, biografia } = req.body || {};
    if (!nome) return res.status(400).json({ erro: 'Nome do autor é obrigatório.' });
    return res.status(201).json(repository.salvarAutor({ nome, nacionalidade, biografia }));
  },
  comentar(req, res) {
    const { texto, conteudo } = req.body || {};
    const mensagem = texto || conteudo;
    if (!mensagem) return res.status(400).json({ erro: 'Texto do comentário é obrigatório.' });
    const comentario = repository.salvarComentario(req.params.id, {
      texto: mensagem,
      usuarioId: req.usuario.sub,
      nomeUsuario: req.usuario.nome
    });
    if (!comentario) return res.status(404).json({ erro: 'Livro não encontrado.' });
    return res.status(201).json(comentario);
  }
};
