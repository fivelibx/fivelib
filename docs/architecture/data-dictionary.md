# Dicionário de Dados - FiveLib (v1.0)

Este documento descreve a estrutura lógica e física do banco de dados PostgreSQL do projeto FiveLib.

## Identificação

Nome do Sistema: DevAcademicX (FiveLib)
Equipe: Lucas Paiva Santos de Oliveira, Mateus Alves Marques Macido, Rodrigo Moraes dos Santos, Nicolas Rosa Santos, Raian Luis dos Santos, Felipe Gonçalves
Data: Abril de 2026

---

## 1. Cardinalidade

**Tabela de cardinalidade:**

| Entidade A              | Relacionamento   | Entidade B              | Cardinalidade | Justificativa                                                                        |
| ----------------------- | ---------------- | ----------------------- | ------------- | ------------------------------------------------------------------------------------ |
| **User**          | Possui           | **Favorite**      | **0:N** | Um usuário pode não ter favoritos ou ter vários (**RF02/RN03** ).           |
| **Tool**          | É favoritada em | **Favorite**      | **0:N** | Uma ferramenta pode ser nova e não ter favoritismos.                                |
| **User**          | Cadastra         | **PrivateLink**   | **0:N** | O usuário decide se quer adicionar links privados (**RF04/RN03** ).           |
| **User**          | Abre             | **SupportTicket** | **1:N** | Restrito a usuários cadastrados (+18 anos) conforme**RN01** .                 |
| **SupportTicket** | Pertence a       | **User**          | **1:1** | Cada ticket é obrigatoriamente vinculado a um autor para gestão (**RN04** ). |

---

## 2. Definição de Entidades

### Entidade: Usuários (`User`)

**Finalidade:** Gestão de identidade, autenticação e perfis de acesso ( **RF05** ).

**PK:** `id` | **FK:** Nenhuma

| Atributo            | Tipo            | Descrição                                | Restrições                                |
| ------------------- | --------------- | ------------------------------------------ | ------------------------------------------- |
| `id`              | `SERIAL`      | Identificador único universal.            | PK                                          |
| `nome`            | `VARCHAR`     | Nome completo do usuário.                 | NOT NULL                                    |
| `email`           | `VARCHAR`     | E-mail institucional ou pessoal.           | NOT NULL, UNIQUE (**RN02** )          |
| `senha`           | `VARCHAR`     | Hash da senha para armazenamento seguro.   | NOT NULL                                    |
| `data_nascimento` | `DATE`        | Data de nascimento.                        | NOT NULL, Validação +18 (**RN01** ) |
| `perfil`          | `VARCHAR`     | Nível de acesso (user, admin, moderator). | NOT NULL                                    |
| `criado_at`       | `TIMESTAMPTZ` | Timestamp de criação da conta.           | DEFAULT NOW()                               |

---

### Entidade: Ferramentas (`Tool`)

**Finalidade:** Catálogo centralizado de bibliotecas e frameworks ( **RF01** ).

**PK:** `id` | **FK:** Nenhuma

| Atributo         | Tipo        | Descrição                                   | Restrições                   |
| ---------------- | ----------- | --------------------------------------------- | ------------------------------ |
| `id`           | `SERIAL`  | Identificador único da ferramenta.           | PK                             |
| `nome`         | `VARCHAR` | Nome da biblioteca ou framework.              | NOT NULL, UNIQUE               |
| `descricao`    | `TEXT`    | Descrição técnica simplificada.            | NOT NULL                       |
| `url_oficial`  | `TEXT`    | Link para documentação oficial.             | NOT NULL                       |
| `linguagem`    | `VARCHAR` | Linguagem principal (ex: Python, Rust).       | NOT NULL                       |
| `status_ativo` | `BOOLEAN` | Indica se o link está funcional ou quebrado. | DEFAULT TRUE (**RF03** ) |

---

### Entidade: Favoritos (`Favorite`)

**Finalidade:** Relacionamento N:N para persistência de itens favoritados ( **RF02** ).

**PK:** Composta (`usuario_id`, `ferramenta_id`) | **FK:** `usuario_id`, `ferramenta_id`

| Atributo          | Tipo            | Descrição                        | Restrições    |
| ----------------- | --------------- | ---------------------------------- | --------------- |
| `usuario_id`    | `INTEGER`     | Referência ao usuário (User).    | FK, PK Composta |
| `ferramenta_id` | `INTEGER`     | Referência à ferramenta (Tool).  | FK, PK Composta |
| `adicionado_at` | `TIMESTAMPTZ` | Data em que o item foi favoritado. | DEFAULT NOW()   |

---

### Entidade: Links Privados (`PrivateLink`)

**Finalidade:** Armazenamento de URLs personalizadas do usuário ( **RF04/RN03** ).

**PK:** `id` | **FK:** `usuario_id`

| Atributo       | Tipo        | Descrição                            | Restrições |
| -------------- | ----------- | -------------------------------------- | ------------ |
| `id`         | `SERIAL`  | Identificador sequencial do link.      | PK           |
| `usuario_id` | `INTEGER` | Proprietário do link privado.         | FK, NOT NULL |
| `titulo`     | `VARCHAR` | Nome atribuído pelo usuário ao link. | NOT NULL     |
| `url`        | `TEXT`    | Endereço URL externo.                 | NOT NULL     |

---

### Entidade: Chamados de Suporte (`SupportTicket`)

**Finalidade:** Registro de suporte, feedbacks e denúncias ( **RF03/RN04** ).

**PK:** `id` | **FK:** `usuario_id`

| Atributo          | Tipo            | Descrição                               | Restrições                         |
| ----------------- | --------------- | ----------------------------------------- | ------------------------------------ |
| `id`            | `SERIAL`      | Identificador sequencial do chamado.      | PK                                   |
| `usuario_id`    | `INTEGER`     | Autor do chamado (logado).                | FK, NOT NULL (**RN01** )       |
| `email_contato` | `VARCHAR`     | E-mail para retorno do suporte.           | NOT NULL                             |
| `mensagem`      | `TEXT`        | Conteúdo do chamado ou feedback.         | NOT NULL                             |
| `secao_site`    | `VARCHAR`     | Local onde o problema foi identificado.   | NOT NULL                             |
| `status`        | `VARCHAR`     | Estado: Pendente, Em Análise, Resolvido. | DEFAULT 'Pendente' (**RN04** ) |
| `criado_at`     | `TIMESTAMPTZ` | Data de envio do chamado.                 | DEFAULT NOW()                        |

---

### Padrão de Nomenclatura de Índices

Para performance ( **RNF04** ), utilizaremos o formato: `{tabela}_{coluna}_idx`.

* `usuarios_email_idx`
* `ferramentas_nome_idx`
* `favoritos_usuario_id_idx`
* `links_privados_usuario_id_idx`
* `chamados_suporte_status_idx`
