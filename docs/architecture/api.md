# API Specification: FiveLib

 **Base URL** : `http://localhost:8000/api/v1`

 **Content-Type** : `application/json`

## 1. Authentication (RF05)

Responsável pelo controle de acesso e sessão.

### POST `/auth/register`

Cadastra um novo usuário no sistema.

* **Request Body** :
  **JSON**

```
  {
    "email": "string",
    "password": "string",
    "full_name": "string"
  }
```

* **Response** : `201 Created`

### POST `/auth/login`

Autentica o usuário e retorna o token de acesso.

* **Response** :
  **JSON**

```
  { "access_token": "string", "token_type": "bearer" }
```

---

## 2. Resources (RF01, RF03)

Operações de consulta e interação com o repositório de ferramentas.

### GET `/resources`

Lista e filtra ferramentas/documentações.

* **Query Params** : `q` (busca), `language` (filtro), `category` (filtro).
* **Response** : `200 OK` (Array de objetos `Resource`)

### GET `/resources/{id}`

Obtém detalhes específicos de uma biblioteca.

* **Response** : Objeto `Resource` completo.

### POST `/resources/{id}/report` (RF03)

Sinaliza um link como quebrado ou inativo.

* **Request Body** :
  **JSON**

```
  { "reason": "string", "description": "string" }
```

* **Response** : `202 Accepted`

---

## 3. User Profile & Library (RF02, RF04)

Operações restritas para usuários autenticados (requer JWT no Header).

### GET `/users/me/favorites`

Retorna a lista de links salvos pelo usuário.

* **Response** : `200 OK` (Array de `Resource`)

### POST `/users/me/favorites`

Adiciona uma URL existente aos favoritos.

* **Request Body** : `{ "resource_id": "uuid" }`
* **Response** : `201 Created`

### POST `/users/me/custom-links` (RF04)

Adiciona um link externo privado à biblioteca pessoal.

* **Request Body** :
  **JSON**

```
  {
    "title": "string",
    "url": "string",
    "category": "string"
  }
```

* **Response** : `201 Created`

---

## 4. Support (RN04)

Módulo de atendimento ao usuário.

### POST `/support/tickets`

Envia mensagem para a administração.

* **Request Body** :
  **JSON**

```
  {
    "name": "string",
    "email": "string",
    "description": "string",
    "section_reported": "string"
  }
```

* **Response** : `201 Created` (Status inicial: `PENDING`)

---

## 5. Modelos de Dados (DTOs/Schemas)

Para garantir o alinhamento entre DDD e o Pydantic:

| Modelo             | Campos principais                                                 |
| ------------------ | ----------------------------------------------------------------- |
| **Resource** | `id`,`name`,`url`,`language`,`category`,`description` |
| **User**     | `id`,`email`,`full_name`,`is_active`                      |
| **Ticket**   | `id`,`user_email`,`status`,`created_at`                   |

---

### Notas de Implementação

1. **Error Handling** : A API retornará `400 Bad Request` para erros de validação Pydantic, `401 Unauthorized` para tokens inválidos e `404 Not Found` para recursos inexistentes.
2. **Camada DDD** : No backend, cada um desses endpoints deve invocar um **Use Case** (Service) na camada de serviços, que por sua vez interage com a  **Domain Entity** . O controller (API) deve apenas delegar a execução e tratar o retorno.
3. **Segurança** : Todas as rotas `/users/me/*` exigem autenticação obrigatória via Header: `Authorization: Bearer <token>`.
