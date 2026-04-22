# Guia Rápido: Fluxo de Trabalho e Comandos

Este documento centraliza os comandos essenciais e o fluxo de trabalho do repositório. Siga esta estrutura para garantir que o código de todos integre sem conflitos.

## 1. Branches (Ramificações)

Nunca trabalhe diretamente na branch `main` ou `develop`. Para cada nova funcionalidade ou correção, crie uma branch isolada a partir da  **`develop`** .

* **Padrão:** `feat/nome-da-tarefa` ou `fix/nome-do-erro`.
* **Objetivo:** Isolar o desenvolvimento para evitar quebras no ambiente compartilhado e facilitar o code review.

## 2. Fluxo Git Profissional (Passo a Passo)

### A. Preparando o Ambiente

Antes de iniciar qualquer tarefa, garanta que seu ambiente local conhece o estado atual do servidor sem forçar alterações nos seus arquivos:

**Bash**

```
# 1. Atualiza as referências remotas (vê o que há de novo no GitHub)
git fetch origin

# 2. Muda para a develop e sincroniza
git switch develop
git merge origin/develop
```

### B. Criando a Feature

**Bash**

```
# Cria a branch a partir da develop atualizada
git switch -c feat/nome-da-sua-tarefa
```

### C. Sincronização Segura (Evitando perda de arquivos)

Se a `develop` foi atualizada enquanto você trabalhava e você precisa dessas mudanças,  **não use git pull** . Use o fluxo de auditoria:

**Bash**

```
# 1. Baixa as novidades sem misturar com seu código
git fetch origin

# 2. Opcional: Veja o que mudou na develop antes de aceitar
git log feat/nome-da-sua-tarefa..origin/develop

# 3. Integra as mudanças de forma consciente
git merge origin/develop
```

> **Dica de Segurança:** Se houver conflitos em arquivos críticos como `docker-compose.yml`, o Git pausará o merge. Verifique o arquivo antes de dar o `git add`.

### D. Salvando e Enviando

**Bash**

```
# 1. Adiciona as alterações
git add .

# 2. Commit com mensagem clara (Siga o Conventional Commits)
git commit -m "feat: descrição curta do que foi feito"

# 3. Envia para o repositório remoto
git push origin feat/nome-da-sua-tarefa
```

## 4. Pull Request (PR) e Revisão

## 3. Comandos Docker (Atualizado)

Mantenha o ambiente limpo e orquestrado. Utilize `docker compose` (V2).

### A. Comandos de Construção e Inicialização Total

* **`docker compose up --build`**
  * **O que faz:** Lê o seu `docker-compose.yml`, reconstrói as imagens caso tenha havido mudanças nos Dockerfiles e sobe todos os containers. É o comando "padrão" para começar o dia.
* **`docker compose down -v`**
  * **O que faz:** Para os containers e **apaga os volumes** (dados do banco). Use apenas quando precisar de um "Reset Total" no banco de dados.

### B. Comandos Específicos (Para Debug e Agilidade)

* **`docker compose build --no-cache fivelib-frontend`**
  * **O que faz:** Força o Docker a baixar todas as dependências do zero e reconstruir a imagem do Frontend sem usar o cache.
  * **Quando usar:** Quando você instala uma biblioteca nova no React e o Docker parece estar ignorando a mudança.
* **`docker compose up --build fivelib-api`**
  * **O que faz:** Reconstrói e sobe **apenas** o container do backend (FastAPI).
  * **Quando usar:** Quando você mexeu na lógica do backend ou nos modelos Pydantic e quer testar rápido sem reiniciar o banco ou o frontend.
* **`docker compose up fivelib-frontend`**
  * **O que faz:** Inicia apenas o serviço de frontend (e as dependências dele, se houver).
* **`docker compose up fivelib-api`**
  * **O que faz:** Inicia apenas a API. Ideal se você quiser rodar o banco de dados e a API no Docker, mas rodar o frontend localmente no seu terminal para usar o Hot Reload do Vite.

### C. Monitoramento

* **`docker compose logs -f`**
  * **O que faz:** Exibe os logs de todos os containers em tempo real. Essencial para ver erros de conexão com o banco ou exceções do FastAPI.

---

### ⚠️ Nota para o time (Importante):

> Se você tentar rodar `docker compose up --no-cache`, o Docker retornará um erro. O parâmetro `--no-cache` deve ser usado sempre com o comando `build`. Para forçar a recriação de containers sem reconstruir a imagem, usa-se `--force-recreate`.

Após o `push`, abra o PR no GitHub:

1. **Base:** `develop` ← **Compare:** `feat/sua-branch`.
2. Preencha o template em `.github/pull_request.md`.
3. Aguarde a revisão de pelo menos um colega antes do merge.

## 5. Gestão e Dúvidas

* **Kanban:** Mova o card para **In Progress** ao iniciar e para **Done** apenas após o Merge.
* **Bloqueios:** Travou em um erro de Docker ou conflito de Git? Poste o erro exato e o comando que gerou o problema no grupo de WhatsApp ou abra uma sub-issue.
