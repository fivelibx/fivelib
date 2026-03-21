# DevAcademicX

## Visão Geral

O **DevAcademicX** é uma plataforma web criada para guiar iniciantes na área de programação.
O objetivo é centralizar conteúdos essenciais, ferramentas e documentações em um único lugar organizado.

A plataforma irá oferecer:

* Direcionamento para iniciantes (por onde começar)
* Explicações de ferramentas importantes (Docker, Git, APIs)
* Links organizados para documentações oficiais e bibliotecas
* Sistema de autenticação (login/logout)
* Sistema de favoritos (salvar conteúdos úteis)

---

## Objetivo do Projeto

* Reduzir a confusão de iniciantes
* Fornecer uma base estruturada de aprendizado
* Centralizar recursos confiáveis
* Permitir evolução para web + mobile

---

## Arquitetura

O projeto segue o modelo  **API-first** , com separação entre frontend e backend:

```
Frontend (Web)  --->  Backend (API)  --->  Banco de Dados
                         ↑
                     (Mobile no futuro)
```

### Decisões principais:

* Frontend e backend desacoplados
* Backend como fonte principal de dados
* Preparado para expansão mobile

---

## Estrutura do Projeto

```
devacademicx/
│
├── backend/                # API principal (FastAPI), contém regras de negócio, autenticação e acesso ao banco
│   ├── app/                # Código da aplicação (arquitetura em camadas)
│   ├── tests/              # Testes automatizados
│   ├── alembic/            # Migrations do banco de dados
│   ├── requirements.txt    # Dependências do projeto
│   ├── pyproject.toml      # Configuração do projeto Python
│   ├── Dockerfile          # Container do backend
│   └── .env                # Variáveis de ambiente do backend
│
├── frontend/               # Aplicação web (interface), consome a API do backend
│   ├── src/                # Código fonte da interface
│   ├── public/             # Arquivos estáticos
│   ├── package.json        # Dependências e scripts do frontend
│   ├── tsconfig.json       # Configuração do TypeScript
│   ├── Dockerfile          # Container do frontend
│   └── .env                # Variáveis de ambiente do frontend
│
├── mobile/                 # Aplicação mobile (futuro), usará a mesma API do backend
│   └── ...
│
├── docs/                   # Documentação do projeto (requisitos, arquitetura, API, decisões)
│   ├── architecture.md     # Estrutura técnica do sistema
│   ├── api.md              # Endpoints e uso da API
│   └── adr/                # Decisões arquiteturais registradas
│
├── infra/                  # Configuração de infraestrutura e suporte a deploy
│   ├── nginx/              # Configuração de proxy/rede
│   │   └── nginx.conf
│   └── scripts/            # Scripts auxiliares
│
├── docker-compose.yml      # Orquestra backend, frontend e banco
├── .env                    # Variáveis globais
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Documentação principal
└── Makefile                # Atalhos de comandos do projeto
```

---

## Backend

Local: `backend`

Responsável por:

* Autenticação
* Regras de negócio
* Usuários e favoritos
* Exposição da API

---

## Frontend

Local: `frontend`

Responsável por:

* Interface do usuário
* Consumo da API

---

## Documentação

Documentação detalhada disponível em:

[`docs/requirements.md`](#requirements.md)  -> requisitos do sistema (RF, RNF, regras de negócio, casos de uso, fluxos)
[`docs/api.md`](#api.md)           -> como consumir a API (endpoints, requests, responses)
[`docs/architecture.md`](#arquicture.md)  -> estrutura interna do sistema (arquitetura, camadas, decisões técnicas)
[`docs/briefing.md`](#briefing.md)      -> contexto inicial e definições do projeto
[`docs/validation.md`](#validation.md)    -> validação dos requisitos ao final do projeto
[`docs/adr/`](/docs/adr/)             -> decisões arquiteturais registradas
[`docs/diagrams/`](/docs/diagrams)        -> diagramas (arquitetura, fluxo, banco de dados)

---

## Como rodar o projeto

```
make up
```

ou

```
docker-compose up --build
```

---

## Regras do Projeto

* Não misturar frontend com backend
* Backend deve expor API (sem lógica de interface)
* Organização por responsabilidade
* Evitar complexidade desnecessária
* Manter consistência entre o time

---
