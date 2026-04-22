# 📂 Documentação Técnica - FiveLib

Este diretório centraliza toda a base de conhecimento, especificações e diagramas do projeto. A estrutura segue o ciclo de vida de desenvolvimento, desde a concepção até a estratégia de entrega final.

---

## 🧭 Estrutura de Diretórios

### 1. [Requirements](/docs/requirements) (`/requirements`)

**Foco:** Definição de escopo, regras de negócio e visão do produto.

* [`PRD.pdf`:](/docs/requirements/PRD.pdf) Documento de requisitos do produto (O norteador do projeto).
* [`backlog.md`](/docs/requirements/backlog.md): Lista priorizada de funcionalidades e  *User Stories* .
* [`use-case-diagram.png`:](/docs/requirements/user-case-diagram.png) Representação visual das interações dos atores com o sistema.
* [`user-flow-map.png`: ](/docs/requirements/user-flow-map.png)Mapeamento do caminho lógico do usuário dentro da plataforma.

### 2. [Architecture](/docs/architecture) (`/architecture`)

**Foco:** Estruturação técnica, modelagem de dados e contratos de interface.

* [`high-level-architecture.png`:](/docs/architecture/high-level-architecture.png) Diagrama macro da comunicação entre Frontend, Backend e Banco de Dados.
* [`erd-diagram.png`: ](/docs/architecture/erd-diagram.jpg)Modelo Entidade-Relacionamento do banco de dados PostgreSQL.
* [`data-dictionary.md`:](/docs/architecture/data-dictionary.md) Dicionário técnico detalhando tipos, restrições e indexadores.
* [`api.md`: ](/docs/architecture/api.md)Especificação técnica dos endpoints e contratos da API.
* `class-diagram.png`: Detalhamento da lógica de classes interna do sistema.

### 3. [Infrastructure](/docs/infrastructure/) (`/infrastructure`)

**Foco:** Configuração de ambiente, orquestração de containers e resiliência.

* `infrastructure-diagram.png`: Desenho da rede e dos containers Docker (App e DB).
* `deployment-pipeline.png`: Visualização do fluxo de integração e entrega contínua (CI/CD). (Ainda está a ser decidido)

### 4. [Internals](/docs/internals/) (`/internals`)

**Foco:** Governança do repositório, processos do time e gestão de tarefas.

* [`workflow.md`:](/docs/internals/workflow.md)Guia de comandos Git, Docker e fluxo de Branches (o "Como fazer").
* [`projects.md`:](/docs/internals/projects.md)Manual do GitHub Projects, uso de labels, status e sub-issues (o "Como organizar").

---

## 📄 Arquivos Globais (`/docs`)

* **`dossier-final.pdf`** : Compilado geral e definitivo do projeto para entrega e auditoria.
* **`README.md`** : Este guia de navegação da documentação.
