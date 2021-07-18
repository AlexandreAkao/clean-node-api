# Login

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **POST** na rota **/api/login**
1. [x] Valida dados obrigatórios **email** e **password**
1. [x] Valida que o campo **email** é um e-mail válido
1. [x] Busca o usuário com o email e senha fornecidos
1. [x] Gera um token de acesso a partir do ID do usuário
1. [x] Atualiza os dados do usuário com o token de acesso gerado
1. [x] Retorna 200 com o token de acesso

> ## Exceções

1. [x] Retorna erro 404 se a API não existir
1. [x] Retorna erro 400 se **email** ou **password** não forem fornecidos pelo client
1. [x] Retorna erro 400 se o campo **email** for um e-mail inválido
1. [x] Retorna erro 401 se não encontrar um usuário com os dados fornecidos
1. [x] Retorna erro 500 se der erro ao tentar gerar o token de acesso
1. [x] Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso gerado
