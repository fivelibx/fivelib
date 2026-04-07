# Guia Rápido: Fluxo de Trabalho e Comandos

Este documento centraliza os comandos essenciais e o fluxo de trabalho do repositório. Siga esta estrutura para garantir que o código de todos integre sem conflitos.

## 1. Branches (Ramificações)
Nunca trabalhe diretamente na branch `main` ou `develop`. Para cada nova funcionalidade ou correção, crie uma branch isolada. O padrão de nomenclatura é `feat/nome-da-tarefa` (para novas funções) ou `fix/nome-do-erro` (para correções).

**Por que fazer isso?** Isolando o seu código, você não quebra o sistema dos outros enquanto está desenvolvendo, e permite que o código seja revisado antes de ir para a versão oficial.

## 2. Comandos Git Essenciais (Passo a Passo)

Sempre que for iniciar uma nova tarefa, garanta que seu código local está atualizado antes de criar a sua branch:

1. **Baixar as atualizações mais recentes:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Criar a sua branch e mudar para ela:**

   ```bash
   git checkout -b feat/nome-da-sua-tarefa
   ```
3. **Salvar as alterações (após codificar):**

   ```bash
   git add .
   ```

   *(Nota: O ponto `.` adiciona todos os arquivos modificados. Se quiser adicionar um específico, use `git add nome-do-arquivo`)*
4. **Registrar as alterações (Commit):**

   ```bash
   git commit -m "feat: descrição curta do que foi feito"
   ```
5. **Enviar a sua branch para o GitHub:**

   ```bash
   git push origin feat/nome-da-sua-tarefa
   ```

## 3. Comandos Docker

Os comandos abaixo funcionam tanto no terminal do Linux quanto no PowerShell do Windows. (Usuários de Windows: certifiquem-se de que o Docker Desktop está rodando em segundo plano).

* **Subir os containers pela primeira vez ou recriar imagens:**

  ```bash
  docker compose up --build
  ```

  *(Use a flag `--build` sempre que houver alteração em arquivos `Dockerfile`, `requirements.txt`, `package.json` ou variáveis de ambiente).*
* **Subir os containers no dia a dia (mais rápido):**

  ```bash
  docker compose up
  ```
* **Derrubar os containers (Quando terminar de trabalhar):**

  ```bash
  docker compose down
  ```

## 4. Pull Request (PR) e Revisão de Código

Após rodar o comando `git push`, acesse o repositório no GitHub:

1. Clique no botão verde  **Compare & pull request** .
2. Preencha a descrição seguindo estritamente o template localizado em `.github/pull_request.md`.
3. Adicione as **Tags (Labels)** correspondentes à sua tarefa.
4. Marque os membros da equipe no campo **Reviewers** para avaliação do código.

## 5. Gestão de Tarefas (GitHub Projects / Kanban)

O acompanhamento das tarefas é feito pelo Kanban na aba **Projects** do GitHub.

* Mova o card da sua tarefa pelas colunas de progresso conforme avança.
* **Atenção:** Uma tarefa só deve ser movida para a coluna **Done (Concluído)** após o Pull Request ter sido aprovado (Review) e mesclado (Merged) na branch principal.

## 6. Dúvidas e Bloqueios

Se você travar em algum problema técnico ou de estrutura:

1. Consulte primeiro a documentação na pasta `/docs`.
2. Caso a dúvida persista e seja um impedimento técnico complexo, abra uma sub-issue utilizando o template `.github/issue_duvida.md`.
3. Se for uma dúvida rápida, envie diretamente no grupo do WhatsApp da equipe.
