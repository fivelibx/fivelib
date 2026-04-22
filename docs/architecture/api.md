
# API Specification: FiveLib (v1.0 - Alinhada ao DB)

 **Base URL** : `http://localhost:8000/api/v1`
 **Content-Type** : `application/json`

---

## 1. Authentication (RF05, RN01, RN02)

Responsável pelo controle de acesso e validação de maioridade.

### POST `/auth/register`

Cadastra um novo usuário. Requer validação de +18 anos ( **RN01** ).

* **Request Body** : **JSON**

```
{
  "nome": "string",
  "email": "string",
  "senha": "string",
  "data_nascimento": "YYYY-MM-DD"
}
```

* **Response** : `201 Created`

### POST `/auth/login`

Autentica o usuário e retorna o token JWT.

* **Request Body** : **JSON**

```
{
  "email": "string",
  "senha": "string"
}
```

* **Response** : `{ "access_token": "string", "token_type": "bearer" }`

---

## 2. Resources (RF01, RF03)

### GET `/resources`

Lista ferramentas. Filtros baseados nas colunas da tabela `Tool`.

* **Query Params** : `q` (busca), `linguagem` (filtro), `categoria` (filtro).
* **Response** : `200 OK` (Array de objetos `Tool`)

### POST `/resources/{id}/report` (RF03)

Sinaliza instabilidade em uma ferramenta.

* **Request Body** : **JSON**

```
{
  "mensagem": "string",
  "secao_site": "string"
}
```

* **Response** : `202 Accepted`

---

## 3. User Profile & Library (RF02, RF04)

### GET `/users/me/favorites`

Retorna os favoritos do usuário logado.

### POST `/users/me/favorites`

* **Request Body** : `{ "ferramenta_id": 0 }` (Integer conforme `SERIAL` do DB).

### POST `/users/me/custom-links` (RF04)

Adiciona link privado (Tabela `PrivateLink`).

* **Request Body** : **JSON**

```
{
  "titulo": "string",
  "url": "string"
}
```

---

## 4. Support (RN04)

### POST `/support/tickets`

Abertura de chamados (Tabela `SupportTicket`).

* **Request Body** : **JSON**

```
{
  "email_contato": "string",
  "mensagem": "string",
  "secao_site": "string"
}
```

* **Response** : `201 Created` (Status padrão: `Pendente`)

---

## 5. Modelos de Dados (DTOs/Schemas)

Alinhados com as definições do  **Dicionário de Dados** .

| Modelo                    | Campos principais                                                                 |
| ------------------------- | --------------------------------------------------------------------------------- |
| **Tool (Resource)** | `id`(int),`nome`,`descricao`,`url_oficial`,`linguagem`,`status_ativo` |
| **User**            | `id`(int),`nome`,`email`,`perfil`,`data_nascimento`                     |
| **Ticket**          | `id`(int),`usuario_id`,`status`,`mensagem`,`criado_at`                  |

---

### Notas de Implementação

1. **Sincronia de Idioma** : Note que mudamos de `full_name` para `nome` e `password` para `senha`. Isso evita que você tenha que mapear manualmente cada campo no seu Service do FastAPI.
2. **Validação RN01** : O endpoint de registro agora envia a `data_nascimento`. No backend, basta um `if (hoje - data_nascimento) < 18: raise HTTPException`.
3. **IDs** : Todos os IDs de referência foram alterados de `uuid` para `integer`, respeitando o tipo `SERIAL` do seu PostgreSQL.
