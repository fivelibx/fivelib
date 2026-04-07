# api.md

## Visão Geral

Descrição da API e seu propósito.

---

## Autenticação

* Tipo: (ex: JWT)
* Como funciona:

---

## Endpoints

### Exemplo:

#### POST /auth/login

**Request**

```json id="req123"
{
  "email": "string",
  "password": "string"
}
```

**Response**

```json id="res123"
{
  "access_token": "string"
}
```

---

### GET /resources

**Descrição:** Lista recursos disponíveis

**Response**

```json id="res456"
[
  {
    "id": 1,
    "name": "string"
  }
]
```

---

## Padrões de Resposta

* 200 → sucesso
* 400 → erro de requisição
* 401 → não autorizado
* 404 → não encontrado
* 500 → erro interno

---

## Observações

* Todas as rotas protegidas exigem autenticação
* Respostas seguem padrão JSON
