
# 🏗️ Arquitetura de Infraestrutura e Segurança: FiveLib

## 1. Visão Geral

Este documento detalha a arquitetura de infraestrutura e as estratégias de segurança implementadas no projeto  **FiveLibX** . O sistema utiliza uma arquitetura distribuída, separando claramente as camadas de apresentação (Frontend), processamento (Backend) e persistência de dados (Database).

## 2. Componentes da Infraestrutura

### A. Persistência de Dados: Supabase (PostgreSQL)

* **Função:** Camada de banco de dados relacional.
* **Segurança:** Utiliza autenticação baseada em credenciais (Connection String) gerenciada por variáveis de ambiente no Backend. O acesso externo é restrito e monitorado via políticas do provedor.

### B. Backend: Render (FastAPI + Docker)

* **Função:** Camada de processamento de regras de negócio, API e migrações de banco de dados via **SQLAlchemy** e  **Alembic** .
* **Infraestrutura:** Utiliza containers Docker para garantir paridade entre os ambientes de desenvolvimento (homelab) e produção.
* **Deploy:** Automatizado via GitHub Actions, garantindo que cada push na branch `main` dispare o build da imagem Docker no Render.

### C. Frontend: Vercel (Next.js)

* **Função:** Camada de interface de usuário (UI) utilizando o  **Next.js App Router** .
* **Distribuição:** Deploy em rede de borda (Edge Network) da Vercel.
* **Integração:** Utiliza a variável `NEXT_PUBLIC_API_URL` para comunicação com o Backend, aproveitando as funcionalidades de Server Components para chamadas seguras no lado do servidor.

---

## 3. Estratégias de Segurança

### Gerenciamento de Segredos (Secrets Management)

* **Injeção de Variáveis:** Dados sensíveis (`DATABASE_URL`, chaves de API) são configurados exclusivamente nos painéis de controle (Render/Vercel) e nunca expostos no GitHub.
* **Prevenção de Vazamento:** O arquivo `.gitignore` bloqueia arquivos `.env` locais, e o uso de tipos de variáveis no Next.js (com e sem o prefixo `NEXT_PUBLIC_`) garante que segredos de backend não vazem para o navegador.

### Segurança de Comunicação (CORS)

* **Restrição de Origem:** O Backend (FastAPI) utiliza o middleware de CORS para aceitar requisições apenas da URL oficial do Frontend. Isso impede que scripts maliciosos consumam a API de domínios não autorizados.

### Camadas de Proteção

* **Server-Side Rendering (SSR):** O uso de Next.js permite que certas validações e buscas de dados ocorram no servidor, ocultando a lógica de negócio e os endpoints internos do cliente final.
* **Validação de Esquemas:** Uso extensivo de **Pydantic** no Backend e **Zod** no Frontend para garantir a integridade dos dados trafegados via JSON.

---

## 4. Fluxo de Execução

1. O usuário acessa o  **Frontend (Vercel)** .
2. O **Next.js** renderiza a página (via Server ou Client Components).
3. Chamadas de API são feitas para o **Backend (Render)** usando `NEXT_PUBLIC_API_URL`.
4. O Backend valida a requisição, processa a lógica com **SQLAlchemy** e consulta o  **Supabase** .
5. A resposta retorna tratada para a interface do usuário.

---

## 5. Requisitos de Ambiente (Prerequisites)

Para operar ou contribuir com o projeto localmente:

* **Docker Engine** (v24+)
* **Python** 3.12+ (gerenciado via `pyenv`)
* **Node.js** 20+ com **pnpm**
* **PostgreSQL** (ou container Docker local para testes)

## 6. Variáveis de Ambiente

| Variável               | Descrição                                    | Escopo   |
| ----------------------- | ---------------------------------------------- | -------- |
| `DATABASE_URL`        | String de conexão com o PostgreSQL (Supabase) | Backend  |
| `NEXT_PUBLIC_API_URL` | Endpoint público da API para o Frontend       | Frontend |
| `NODE_ENV`            | Define o ambiente (development/production)     |          |
