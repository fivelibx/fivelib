## Table `favorite`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `usuario_id` | `int4` | Primary |
| `ferramenta_id` | `int4` | Primary |
| `adicionado_at` | `timestamptz` |  |

## Table `private_link`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `usuario_id` | `int4` |  |
| `titulo` | `varchar` |  |
| `url` | `text` |  |

## Table `support_ticket`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `usuario_id` | `int4` |  |
| `email_contato` | `varchar` |  |
| `mensagem` | `text` |  |
| `secao_site` | `varchar` |  |
| `status` | `varchar` |  |
| `criado_at` | `timestamptz` |  |
| `observacao_admin` | `text` |  Nullable |

## Table `tool`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `nome` | `varchar` |  Unique |
| `descricao` | `text` |  |
| `url_oficial` | `text` |  |
| `linguagem` | `varchar` |  |
| `status_ativo` | `bool` |  |
| `stars` | `int4` |  |
| `tags` | `_varchar` |  |
| `categoria` | `varchar` |  |
| `icon_slug` | `varchar` |  Nullable |

## Table `user`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `nome` | `varchar` |  |
| `email` | `varchar` |  Unique |
| `senha` | `varchar` |  |
| `data_nascimento` | `date` |  |
| `perfil` | `varchar` |  |
| `criado_at` | `timestamptz` |  |
| `is_active` | `bool` |  Nullable |
| `verification_code` | `varchar` |  Nullable |
| `verification_expires_at` | `timestamptz` |  Nullable |
| `accepted_terms` | `bool` |  Nullable |
| `accepted_terms_at` | `timestamptz` |  Nullable |
| `reset_password_code` | `text` |  Nullable |
| `reset_password_expires_at` | `timestamptz` |  Nullable |
| `titulo_profissional` | `varchar` |  Nullable |
| `github` | `varchar` |  Nullable |
| `linkedin` | `varchar` |  Nullable |

