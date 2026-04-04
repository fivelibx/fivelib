# Dicionário de Dados - FiveLib (v1.0)

Este documento descreve a estrutura lógica e física do banco de dados PostgreSQL do projeto FiveLib.

---

## 1. Entidade: Usuários (User)
**Finalidade:** Gestão de identidade, autenticação e perfis de acesso.
**Padrão de Índice:** `usuarios_coluna_idx`

| Coluna | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | Identificador único. | PK |
| `nome` | `VARCHAR(100)` | Nome completo do usuário/estudante. | NOT NULL |
| `email` | `VARCHAR(100)` | Endereço de e-mail institucional ou pessoal. | NOT NULL, UNIQUE (RN02) |
| `senha` | `VARCHAR(255)` | Hash da senha (armazenamento seguro). | NOT NULL |
| `data_nascimento` | `DATE` | Data de nascimento (Validação +18). | NOT NULL (RN01) |
| `perfil` | `VARCHAR(20)` | Nível de acesso: `user`, `admin`, `moderator`. | NOT NULL |
| `criado_at` | `TIMESTAMPTZ` | Timestamp de criação da conta. | DEFAULT NOW() |

---

## 2. Entidade: Ferramentas (Tool)
**Finalidade:** Catálogo centralizado de bibliotecas e frameworks.
**Padrão de Índice:** `ferramentas_coluna_idx`

| Coluna | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | Identificador único da ferramenta. | PK |
| `nome` | `VARCHAR(100)` | Nome da biblioteca ou framework. | NOT NULL, UNIQUE |
| `descricao` | `TEXT` | Descrição técnica simplificada. | NOT NULL |
| `url_oficial` | `TEXT` | Link para documentação oficial. | NOT NULL |
| `linguagem` | `VARCHAR(50)` | Linguagem principal (ex: Python, Rust). | NOT NULL |
| `status_ativo` | `BOOLEAN` | Indica se o link foi reportado ou não. | DEFAULT TRUE |

---

## 3. Entidade: Favoritos (Favorite)
**Finalidade:** Relacionamento N:N para persistência de itens favoritados (RF02).

| Coluna | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `usuario_id` | `INTEGER` | Referência ao usuário. | FK (User), PK Composta |
| `ferramenta_id` | `INTEGER` | Referência à ferramenta. | FK (Tool), PK Composta |
| `adicionado_at` | `TIMESTAMPTZ` | Data da marcação do favorito. | DEFAULT NOW() |

---

## 4. Entidade: Links Privados (PrivateLink)
**Finalidade:** Armazenamento de URLs personalizadas do usuário (RF04).

| Coluna | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | Identificador sequencial. | PK |
| `usuario_id` | `INTEGER` | Dono do link privado. | FK (User), NOT NULL (RN03) |
| `titulo` | `VARCHAR(100)` | Nome atribuído pelo usuário ao link. | NOT NULL |
| `url` | `TEXT` | Endereço URL externo. | NOT NULL |

---

## 5. Entidade: Chamados de Suporte (SupportTicket)
**Finalidade:** Registro de suporte, feedbacks e denúncias (RF03/RN04).

| Coluna | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | Identificador sequencial. | PK |
| `usuario_id` | `INTEGER` | Vínculo opcional se o usuário estiver logado. | FK (User), NULLABLE |
| `email_contato` | `VARCHAR(100)` | E-mail para retorno (visitante ou usuário). | NOT NULL |
| `mensagem` | `TEXT` | Conteúdo do chamado/feedback. | NOT NULL |
| `secao_site` | `VARCHAR(50)` | Onde o problema foi identificado. | NOT NULL |
| `status` | `VARCHAR(20)` | Estado: `Pendente`, `Em Análise`, `Resolvido`. | DEFAULT 'Pendente' |
| `criado_at` | `TIMESTAMPTZ` | Data de envio do chamado. | DEFAULT NOW() |

---

### Padrão de Nomenclatura de Índices
Para otimização de consultas (Performance RNF04), seguiremos o formato: `{tabela}_{coluna}_idx`.

- `usuarios_email_idx`
- `ferramentas_nome_idx`
- `favoritos_usuario_id_idx`
- `links_privados_usuario_id_idx`
- `chamados_suporte_status_idx`