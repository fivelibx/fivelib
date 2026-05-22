# 📑 Technical Dossier — FiveLib

---

## 1. Identificação do Projeto

| Campo                            | Valor                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Nome do Sistema**        | FiveLib (Sucessor do DevAcademicX)                                                              |
| **Segmento**               | Plataforma de centralização de documentação e indexação de ferramentas de desenvolvimento |
| **Versão**                | 1.0.0                                                                                           |
| **Data de Consolidação** | Maio de 2026                                                                                    |
| **Website**                | [fivelib.vercel.app](https://fivelib.vercel.app/)                                                  |
| **Repositório**           | [github.com/fivelibx/fivelib](https://github.com/fivelibx/fivelib)                                 |

### Equipe de Engenharia

| Nome                                     | Cargo / Título                       | Foco de Contribuição                                     |
| ---------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| **Lucas Paiva Santos de Oliveira** | Lead Full Stack Developer & Architect | Arquitetura, Backend, Frontend, Infraestrutura, Segurança |
| **Felipe Gonçalves**              | Contributor                           | Autenticação, lógica de interações (Stars/Favorites)  |
| **Mateus Alves Marques Macido**    | Colaborador Acadêmico                | Modelagem de sistemas, PRD, ERD                            |
| **Rodrigo Moraes dos Santos**      | Colaborador Acadêmico                | Modelagem de sistemas, regras de negócio                  |
| **Nicolas Rosa Santos**            | Colaborador Acadêmico                | Modelagem de sistemas, regras de negócio                  |
| **Raian Luis dos Santos**          | Colaborador Acadêmico                | Modelagem de sistemas, planejamento                        |

---

## 2. Visão Geral do Sistema

### 2.1 Contexto e Problema

No ecossistema atual de desenvolvimento de software, a fragmentação de informações é um obstáculo crítico. Desenvolvedores, especialmente iniciantes, enfrentam uma curva de aprendizado acentuada devido à dispersão de documentações oficiais, tutoriais de terceiros e ferramentas auxiliares em múltiplas plataformas e repositórios.

### 2.2 Objetivo

O FiveLib provê um ambiente unificado e curado que reúne bibliotecas, frameworks e documentações técnicas essenciais, operando sobre três pilares:

- **Centralização:** Hub único para consulta de links oficiais e recursos de apoio
- **Orientação:** Facilitar o onboarding de novos programadores através de uma interface objetiva e funcional
- **Comunidade:** Permitir a interação entre pares para validação de ferramentas e troca de experiências técnicas

### 2.3 Escopo Funcional

O projeto abrange os seguintes módulos:

- **Módulo de Consulta e Indexação (RF01):** Motor de busca para localização de documentações, bibliotecas e ferramentas, categorizadas por linguagem e utilidade
- **Gestão de Identidade (RF05):** Sistema de cadastro e autenticação de usuários para controle de acesso
- **Módulo de Persistência — Biblioteca Pessoal (RF02/RF04):** Funcionalidade para salvar links favoritos e gerenciar referências externas privadas
- **Módulo de Suporte e Feedback (RF03/RN04):** Interface de contato (Helpdesk) para reporte de problemas e sugestões com fluxo de moderação administrativa

---

## 3. Stakeholders e Atores

### 3.1 Stakeholders

| Stakeholder                  | Interesse no Sistema                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- |
| Alunos                       | Localizar documentações oficiais de forma rápida para acelerar o aprendizado |
| Desenvolvedores (Comunidade) | Centralizar links de ferramentas favoritas                                      |
| Mantenedores de Bibliotecas  | Ter suas ferramentas divulgadas em um portal voltado para o ensino              |
| Professores / Orientadores   | Utilizar a plataforma como repositório centralizado de referências            |
| Administradores do Sistema   | Monitorar uso, moderar conteúdo e garantir integridade do banco de dados       |

### 3.2 Atores

| Ator                          | Descrição                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Usuário Visitante**  | Indivíduo não autenticado que acessa a plataforma para consultas e visualização de links (RF01)    |
| **Usuário Registrado** | Estudante autenticado com permissão para salvar favoritos, links privados e abrir tickets (RF02/RF05) |
| **Moderador**           | Responsável técnico por validar reportes e aprovar conteúdo pendente (RN04)                         |
| **Administrador**       | Gestor com privilégios totais para gerenciar usuários e manter a base de dados (UC03/UC04)           |

---

## 4. Requisitos do Sistema

### 4.1 Requisitos Funcionais

| ID             | Requisito                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| **RF01** | O sistema deve permitir a busca e filtragem de bibliotecas e ferramentas por nome, linguagem ou categoria |
| **RF02** | O sistema deve permitir que o usuário autenticado armazene links de interesse em seu perfil pessoal      |
| **RF03** | O sistema deve permitir que o usuário reporte links quebrados ou inativos para análise da moderação   |
| **RF04** | O sistema deve permitir que o usuário adicione URLs externas à sua conta de forma privada               |
| **RF05** | O sistema deve prover funcionalidades de cadastro, login e encerramento de sessão                        |

### 4.2 Requisitos Não Funcionais

| ID              | Requisito                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------- |
| **RNF01** | O sistema deve ser operável por usuários sem treinamento prévio em até 5 minutos de navegação |
| **RNF02** | O acesso às funcionalidades de persistência deve exigir autenticação via e-mail                 |
| **RNF03** | A interface deve ser compatível com resoluções de tela de 360px a 1920px (Mobile e Desktop)      |
| **RNF04** | O tempo de resposta das consultas não deve exceder 10 segundos                                     |
| **RNF05** | O sistema deve ser distribuído como uma imagem Docker compatível com sistemas x86_64              |

### 4.3 Regras de Negócio

| ID             | Regra                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **RN01** | O cadastro de contas e o envio de formulários de suporte são restritos a usuários com idade igual ou superior a 18 anos                      |
| **RN02** | O sistema não deve permitir o registro de dois ou mais usuários com o mesmo endereço de e-mail                                               |
| **RN03** | As preferências e links salvos na biblioteca pessoal (RF02/RF04) são vinculados ao ID do usuário e não são visíveis para outros usuários |
| **RN04** | Toda mensagem enviada pelo formulário de suporte receberá inicialmente o status "Pendente" e será visível apenas no painel do Administrador |

---

## 5. Casos de Uso

### 5.1 Catálogo de Casos de Uso

| Código | Nome                 | Ator Principal      |
| ------- | -------------------- | ------------------- |
| UC01    | Acessar Home         | Usuário            |
| UC02    | Salvar Preferências | Usuário Registrado |
| UC03    | Banir Usuário       | Administrador       |
| UC04    | Restringir Usuário  | Administrador       |

### 5.2 Fluxo Principal — Consulta e Persistência

1. O usuário acessa a Landing Page (estado: Visitante)
2. O usuário realiza busca ou filtragem por linguagem/ferramenta (RF01)
3. O sistema retorna os links e detalhes técnicos da ferramenta selecionada
4. O usuário opta por realizar Login/Cadastro para desbloquear funções de personalização (RNF02)
5. O sistema vincula a ferramenta ou o link externo ao perfil do usuário e confirma o salvamento (RF02/RF04)

---

## 6. Arquitetura de Infraestrutura

### 6.1 Topologia de Rede e Componentes

O sistema é baseado em uma arquitetura distribuída e conteinerizada, segmentando responsabilidades entre interface, processamento lógico, envio de mensagens transacionais e persistência de dados relacionais.

| Componente               | Tecnologia              | Plataforma                  | Responsabilidade                                    |
| ------------------------ | ----------------------- | --------------------------- | --------------------------------------------------- |
| **Frontend**       | Next.js 16 (App Router) | Vercel (Edge Network / CDN) | Interface de usuário, SSR, gerenciamento de estado |
| **Backend**        | FastAPI + 3.12+   | Render (Docker Container)   | API REST, regras de negócio, autenticação JWT    |
| **Banco de Dados** | PostgreSQL              | Supabase                    | Persistência de dados relacionais                  |
| **Mensageria**     | Brevo (API/SMTP)        | SaaS                        | Disparo assíncrono de e-mails transacionais        |
| **Migrações**    | Alembic                 | Docker Volume               | Versionamento e controle de schema do banco         |

### 6.2 Fluxo de Comunicação

![1779472674587](infrastructure/infrastructure-diagram.png)

---

## 7. Modelagem Física de Dados

### 7.1 Cardinalidade das Entidades

| Entidade A              | Relacionamento   | Entidade B              | Cardinalidade | Justificativa                                                  |
| ----------------------- | ---------------- | ----------------------- | ------------- | -------------------------------------------------------------- |
| **User**          | Possui           | **Favorite**      | 0:N           | Um usuário pode não ter favoritos ou ter vários (RF02/RN03) |
| **Tool**          | É favoritada em | **Favorite**      | 0:N           | Uma ferramenta pode ser nova e não ter favoritos              |
| **User**          | Cadastra         | **PrivateLink**   | 0:N           | O usuário decide se quer adicionar links privados (RF04/RN03) |
| **User**          | Abre             | **SupportTicket** | 1:N           | Restrito a usuários cadastrados (+18 anos) conforme RN01      |
| **SupportTicket** | Pertence a       | **User**          | 1:1           | Cada ticket é obrigatoriamente vinculado a um autor (RN04)    |

### 7.2 Entidade: `user` (Usuários)

**Finalidade:** Gestão de identidade, controle de fluxo de ativação, recuperação de credenciais, conformidade de termos e perfis de acesso (RF05).

**PK:** `id` | **FK:** Nenhuma

| Atributo                      | Tipo             | Restrições            | Descrição                                   |
| ----------------------------- | ---------------- | ----------------------- | --------------------------------------------- |
| `id`                        | `int4`         | PK, DEFAULT nextval()   | Identificador único incremental              |
| `nome`                      | `VARCHAR(255)` | NOT NULL                | Nome completo do usuário                     |
| `email`                     | `VARCHAR(255)` | NOT NULL, UNIQUE        | E-mail institucional ou pessoal               |
| `senha`                     | `VARCHAR(255)` | NOT NULL                | Hash criptográfico da senha                  |
| `data_nascimento`           | `DATE`         | NOT NULL                | Data para validação de maioridade (RN01)    |
| `perfil`                    | `VARCHAR(255)` | NOT NULL, CHECK         | Nível de acesso no sistema                   |
| `criado_at`                 | `TIMESTAMPTZ`  | NOT NULL, DEFAULT NOW() | Data e hora de criação da conta             |
| `is_active`                 | `BOOLEAN`      | DEFAULT FALSE           | Status de ativação da conta via e-mail      |
| `verification_code`         | `VARCHAR`      | NULLABLE                | Código temporário para ativação da conta  |
| `verification_expires_at`   | `TIMESTAMPTZ`  | NULLABLE                | Prazo de expiração do código de ativação |
| `accepted_terms`            | `BOOLEAN`      | DEFAULT FALSE           | Flag de aceite dos termos de uso              |
| `accepted_terms_at`         | `TIMESTAMPTZ`  | NULLABLE                | Timestamp do momento do aceite                |
| `reset_password_code`       | `TEXT`         | NULLABLE                | Token de recuperação de credenciais         |
| `reset_password_expires_at` | `TIMESTAMPTZ`  | NULLABLE                | Expiração do token de recuperação         |
| `titulo_profissional`       | `VARCHAR(150)` | NULLABLE                | Cargo técnico exibido no perfil              |
| `github`                    | `VARCHAR(50)`  | NULLABLE                | Username do perfil do GitHub                  |
| `linkedin`                  | `VARCHAR(50)`  | NULLABLE                | Username do perfil do LinkedIn                |

> **Constraint:** `CHECK (perfil IN ('superadmin', 'admin', 'moderador', 'user'))`

### 7.3 Entidade: `tool` (Ferramentas/Tecnologias)

**Finalidade:** Catálogo centralizado de tecnologias, bibliotecas e frameworks com indexação de metadados visuais (RF01).

**PK:** `id` | **FK:** Nenhuma

| Atributo         | Tipo               | Restrições              | Descrição                                 |
| ---------------- | ------------------ | ------------------------- | ------------------------------------------- |
| `id`           | `int4`           | PK, DEFAULT nextval()     | Identificador único incremental            |
| `nome`         | `VARCHAR(255)`   | NOT NULL, UNIQUE          | Nome da biblioteca ou framework             |
| `descricao`    | `TEXT`           | NOT NULL                  | Descrição técnica simplificada           |
| `url_oficial`  | `TEXT`           | NOT NULL                  | Link para documentação oficial            |
| `linguagem`    | `VARCHAR(255)`   | NOT NULL                  | Linguagem principal do ecossistema          |
| `status_ativo` | `BOOLEAN`        | NOT NULL, DEFAULT TRUE    | Visibilidade da ferramenta no app           |
| `stars`        | `int4`           | NOT NULL, DEFAULT 0       | Contador global de favoritadas              |
| `tags`         | `VARCHAR(255)[]` | NOT NULL, DEFAULT '{}'    | Array de sub-tecnologias (ex:`{UI, SPA}`) |
| `categoria`    | `VARCHAR(255)`   | NOT NULL, DEFAULT 'Geral' | Categoria principal para filtros            |
| `icon_slug`    | `VARCHAR(255)`   | NULLABLE                  | Slug identificador do ícone (Lucide React) |

### 7.4 Entidade: `favorite` (Tabela de Junção N:N)

**Finalidade:** Persistência de itens favoritados pelos usuários (RF02).

**PK Composta:** (`usuario_id`, `ferramenta_id`) | **FK:** `usuario_id`, `ferramenta_id`

| Atributo          | Tipo            | Restrições            | Descrição                     |
| ----------------- | --------------- | ----------------------- | ------------------------------- |
| `usuario_id`    | `int4`        | PK, FK (`user.id`)    | Referência ao id do usuário   |
| `ferramenta_id` | `int4`        | PK, FK (`tool.id`)    | Referência ao id da ferramenta |
| `adicionado_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Timestamp do favoritismo        |

### 7.5 Entidade: `private_link` (Links Customizados)

**Finalidade:** Armazenamento de URLs externas e personalizadas cadastradas pelo usuário (RF04/RN03).

**PK:** `id` | **FK:** `usuario_id`

| Atributo       | Tipo             | Restrições               | Descrição                      |
| -------------- | ---------------- | -------------------------- | -------------------------------- |
| `id`         | `int4`         | PK, DEFAULT nextval()      | Identificador único incremental |
| `usuario_id` | `int4`         | FK (`user.id`), NOT NULL | Proprietário do link privado    |
| `titulo`     | `VARCHAR(255)` | NOT NULL                   | Nome amigável dado ao link      |
| `url`        | `TEXT`         | NOT NULL                   | URL externa salva pelo usuário  |

### 7.6 Entidade: `support_ticket` (Chamados de Suporte)

**Finalidade:** Canal de reporte de bugs, feedbacks técnicos e auditoria interna via painel administrativo (RF03/RN04).

**PK:** `id` | **FK:** `usuario_id`

| Atributo             | Tipo             | Restrições                 | Descrição                              |
| -------------------- | ---------------- | ---------------------------- | ---------------------------------------- |
| `id`               | `int4`         | PK, DEFAULT nextval()        | Identificador único incremental         |
| `usuario_id`       | `int4`         | FK (`user.id`), NOT NULL   | Autor logado que gerou o ticket          |
| `email_contato`    | `VARCHAR(255)` | NOT NULL                     | E-mail para retorno da resolução       |
| `mensagem`         | `TEXT`         | NOT NULL                     | Detalhamento do chamado ou bug           |
| `secao_site`       | `VARCHAR(255)` | NOT NULL                     | Contexto/Página onde ocorreu o problema |
| `status`           | `VARCHAR(255)` | NOT NULL, DEFAULT 'Pendente' | Estado do fluxo do ticket                |
| `criado_at`        | `TIMESTAMPTZ`  | NOT NULL, DEFAULT NOW()      | Data e hora de abertura do chamado       |
| `observacao_admin` | `TEXT`         | NULLABLE                     | Nota interna pela moderação/admin      |

> **Estados do ticket:** `'Pendente'` → `'Em Análise'` → `'Resolvido'`

### 7.7 Índices e Restrições Físicas

| Índice                           | Finalidade                                                       |
| --------------------------------- | ---------------------------------------------------------------- |
| `user_email_unique`             | Garante que não existam dois cadastros com o mesmo e-mail       |
| `tool_nome_unique`              | Impede a duplicidade de ferramentas com o mesmo nome             |
| `favorite_usuario_id_idx`       | Otimiza a busca de ferramentas favoritadas de um usuário        |
| `favorite_ferramenta_id_idx`    | Agiliza a contagem de usuários que favoritaram uma ferramenta   |
| `favorite_adicionado_at_idx`    | Ordenação cronológica dos favoritos                           |
| `private_link_usuario_id_idx`   | Acelera o carregamento da biblioteca de links no dashboard       |
| `support_ticket_usuario_id_idx` | Vincula rapidamente o histórico de chamados por ID de usuário  |
| `support_ticket_status_idx`     | Filtragem de tickets com status `'Pendente'` pelo painel admin |

---

## 8. Especificação de Endpoints da API REST

**Base URL (Local):** `http://localhost:8001/api/v1`
**Content-Type:** `application/json`
**Autenticação:** Bearer JWT (`Authorization: Bearer <token>`)

### 8.1 Autenticação e Ciclo de Vida do Usuário

| Método  | Rota                      | Autenticação | Descrição                                                                                                 |
| -------- | ------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| `POST` | `/auth/register`        | Pública       | Cadastro. Valida maioridade (+18). Salva com `is_active=false`. Envia código via Brevo (Background Task) |
| `POST` | `/auth/verify`          | Pública       | Ativação de conta. Compara o código e muta `is_active` para `true` se válido                        |
| `POST` | `/auth/login`           | Pública       | Autenticação. Retorna Token JWT se credenciais válidas e `is_active=true`                              |
| `POST` | `/auth/forgot-password` | Pública       | Gera código temporário de redefinição e despacha via Brevo                                              |
| `POST` | `/auth/reset-password`  | Pública       | Consome o código gerado e atualiza o hash da senha no banco                                                |

### 8.2 Ferramentas — Catálogo de Recursos

| Método  | Rota           | Autenticação                   | Descrição                                                                                                |
| -------- | -------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `GET`  | `/resources` | Pública                         | Listagem paginada de ferramentas ativas. Suporta queries por `q`, `linguagem`, `categoria` e `tag` |
| `POST` | `/resources` | JWT (`admin` / `superadmin`) | Criação de recursos. Rota protegida por middleware de papel no JWT                                       |

### 8.3 Painel Pessoal e Links Privados

| Método  | Rota                       | Autenticação | Descrição                                                                                                |
| -------- | -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `GET`  | `/users/me`              | JWT            | Dados consolidados do usuário autenticado                                                                 |
| `PUT`  | `/users/me`              | JWT            | Atualização cadastral e inserção de perfis sociais (`github`, `linkedin`, `titulo_profissional`) |
| `GET`  | `/users/me/favorites`    | JWT            | Lista de objetos `Tool` marcados como favoritos                                                          |
| `POST` | `/users/me/favorites`    | JWT            | Toggle de favorito (insere ou remove o registro e atualiza o contador `stars`)                           |
| `POST` | `/users/me/custom-links` | JWT            | Persiste registros na tabela `private_link`                                                              |

### 8.4 Canal de Suporte e Moderação

| Método   | Rota                      | Autenticação                  | Descrição                                                               |
| --------- | ------------------------- | ------------------------------- | ------------------------------------------------------------------------- |
| `POST`  | `/support/tickets`      | JWT                             | Insere nova linha em `support_ticket` com status inicial `'Pendente'` |
| `PATCH` | `/support/tickets/{id}` | JWT (`moderador` / `admin`) | Altera status do ticket e permite anexar notas em `observacao_admin`    |

---

## 9. Estratégias de Segurança da Informação

### 9.1 Controles Implementados

| Controle                            | Descrição                                                                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Isolamento de Credenciais** | Nenhuma chave (`DATABASE_URL`, `JWT_SECRET`, `BREVO_API_KEY`) reside em arquivos commitados. Injeção exclusiva via runtime das plataformas Render e Vercel        |
| **CORS Restrito**             | Middleware de CORS do FastAPI travado em nível de domínio, recusando requisições de origens que não correspondam à URL final da Vercel                              |
| **Validação Estrutural**    | Payloads de entrada e saída blindados por esquemas declarativos do**Pydantic** (backend) e **Zod** (frontend), bloqueando injeções de payloads malformados |
| **Isolamento de Tokens**      | Variáveis sem prefixo `NEXT_PUBLIC_` nunca são expostas ao browser, operando exclusivamente em Server-Side Components                                                 |
| **Hashing de Senhas**         | Hash criptográfico via `bcrypt` — credenciais nunca armazenadas em texto plano                                                                                        |
| **Tokens Temporários**       | Códigos de ativação e recuperação de senha com janela de expiração (`verification_expires_at`, `reset_password_expires_at`)                                    |

### 9.2 Resultados da Auditoria de Segurança

**Data:** 14/05/2026 | **Responsável:** Lucas Paiva Santos de Oliveira
**Branch analisada:** `develop` | **Ambiente:** Python 3.12+ / Node.js 22 / Docker

#### Ferramentas Utilizadas

| Ferramenta     | Versão | Finalidade                                         |
| -------------- | ------- | -------------------------------------------------- |
| `safety`     | 3.7.0   | Vulnerabilidades em dependências Python           |
| `bandit`     | 1.9.4   | Análise estática de segurança do código Python |
| `npm audit`  | —      | Vulnerabilidades em dependências JavaScript       |
| `hadolint`   | latest  | Boas práticas nos Dockerfiles                     |
| `trufflehog` | 2.2.1   | Detecção de segredos expostos no histórico Git  |

#### Resultados por Camada

| Camada                                   | Status      | Observação                                                                                                             |
| ---------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| Dependências Python (`safety`)        | ✅ Aprovado | `PyJWT` atualizado de 2.10.1 → ≥2.12.0 durante a auditoria (CVE-2026-32597)                                          |
| Código Python (`bandit`)              | ✅ Aprovado | 1 falso positivo:`"bearer"` em `auth.py:43` — tipo padrão OAuth2 (RFC 6750), não senha hardcoded                  |
| Dependências JavaScript (`npm audit`) | ✅ Aprovado | 2 falsos positivos:`postcss <8.5.10` reportado contra `next@16.2.6`, que já possui o fix internamente               |
| Dockerfiles (`hadolint`)               | ✅ Aprovado | Nenhum problema encontrado em `backend/Dockerfile` ou `frontend/Dockerfile`                                          |
| Segredos no Git (`trufflehog`)         | ✅ Aprovado | Apenas strings de exemplo/placeholder encontradas (`.env.example`, `alembic.ini`) — nenhuma credencial real exposta |

**Resultado geral: APROVADO para merge na `main`** ✅

#### Dependências com Atualização Pendente

**Backend:**

| Pacote         | Versão Atual | Versão Latest | Ação                                                   |
| -------------- | ------------- | -------------- | -------------------------------------------------------- |
| `bcrypt`     | 4.1.2         | 5.0.0          | Atualizar após entrega — major, testar compatibilidade |
| `websockets` | 15.0.1        | 16.0           | Atualizar — dependência do `supabase-py`             |
| `PyJWT`      | 2.12.0+       | 2.12.0+        | ✅ Atualizado durante auditoria                          |

**Frontend:**

| Pacote           | Versão Atual | Versão Latest | Ação                          |
| ---------------- | ------------- | -------------- | ------------------------------- |
| `zod`          | 3.25.76       | 4.4.3          | Adiar — breaking changes na v4 |
| `typescript`   | 5.7.3         | 6.0.3          | Adiar — breaking changes na v6 |
| `lucide-react` | 0.564.0       | 1.16.0         | Adiar — major version          |
| `recharts`     | 2.15.0        | 3.8.1          | Adiar — major version          |
| `sonner`       | 1.7.4         | 2.0.7          | Adiar — major version          |

> Atualizações de major version foram adiadas intencionalmente para evitar breaking changes próximo à entrega. Revisão recomendada após a apresentação final.

---

## 10. Processo de Desenvolvimento

### 10.1 Metodologia — Kanban (Fluxo Contínuo)

O Kanban foi adotado pela necessidade de flexibilidade para uma equipe de 5 desenvolvedores. Permite fluxo de trabalho constante onde as tarefas (Issues) transitam entre estados sem a necessidade de ciclos fechados (Sprints).

**Fluxo de trabalho:** `To Do (Backlog)` → `In Progress` → `Review (Code Review)` → `Done`

**Gestão:** [GitHub Projects](https://github.com/orgs/devacademicx/projects/1)

**Vantagens para o contexto:**

- Ausência de papéis formais complexos permite foco na execução técnica
- Quadro visual em tempo real para identificar gargalos
- Limitação de WIP (Work in Progress) para evitar sobrecarga de membros

### 10.2 Diretrizes de Desenvolvimento

| Diretriz                       | Descrição                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Decoupling**           | Frontend e Backend operam como entidades isoladas. Nenhuma lógica de negócio deve residir na interface            |
| **API-Driven**           | Todas as funcionalidades devem ser modeladas e expostas via endpoints antes de qualquer implementação no Frontend |
| **Conventional Commits** | Uso mandatório do padrão `feat/`, `fix/`, `docs/`, `chore/` para integridade do histórico Git            |
| **Documentation First**  | Todas as especificações técnicas são mantidas isoladas no diretório `/docs`                                  |

---

## 11. Gestão de Riscos

| Risco                                   | Impacto                                                                 | Mitigação                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Incompatibilidade de Ambiente** | Alto — sistema pode não rodar na máquina de todos os desenvolvedores | Uso de Docker para padronizar o ambiente (RNF05)                                    |
| **Atraso na integração da API** | Médio — Frontend pode ficar travado aguardando rotas do Backend       | Definição prévia do contrato de API e uso de dados estáticos (mock) para testes |
| **Baixa Qualidade dos Links**     | Médio — plataforma pode perder credibilidade com URLs quebradas       | Implementação do sistema de Reporte de Links (RF03) e moderação ativa           |
| **Perda de Dados no Banco**       | Alto — falhas em migrações SQL podem corromper tabelas               | Backups periódicos do volume de dados e controle de versão do schema via Alembic  |

---

## 12. Roadmap — Evoluções Futuras

| Evolução                         | Descrição                                                             | Objetivo Técnico                                      |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| **App Mobile Nativo**        | Aplicação Android/iOS utilizando a mesma API do Backend               | Arquitetura Cross-platform sem duplicação de lógica |
| **Gamificação de Estudos** | Sistema de conquistas e trilhas de aprendizado para iniciantes          | Aumentar engajamento e retenção de alunos            |
| **Integração com AI**      | Assistente para sugerir bibliotecas com base no perfil do desenvolvedor | Personalização da experiência de busca via LLMs     |
| **API de Terceiros**         | Exposição da base de dados para consulta por outros sistemas          | Transformar o FiveLib em um Data Provider              |

---

## 13. Como Executar

O ambiente de desenvolvimento é totalmente conteinerizado via Docker.

```bash
# Subir todo o ecossistema (Frontend, Backend e Banco de Dados)
make up

# Alternativa sem Makefile
docker-compose up --build
```

**Variáveis de ambiente necessárias (jamais commitadas):**

| Variável               | Componente | Descrição                                        |
| ----------------------- | ---------- | -------------------------------------------------- |
| `DATABASE_URL`        | Backend    | URL de conexão com o PostgreSQL do Supabase       |
| `JWT_SECRET`          | Backend    | Chave secreta para assinatura dos tokens JWT       |
| `BREVO_API_KEY`       | Backend    | Chave de API para disparo de e-mails transacionais |
| `NEXT_PUBLIC_API_URL` | Frontend   | URL pública da API (Render)                       |

---

## 14. Conclusão

O FiveLib consolida a centralização de documentações e ferramentas para orientar estudantes e programadores em um ambiente de informações fragmentadas. A plataforma entrega uma solução objetiva que otimiza a busca e serve como guia prático para o desenvolvimento técnico de seus usuários.

A elaboração desta especificação proporcionou à equipe uma visão macro e aplicada da Engenharia de Software. O mapeamento de atores, casos de uso, requisitos funcionais, não funcionais e regras de negócio estabelece a base para mitigar riscos e alinhar o escopo, garantindo que as etapas de implementação ocorram de forma organizada, assertiva e escalável.
