
# API Specification: FiveLib (v1.0.0 - Sincronizada ao DB)

 **Base URL** : `http://localhost:8001/api/v1`

 **Content-Type** : `application/json`

## 1. Authentication (RF05, RN01, RN02)

Controle de acesso, fluxos de verificação de conta, segurança e recuperação de senha.

### POST `/auth/register`

Cadastra um novo usuário. Requer validação de +18 anos ( **RN01** ).

* Por padrão, a conta é criada com `is_active = false` e um código é gerado.
* **Request Body (JSON)** :

**JSON**

```
{
  "nome": "string",
  "email": "string",
  "senha": "string",
  "data_nascimento": "YYYY-MM-DD",
  "accepted_terms": true
}
```

* **Response** : `201 Created`

### POST `/auth/verify`

Ativa a conta do usuário usando o código enviado por e-mail.

* **Request Body (JSON)** :

**JSON**

```
{
  "email": "string",
  "verification_code": "string"
}
```

* **Response** : `200 OK` -> Muta `is_active` para `true` no banco.

### POST `/auth/login`

Autentica o usuário e retorna o token JWT. Só permite login se `is_active` for `true`.

* **Request Body (JSON)** :

**JSON**

```
{
  "email": "string",
  "senha": "string"
}
```

* **Response** : `{ "access_token": "string", "token_type": "bearer" }`

### POST `/auth/forgot-password`

Solicita código de recuperação de senha.

* **Request Body (JSON)** : `{ "email": "string" }`
* **Response** : `200 OK`

### POST `/auth/reset-password`

Define uma nova senha utilizando o código de recuperação validado.

* **Request Body (JSON)** :

**JSON**

```
{
  "email": "string",
  "reset_password_code": "string",
  "nova_senha": "string"
}
```

* **Response** : `200 OK`

## 2. Resources & Tools (RF01, RF03)

### GET `/resources`

Lista as ferramentas ativas cadastradas. Filtros estendidos baseados nas novas colunas do banco.

* **Query Params** : `q` (busca no nome/descrição), `linguagem`, `categoria`, `tag`.
* **Response** : `200 OK` (Array de objetos `Tool`)

### POST `/resources` (Apenas Admin/Superadmin)

Endpoint de cadastro de novas ferramentas (exige validação do campo `perfil` no JWT).

* **Request Body (JSON)** :

**JSON**

```
{
  "nome": "string",
  "descricao": "string",
  "url_oficial": "string",
  "linguagem": "string",
  "categoria": "string",
  "icon_slug": "string",
  "tags": ["string"]
}
```

* **Response** : `201 Created`

## 3. User Profile & Library (RF02, RF04)

### GET `/users/me`

Retorna o perfil detalhado do usuário logado baseado no token.

* **Response** : `200 OK` (Retorna o DTO `User` completo, incluindo links sociais).

### PUT `/users/me`

Atualiza os dados complementares do perfil do usuário.

* **Request Body (JSON)** :

**JSON**

```
{
  "nome": "string",
  "titulo_profissional": "string",
  "github": "string",
  "linkedin": "string"
}
```

* **Response** : `200 OK`

### GET `/users/me/favorites`

Retorna a lista de ferramentas favoritadas pelo usuário (Join entre `favorite` e `tool`).

### POST `/users/me/favorites`

Favorita/Desfavorita uma ferramenta (Toggle).

* **Request Body (JSON)** : `{ "ferramenta_id": 0 }`
* **Response** : `200 OK` (Atualiza também o contador `stars` na tabela `tool`).

### POST `/users/me/custom-links` (RF04)

Adiciona um link privado para a biblioteca do usuário.

* **Request Body (JSON)** :

**JSON**

```
{
  "titulo": "string",
  "url": "string"
}
```

* **Response** : `201 Created`

## 4. Support & Tickets (RN04)

### POST `/support/tickets`

Abertura de chamados ou reporte de instabilidade de ferramentas (Tabela `SupportTicket`).

* **Request Body (JSON)** :

**JSON**

```
{
  "email_contato": "string",
  "mensagem": "string",
  "secao_site": "string"
}
```

* **Response** : `201 Created` (Persiste com `status: "Pendente"`)

### PATCH `/support/tickets/{id}` (Apenas Moderador/Admin)

Atualiza o status do ticket e adiciona observações técnicas.

* **Request Body (JSON)** :

**JSON**

```
{
  "status": "Resolvido",
  "observacao_admin": "string"
}
```

* **Response** : `200 OK`

## 5. Modelos de Dados Atualizados (DTOs / Pydantic Schemas)

Estes modelos refletem exatamente os tipos e restrições gerados no seu dump definitivo do banco.

| **Modelo**      | **Campos e Tipos de Dados (Sincronizados ao DB)**                                                                                                                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tool**        | `id`(int),`nome`(str),`descricao`(str),`url_oficial`(str),`linguagem`(str),`status_ativo`(bool),`stars`(int),`tags`(List[str]),`categoria`(str),`icon_slug`(str)                                                                                  |
| **User**        | `id`(int),`nome`(str),`email`(str),`perfil`(str),`data_nascimento`(date),`is_active`(bool),`accepted_terms`(bool),`accepted_terms_at`(datetime),`titulo_profissional`(str/null),`github`(str/null),`linkedin`(str/null),`criado_at`(datetime) |
| **Ticket**      | `id`(int),`usuario_id`(int),`email_contato`(str),`mensagem`(str),`secao_site`(str),`status`(str),`observacao_admin`(str/null),`criado_at`(datetime)                                                                                                   |
| **PrivateLink** | `id`(int),`usuario_id`(int),`titulo`(str),`url`(str)                                                                                                                                                                                                          |
