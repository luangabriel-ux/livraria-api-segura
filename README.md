# Livraria API segura

API RESTful didática com Clean Architecture simplificada, BCrypt para senhas, JWT stateless e RBAC.

## Requisitos

- Node.js 18 ou superior
- npm

## Instalação e execução

```bash
npm install
copy .env.example .env
# Edite .env e defina JWT_SECRET com uma chave aleatória forte
npm start
```

A API ficará disponível em `http://localhost:3000/api/v1`.

## Rotas e permissões

| Método | Rota | Acesso |
| --- | --- | --- |
| GET | `/livros` | Público |
| GET | `/livros/:id` | Público |
| POST | `/auth/register` | Público; cria perfil USER |
| POST | `/auth/login` | Público; emite JWT |
| POST | `/livros/:id/comentarios` | USER ou ADMIN autenticado |
| POST | `/autores` | ADMIN |
| POST | `/livros` | ADMIN |

Para rotas protegidas envie `Authorization: Bearer <token>`.

> O cadastro público ignora qualquer tentativa de definir `role: "ADMIN"`. Em implantação real, contas administrativas devem ser provisionadas por um canal seguro. Os usuários ficam em memória neste projeto didático e são removidos ao reiniciar o servidor.

## Exemplos

Cadastro:
```json
{ "nome": "Leitor", "email": "leitor@gmail.com", "senha": "leitor123" }
```

Login:
```json
{ "email": "leitor@gmail.com", "senha": "leitor123" }
```

Use o campo `token` retornado no cabeçalho Bearer. A conta ADMIN deve ser criada por provisionamento seguro antes de iniciar a API; não há senha administrativa padrão embutida.

## Verificação rápida

- Sem token, POST de comentário, autor e livro retorna 401.
- Com perfil USER, comentar funciona e POST de autor/livro retorna 403.
- Com perfil ADMIN criado por provisionamento confiável, POST de autor/livro retorna 201.
- Livros podem ser listados e consultados sem autenticação.
