# 📂 Documentação Técnica - FiveLib

Este diretório centraliza toda a base de conhecimento, especificações e diagramas do projeto. A estrutura segue o ciclo de vida de desenvolvimento, desde a concepção até a estratégia de entrega final.

---

## 🧭 Estrutura de Diretórios

### 1. [Requirements](/docs/requirements) (`/requirements`)

**Foco:** Definição de escopo, regras de negócio e visão do produto.

* `PRD.pdf`: Documento de requisitos do produto (O norteador do projeto).
* `product-backlog.md`: Lista priorizada de funcionalidades e  *User Stories* .
* `use-case-diagram.png`: Representação visual das interações dos atores com o sistema.
* `user-flow-map.png`: Mapeamento do caminho lógico do usuário dentro da plataforma.

### 2. [Architecture](/docs/architecture) (`/architecture`)

**Foco:** Estruturação técnica, modelagem de dados e contratos de interface.

* `high-level-architecture.png`: Diagrama macro da comunicação entre Frontend, Backend e Banco de Dados.
* `erd-diagram.png`: Modelo Entidade-Relacionamento do banco de dados PostgreSQL.
* `data-dictionary.md`: Dicionário técnico detalhando tipos, restrições e indexadores.
* `openapi.yaml` / `api.md`: Especificação técnica dos endpoints e contratos da API.
* `class-diagram.png`: (Opcional) Detalhamento da lógica de classes interna do sistema.

### 3. [Infrastructure]() (`/infrastructure`)

**Foco:** Configuração de ambiente, orquestração de containers e resiliência.

* `infrastructure-diagram.png`: Desenho da rede e dos containers Docker (App e DB).
* `deployment-pipeline.png`: Visualização do fluxo de integração e entrega contínua (CI/CD). (Ainda está a ser decidido)

---

## 📄 Arquivos Globais (`/docs`)

* **`dossier-final.pdf`** : Compilado geral e definitivo do projeto para entrega e auditoria.
* **`README.md`** : Este guia de navegação da documentação.
