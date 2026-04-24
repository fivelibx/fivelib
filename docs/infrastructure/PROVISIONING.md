# Arquitetura de Infraestrutura e Segurança: FiveLib

## 1. Visão Geral
Este documento detalha a arquitetura de infraestrutura e as estratégias de segurança implementadas no projeto **FiveLib**. O sistema utiliza uma arquitetura distribuída, separando claramente as camadas de apresentação, processamento e persistência de dados.

## 2. Componentes da Infraestrutura

### A. Persistência de Dados: Supabase (PostgreSQL)
* **Função:** Camada de banco de dados relacional.
* **Segurança:** Utiliza autenticação baseada em credenciais (Connection String) gerenciada por variáveis de ambiente no Backend. O acesso externo é restrito e monitorado.

### B. Backend: Render (FastAPI + Docker)
* **Função:** Camada de processamento de regras de negócio, API e migrações de banco de dados (Alembic).
* **Infraestrutura:** Utiliza containers Docker. A configuração é garantida via variáveis de ambiente injetadas diretamente no painel do Render, evitando o armazenamento de segredos (`.env`) no repositório.
* **Deploy:** Automatizado via GitHub, garantindo que o ambiente de produção espelhe a arquitetura testada localmente.

### C. Frontend: Vercel (Vite + React)
* **Função:** Camada de interface de usuário (UI).
* **Distribuição:** Deploy em rede de borda (Edge Network) para alta performance.
* **Integração:** Comunica-se com o Backend via requisições HTTP, utilizando a variável `VITE_API_URL` para identificar o ponto de extremidade da API.

---

## 3. Estratégias de Segurança

### Gerenciamento de Segredos (Secrets Management)
* **Injeção de Variáveis:** Todos os dados sensíveis (`DATABASE_URL`, chaves de acesso) são configurados nos painéis de controle dos provedores e nunca são expostos no código-fonte ou no GitHub.
* **Exclusão de Arquivos:** O arquivo `.gitignore` está configurado para impedir o envio acidental de arquivos `.env` locais.

### Segurança de Comunicação (CORS)
* **Restrição de Origem:** O Backend (FastAPI) utiliza o middleware de CORS para aceitar requisições apenas da URL oficial do Frontend hospedado na Vercel. 
* Isso impede que sites terceiros ou scripts maliciosos consigam consumir a API sem autorização, mesmo que conheçam o endpoint.

### Segregação de Responsabilidades
* O **Frontend** atua apenas como consumidor. Ele não possui permissão de acesso direto ao banco de dados, protegendo a integridade das tabelas contra manipulações diretas no navegador.
* O **Backend** centraliza a validação de dados e regras de acesso antes de qualquer operação de leitura ou escrita.

---

## 4. Fluxo de Execução
1. O usuário interage com o **Frontend (Vercel)**.
2. O navegador realiza chamadas para o endereço definido em `VITE_API_URL`.
3. O **Backend (Render)** valida a origem (CORS).
4. O Backend processa a lógica e consulta o **Supabase** via `DATABASE_URL`.
5. Os dados retornam para o usuário de forma segura e tratada.

---

## 5. Requisitos de Ambiente (Prerequisites)
Para desenvolver ou operar este sistema, certifique-se de ter:
* Docker Engine (v24+)
* Python 3.12+
* Node.js 20+

## 6. Variáveis de Ambiente
O projeto depende das seguintes variáveis (configure-as no painel de controle do seu provedor):

| Variável | Descrição | Obrigatório |
| :--- | :--- | :--- |
| `DATABASE_URL` | Conexão com Supabase (PostgreSQL) | Sim |
| `VITE_API_URL` | Endpoint da API do Backend | Sim |