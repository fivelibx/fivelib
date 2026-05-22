
# Dicionário de Dados - FiveLib (v1.0.0 - Sincronizado ao DB)

Este documento descreve a estrutura lógica e física do banco de dados PostgreSQL do projeto FiveLib.

## Identificação

* **Nome do Sistema:** FiveLib (Antigo DevAcademicX)
* **Equipe:** Lucas Paiva Santos de Oliveira, Mateus Alves Marques Macido, Rodrigo Moraes dos Santos, Nicolas Rosa Santos, Raian Luis dos Santos, Felipe Gonçalves
* **Data:** Maio de 2026

## 1. Cardinalidade

**Tabela de cardinalidade:**

| **Entidade A**    | **Relacionamento** | **Entidade B**    | **Cardinalidade** | **Justificativa**                                                              |
| ----------------------- | ------------------------ | ----------------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| **User**          | Possui                   | **Favorite**      | **0:N**           | Um usuário pode não ter favoritos ou ter vários (**RF02/RN03** ).           |
| **Tool**          | É favoritada em         | **Favorite**      | **0:N**           | Uma ferramenta pode ser nova e não ter favoritismos.                                |
| **User**          | Cadastra                 | **PrivateLink**   | **0:N**           | O usuário decide se quer adicionar links privados (**RF04/RN03** ).           |
| **User**          | Abre                     | **SupportTicket** | **1:N**           | Restrito a usuários cadastrados (+18 anos) conforme**RN01** .                 |
| **SupportTicket** | Pertence a               | **User**          | **1:1**           | Cada ticket é obrigatoriamente vinculado a um autor para gestão (**RN04** ). |

## 2. Definição de Entidades

### Entidade: Usuários (`user`)

**Finalidade:** Gestão de identidade, controle de fluxo de ativação, recuperação de credenciais, conformidade de termos e perfis de acesso ( **RF05** ).

**PK:** `id` | **FK:** Nenhuma

| **Atributo**            | **Tipo**   | **Descrição**                              | **Restrições**                    |
| ----------------------------- | ---------------- | -------------------------------------------------- | ----------------------------------------- |
| `id`                        | `INTEGER`      | Identificador único incremental.                  | PK, DEFAULT nextval()                     |
| `nome`                      | `VARCHAR(255)` | Nome completo do usuário.                         | NOT NULL                                  |
| `email`                     | `VARCHAR(255)` | E-mail institucional ou pessoal.                   | NOT NULL, UNIQUE (`user_email_unique`)  |
| `senha`                     | `VARCHAR(255)` | Hash da senha para armazenamento seguro.           | NOT NULL                                  |
| `data_nascimento`           | `DATE`         | Data de nascimento para validação de maioridade. | NOT NULL (**RN01** )                |
| `perfil`                    | `VARCHAR(255)` | Nível de acesso no sistema.                       | NOT NULL, CHECK (`check_perfil_valido`) |
| `criado_at`                 | `TIMESTAMPTZ`  | Data e hora exata da criação da conta.           | NOT NULL, DEFAULT NOW()                   |
| `is_active`                 | `BOOLEAN`      | Status de ativação da conta via e-mail.          | DEFAULT FALSE                             |
| `verification_code`         | `VARCHAR`      | Código temporário para ativação da conta.      | NULLABLE                                  |
| `verification_expires_at`   | `TIMESTAMPTZ`  | Prazo de expiração do código de ativação.     | NULLABLE                                  |
| `accepted_terms`            | `BOOLEAN`      | Flag indicando aceite dos termos de uso.           | DEFAULT FALSE                             |
| `accepted_terms_at`         | `TIMESTAMPTZ`  | Timestamp do momento do aceite dos termos.         | NULLABLE                                  |
| `reset_password_code`       | `TEXT`         | Código temporário de recuperação de senha.     | NULLABLE                                  |
| `reset_password_expires_at` | `TIMESTAMPTZ`  | Prazo de expiração do código de recuperação.  | NULLABLE                                  |
| `titulo_profissional`       | `VARCHAR(150)` | Cargo ou título do usuário (ex: Dev Backend).    | NULLABLE                                  |
| `github`                    | `VARCHAR(50)`  | Username do perfil do GitHub.                      | NULLABLE                                  |
| `linkedin`                  | `VARCHAR(50)`  | Username do perfil do LinkedIn.                    | NULLABLE                                  |

> **Regra de Validação Integrada (`check_perfil_valido`):** > `CHECK (perfil IN ('superadmin', 'admin', 'moderador', 'user'))`

### Entidade: Ferramentas (`tool`)

**Finalidade:** Catálogo centralizado de tecnologias, bibliotecas, frameworks e indexação de metadados visuais ( **RF01** ).

**PK:** `id` | **FK:** Nenhuma

| **Atributo** | **Tipo**     | **Descrição**                            | **Restrições**                  |
| ------------------ | ------------------ | ------------------------------------------------ | --------------------------------------- |
| `id`             | `INTEGER`        | Identificador único incremental.                | PK, DEFAULT nextval()                   |
| `nome`           | `VARCHAR(255)`   | Nome da biblioteca ou framework.                 | NOT NULL, UNIQUE (`tool_nome_unique`) |
| `descricao`      | `TEXT`           | Descrição técnica simplificada da ferramenta. | NOT NULL                                |
| `url_oficial`    | `TEXT`           | Link de redirecionamento para a doc oficial.     | NOT NULL                                |
| `linguagem`      | `VARCHAR(255)`   | Linguagem principal do ecossistema.              | NOT NULL                                |
| `status_ativo`   | `BOOLEAN`        | Se a ferramenta está ativa e visível no app.   | NOT NULL, DEFAULT TRUE                  |
| `stars`          | `INTEGER`        | Contador global de favoritadas recebidas.        | NOT NULL, DEFAULT 0                     |
| `tags`           | `VARCHAR(255)[]` | Array de sub-tecnologias (ex:`{UI, SPA}`).     | NOT NULL, DEFAULT '{}'                  |
| `categoria`      | `VARCHAR(255)`   | Categoria principal para filtros na listagem.    | NOT NULL, DEFAULT 'Geral'               |
| `icon_slug`      | `VARCHAR(255)`   | Slug identificador do ícone para o frontend.    | NULLABLE                                |

### Entidade: Favoritos (`favorite`)

**Finalidade:** Tabela de junção (N:N) para persistência de itens favoritados pelos usuários ( **RF02** ).

**PK:** Composta (`usuario_id`, `ferramenta_id`) | **FK:** `usuario_id`, `ferramenta_id`

| **Atributo** | **Tipo**  | **Descrição**                       | **Restrições**  |
| ------------------ | --------------- | ------------------------------------------- | ----------------------- |
| `usuario_id`     | `INTEGER`     | Referência ao id do usuário.              | PK, FK (`user.id`)    |
| `ferramenta_id`  | `INTEGER`     | Referência ao id da ferramenta.            | PK, FK (`tool.id`)    |
| `adicionado_at`  | `TIMESTAMPTZ` | Timestamp do momento do clique no favorito. | NOT NULL, DEFAULT NOW() |

### Entidade: Links Privados (`private_link`)

**Finalidade:** Armazenamento exclusivo de URLs externas e personalizadas cadastradas pelo usuário ( **RF04/RN03** ).

**PK:** `id` | **FK:** `usuario_id`

| **Atributo** | **Tipo**   | **Descrição**                      | **Restrições**     |
| ------------------ | ---------------- | ------------------------------------------ | -------------------------- |
| `id`             | `INTEGER`      | Identificador único incremental.          | PK, DEFAULT nextval()      |
| `usuario_id`     | `INTEGER`      | Proprietário do link privado.             | FK (`user.id`), NOT NULL |
| `titulo`         | `VARCHAR(255)` | Nome amigável que o usuário deu ao link. | NOT NULL                   |
| `url`            | `TEXT`         | URL externa salva pelo usuário.           | NOT NULL                   |

### Entidade: Chamados de Suporte (`support_ticket`)

**Finalidade:** Canal de reporte de bugs, feedbacks técnicos e auditoria interna via painel administrativo ( **RF03/RN04** ).

**PK:** `id` | **FK:** `usuario_id`

| **Atributo**   | **Tipo**   | **Descrição**                         | **Restrições**       |
| -------------------- | ---------------- | --------------------------------------------- | ---------------------------- |
| `id`               | `INTEGER`      | Identificador único incremental.             | PK, DEFAULT nextval()        |
| `usuario_id`       | `INTEGER`      | Autor logado que gerou o ticket.              | FK (`user.id`), NOT NULL   |
| `email_contato`    | `VARCHAR(255)` | E-mail opcional ou alternativo para retorno.  | NOT NULL                     |
| `mensagem`         | `TEXT`         | Detalhamento do chamado ou bug.               | NOT NULL                     |
| `secao_site`       | `VARCHAR(255)` | Contexto/Página onde ocorreu o problema.     | NOT NULL                     |
| `status`           | `VARCHAR(255)` | Estado do fluxo do ticket.                    | NOT NULL, DEFAULT 'Pendente' |
| `criado_at`        | `TIMESTAMPTZ`  | Data e hora exata da abertura do chamado.     | NOT NULL, DEFAULT NOW()      |
| `observacao_admin` | `TEXT`         | Nota interna inserida pela moderação/admin. | NULLABLE                     |

## 3. Índices e Restrições Físicas (Mapeamento do Banco)

Para garantir os requisitos de performance e unicidade ( **RNF04** ), os seguintes índices físicos estão criados de forma explícita na árvore de tabelas:

* `user_email_unique` — Garante que não existam dois cadastros com o mesmo e-mail.
* `tool_nome_unique` — Impede a duplicidade de ferramentas com o mesmo nome.
* `favorite_usuario_id_idx` — Otimiza a busca de todas as ferramentas favoritadas de um usuário específico.
* `favorite_ferramenta_id_idx` — Agiliza a contagem e auditoria de quais usuários favoritaram uma ferramenta.
* `favorite_adicionado_at_idx` — Ordenação cronológica dos favoritos na linha do tempo.
* `private_link_usuario_id_idx` — Acelera o carregamento da biblioteca de links customizados ao renderizar o dashboard do usuário.
* `support_ticket_usuario_id_idx` — Vincula rapidamente o histórico de chamados abertos por um ID.
* `support_ticket_status_idx` — Utilizado pela administração para filtrar tickets que ainda estão com o estado como `'Pendente'`.
