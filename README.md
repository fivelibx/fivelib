# DevAcademicX

## 📌 Visão Geral

O **DevAcademicX** (FiveLib) é uma plataforma web projetada para centralizar e organizar conteúdos essenciais para iniciantes na área de programação. O foco é reduzir a sobrecarga de informação, oferecendo um guia estruturado de ferramentas, documentações oficiais e bibliotecas.

### Funcionalidades Principais:

* **Curadoria Técnica:** Direcionamento para iniciantes e explicações de ferramentas (Docker, Git, APIs).
* **Hub de Documentação:** Links organizados para fontes oficiais e confiáveis.
* **Personalização:** Sistema de autenticação para gestão de favoritos e biblioteca pessoal.

---

## 🏗️ Arquitetura do Sistema

O projeto adota uma abordagem **API-first** com desacoplamento total entre as camadas:

- **Frontend (Web):** Consome a API de forma assíncrona.
- **Backend (API):** Desenvolvido em FastAPI/Python, concentrando toda a lógica de negócio.
- **Banco de Dados:** PostgreSQL para persistência de usuários, favoritos e metadados.

---

## 📁 Estrutura do Repositório

```text
devacademicx/
├── backend/            # API principal (FastAPI), regras de negócio e persistência.
├── frontend/           # Interface Web (React/Next.js/Vue), consome a API.
├── docs/               # Documentação técnica organizada por domínios.
│   ├── requirements/   # PRD, Backlog, Casos de Uso.
│   ├── architecture/   # ERD, Dicionário de Dados, Contratos de API.
│   ├── infrastructure/ # Docker, Network, Deploy.
│   └── dossier-final.pdf
├── docker-compose.yml  # Orquestração de containers (App + DB).
├── Makefile            # Atalhos para comandos frequentes do projeto.
└── README.md           # Guia de entrada do projeto (este arquivo).
```

---

## 📖 Documentação do Projeto

Para uma compreensão detalhada da arquitetura e das regras do  **FiveLib** , acesse os diretórios específicos abaixo:

* 📂 [Requirements](/docs/requirements): Definição de escopo, regras de negócio (RN), requisitos funcionais (RF/RNF) e diagramas de caso de uso.
* 📂 [Architecture](/docs/architecture): Modelagem de dados (ERD), Dicionário de Dados, contratos da API (OpenAPI/Swagger) e diagramas estruturais.
* 📂 [Infrastructure](/docs/infrastructure): Configuração de ambiente Docker, topologia de rede, pipeline de deploy e estratégias de backup.
* 📄 [Dossier Final](#dossier.md): Compilado completo e definitivo para entrega e auditoria do projeto.

---

## 🚀 Como Executar

O projeto é totalmente conteinerizado via **Docker** para garantir paridade entre os ambientes de desenvolvimento.

**Pré-requisitos:** Docker e Docker Compose instalados.

**Bash**

```
# Subir todo o ecossistema (Frontend, Backend e Banco de Dados)
make up

# Caso não possua o Makefile configurado:
docker-compose up --build
```

---

## ⚖️ Diretrizes de Desenvolvimento

* **Decoupling:** Frontend e Backend nunca devem compartilhar lógica direta.
* **API-Driven:** Toda funcionalidade deve ser exposta via API antes de ser implementada na interface.
* **Documentation First:** Alterações em banco ou rotas devem ser refletidas no `docs/architecture` antes da implementação em código.
* **Organizational Flow:** Manter a consistência de nomenclatura conforme o Dicionário de Dados.
