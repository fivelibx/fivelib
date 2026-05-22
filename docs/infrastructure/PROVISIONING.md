
# 🏗️ Arquitetura de Infraestrutura e Segurança: FiveLib

## 1. Visão Geral

Este documento detalha a arquitetura de infraestrutura, os serviços terceiros integrados e as estratégias de segurança implementadas no projeto  **FiveLib** . O sistema utiliza uma arquitetura distribuída, separando claramente as camadas de apresentação (Frontend), processamento e serviços integrados (Backend) e persistência de dados (Database).

## 2. Componentes da Infraestrutura

### A. Persistência de Dados: Supabase (PostgreSQL)

* **Função:** Camada de banco de dados relacional.
* **Segurança:** Utiliza autenticação baseada em credenciais (Connection String) gerenciada por variáveis de ambiente no Backend. O acesso externo é restrito e monitorado via políticas do provedor.

### B. Provedor de E-mail Transacional: Brevo (SMTP / API)

* **Função:** Serviço de mensageria responsável pelo envio de e-mails transacionais do sistema.
* **Casos de Uso:** Disparo de códigos de verificação de conta (`verification_code`) durante o cadastro e tokens de recuperação de acesso (`reset_password_code`).
* **Segurança:** Integração autenticada via chaves de API restritas e protocolos de segurança de disparo TLS/SSL, evitando que o servidor de backend caia em listas de SPAM.

### C. Backend: Render (FastAPI + Docker)

* **Função:** Camada de processamento de regras de negócio, exposição dos endpoints REST da API e gerenciamento de tarefas em segundo plano ( *Background Tasks* ).
* **Infraestrutura:** Utiliza containers Docker para garantir paridade absoluta entre o ambiente de desenvolvimento local e o ambiente produtivo no Render.
* **Deploy:** Automatizado via GitHub Actions (CI/CD), garantindo que cada push bem-sucedido na branch `main` dispare o build da nova imagem Docker diretamente no Render.

### D. Frontend: Vercel (Next.js)

* **Função:** Camada de interface de usuário (UI) utilizando o  **Next.js App Router** .
* **Distribuição:** Deploy global descentralizado utilizando a rede de borda (Edge Network) da Vercel para baixa latência.
* **Integração:** Utiliza a variável `NEXT_PUBLIC_API_URL` para comunicação com o Backend, aproveitando as funcionalidades de Server Components para chamadas seguras e otimizadas no lado do servidor.

## 3. Estratégias de Segurança

### Gerenciamento de Segredos (Secrets Management)

* **Injeção de Variáveis:** Dados sensíveis (`DATABASE_URL`, chaves de API do Brevo, segredos JWT) são configurados exclusivamente nos painéis de controle da hospedagem (Render/Vercel) e nunca são expostos no GitHub.
* **Prevenção de Vazamento:** O arquivo `.gitignore` bloqueia arquivos `.env` locais. O uso estrito de prefixos no Next.js garante que variáveis sem o prefixo `NEXT_PUBLIC_` permaneçam inacessíveis no lado do cliente (browser).

### Autenticação e Autorização (JWT)

* **Tokens Seguros:** A autenticação é baseada em tokens JWT (JSON Web Tokens) assinados digitalmente com algoritmo de hash seguro.
* **Controle de Perfil:** O backend intercepta as requisições protegidas, decodifica o token e valida a constraint de perfil (`superadmin`, `admin`, `moderador`, `user`) antes de liberar ações administrativas, como o cadastro de novas ferramentas.

### Segurança de Comunicação (CORS)

* **Restrição de Origem:** O Backend (FastAPI) utiliza o middleware de CORS configurado explicitamente para aceitar requisições apenas da URL oficial do Frontend hospedado na Vercel, mitigando ataques de Cross-Origin.

### Camadas de Proteção de Dados

* **Validação Rígida:** Uso do **Pydantic** no Backend e **Zod** no Frontend para garantir que nenhuma estrutura de JSON malformada ou com dados corrompidos atinja a camada de persistência.

## 4. Fluxo de Execução e Registro

```
[Usuário] ──> [Frontend: Vercel] ──> [Backend: Render] ──> [Database: Supabase]
                                             │
                                             └── (Background Task) ──> [Brevo SMTP]
```

1. O usuário acessa a plataforma no **Frontend (Vercel)** e realiza o cadastro.
2. O **Next.js** envia os dados limpos para o endpoint `/auth/register` do  **Backend (Render)** .
3. O Backend valida as regras (ex: maioridade +18), gera o hash da senha, calcula o `verification_code` e persiste o usuário no **Supabase** com o status `is_active = false`.
4. **Imediatamente após o salvamento** , o FastAPI delega uma tarefa em segundo plano ( *Background Task* ) que se conecta à API/SMTP do  **Brevo** .
5. O **Brevo** dispara o e-mail transacional contendo o código de ativação para a caixa de entrada do usuário de forma assíncrona, sem travar a resposta da requisição HTTP.
6. O usuário insere o código no frontend, chamando o `/auth/verify` para ativar a conta definitivamente no banco.

## 5. Requisitos de Ambiente (Prerequisites)

Para operar ou contribuir com o projeto localmente:

* **Docker Engine** (v24+) & **Docker Compose**
* **Python** 3.12+
* **Node.js** 20+ com **pnpm**

## 6. Variáveis de Ambiente Obrigatórias

| **Variável**     | **Descrição**                                              | **Escopo**   |
| ----------------------- | ------------------------------------------------------------------ | ------------------ |
| `DATABASE_URL`        | String de conexão com o PostgreSQL (Supabase)                     | Backend            |
| `JWT_SECRET`          | Chave privada e secreta para assinatura dos tokens JWT             | Backend            |
| `BREVO_API_KEY`       | Chave de autenticação da API/SMTP do Brevo                       | Backend            |
| `EMAIL_FROM`          | Endereço de e-mail remetente verificado no Brevo                  | Backend            |
| `NEXT_PUBLIC_API_URL` | Endpoint público da API (Render em prod /`localhost:8001`local) | Frontend           |
| `NODE_ENV`            | Define o ambiente (`development`ou `production`)               | Frontend / Backend |
