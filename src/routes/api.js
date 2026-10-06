const express = require('express');
const authController = require('../controllers/AuthController');
const livraria = require('../controllers/LivrariaController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/auth/register', authController.registrar);
router.post('/auth/login', authController.login);

router.get('/livros', livraria.listarLivros);
router.get('/livros/:id', livraria.buscarLivro);
router.post('/livros/:id/comentarios', autenticarToken, livraria.comentar);
router.post('/autores', autenticarToken, exigirRole('ADMIN'), livraria.criarAutor);
router.post('/livros', autenticarToken, exigirRole('ADMIN'), livraria.criarLivro);

module.exports = router;
