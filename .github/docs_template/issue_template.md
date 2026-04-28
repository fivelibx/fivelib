### Issue 00 - Template

## 📝 Resumo

[Descreva o que precisa ser feito em uma frase]

## 🎯 Objetivo

- [ ] Item de entrega 1
- [ ] Item de entrega 2

## 🔗 Referências

- Documento: [Link ou nome do arquivo, ex: PRD.md]
- Diagrama: [Link ou nome, ex: erd-diagram.png]

---

### **Issue 00 (Retroativa): Documento de Engenharia e Casos de Uso**

**Tags:** `documentation`

## 📝 Resumo

Consolidar a base teórica e funcional do projeto no repositório.

## 🎯 Objetivo

* [X] Subir `PRD.pdf` oficial para a pasta `/docs`.
* [X] (Sub-issue) Finalizar e anexar `use-case-diagram.png`.
* [X] Validar requisitos e atores com a equipe.

## 🔗 Referências

* Documento: `PRD.pdf`
* Diagrama: `use-case-diagram.png`

---

### **Issue 00.1: Mapeamento de Experiência do Usuário (User Flow)**

**Tags:** `documentation`, `ux`

## 📝 Resumo

Desenvolver o mapa lógico que descreve o caminho do usuário desde o acesso até o objetivo final.

## 🎯 Objetivo

* [ ] Criar `user-flow-map.png` detalhando o fluxo de busca de ferramentas.
* [ ] Mapear o fluxo de erro (Login inválido, link quebrado).
* [ ] Validar se o fluxo condiz com os Requisitos Funcionais (RF).

## 🔗 Referências

* Documento: `PRD.pdf`
* Diagrama: `use-case-diagram.png`

---

### **Issue 01: Modelagem de Dados e Dicionário**

**Tags:** `documentation`

## 📝 Resumo

Finalizar a estrutura lógica do banco de dados e sua documentação técnica.

## 🎯 Objetivo

* [ ] Concluir `erd-diagram.png` (Pé de galinha).
* [ ] Criar `data-dictionary.md` seguindo o padrão `tabela_coluna_idx`.
* [ ] Definir tipos de dados (PostgreSQL/SQLite).

## 🔗 Referências

* Documento: `PRD.pdf` (Seção 5 e 7)
* Diagrama: `erd-diagram.png`

---

### **Issue 01.1: Documentação Técnica de Arquitetura (High-Level & Class)**

**Tags:** `documentation`, `architecture`

## 📝 Resumo

Visualizar a comunicação entre os serviços e a estrutura interna das classes.

## 🎯 Objetivo

* [ ] Criar `high-level-architecture.png` (Comunicação React <-> FastAPI <-> Postgres).
* [ ] (Opcional) Desenvolver `class-diagram.png` para a lógica de Domínio no Backend.
* [ ] Explicar a escolha da Stack (Vite, FastAPI, Docker).

## 🔗 Referências

* Documento: `data-dictionary.md`
* Issue Dependente: `Issue 07.1` (Setup Backend)

---

### **Issue 02: Identidade Visual e Prototipação (DESIGN.md)**

**Tags:** `documentation`, `enhancement`

## 📝 Resumo

Definir a guia de estilo e o esqueleto visual das telas principais.

## 🎯 Objetivo

* [ ] Definir paleta de cores e tipografia no `DESIGN.md`.
* [ ] Criar wireframes/mockups para Home, Login e Perfil.
* [ ] Listar componentes principais da interface.

## 🔗 Referências

* Documento: `PRD.pdf` (Seção 8 - Fluxos)

---

### Issue 02.1 — Criação do Pitch Deck para Apresentação do Projeto

## 📝 Resumo

Desenvolver a apresentação comercial e técnica da plataforma FiveLib em formato de slides para a banca examinadora nesta sexta-feira.

## 🎯 Objetivo

- [ ] **Roteiro (Storytelling):** Definir a narrativa da apresentação (Problema, Solução, Diferenciais e Futuro).
- [ ] **Identidade Visual:** Aplicar as cores (#0CC0DF, #B4B4B4, #FFD21D) e tipografia conforme definido no DESIGN.md.
- [ ] **Demonstração do Protótipo:** Incluir os wireframes das telas principais (T1, T2, T6) e explicar o fluxo de navegação.
- [ ] **Arquitetura de Dados:** Preparar um slide específico para mostrar como o DER sustenta as funcionalidades da interface.
- [ ] **Revisão Geral:** Validar o tempo de fala e a clareza das informações para a apresentação de sexta.

## 🔗 Referências

- Documento: `PRD.md` (Visão geral e Regras de Negócio)
- Design: `DESIGN.md` (Guia de Estilos e Mockups)
- Diagrama: `fivelib_screens_map.html` (Mapeamento de telas e fluxos)
- Prazo: Apresentação na sexta-feira (17/04)

---

### **Issue 02.2 — Refinamento do Pitch Deck e Pivotagem de Modelo de Negócio**

**Tags:** `documentation`, `management`

## 📝 Resumo

Reformular a apresentação do FiveLib para a banca do dia 24/04/2026, focando na estratégia de mercado como agregador e simplificando a exposição técnica.

## 🎯 Objetivo

* **Pivotagem de Modelo de Negócio:**
  * Estruturar o modelo de "Via Única Comercial": O produto é gratuito para o ecossistema (usuários e bibliotecas) e monetizado através de **cotas de patrocínio e anúncios segmentados** (Ex: Instituições de ensino, Cloud Providers, e empresas de recrutamento).
* **Valuation (Estimativa de Valor):** * Incluir no slide financeiro uma estimativa de valor para o MVP e desenvolvimento inicial.
  * *Sugestão técnica:* Estipular o custo de desenvolvimento inicial em **R$ 25.000,00** (considerando 3 meses de squad de 5 devs júnior + infraestrutura) e um valor de mercado (Equity) baseado no potencial de captação de leads qualificados na área de TI.
* **Elementos de Pitch de Negócio:**
  * **TAM / SAM / SOM:** Definir o tamanho do mercado de estudantes de tecnologia no Brasil.
  * **Go-to-Market:** Como o site chegará às faculdades? (Parcerias com centros acadêmicos e repositórios de ADS).
* **Simplificação da Arquitetura:**
  * Substituir diagramas complexos de back/front por um slide de  **"Stack de Alta Disponibilidade"** .
  * Enfatizar: Escalabilidade (Docker), Performance (FastAPI) e Integridade de Dados (PostgreSQL).
* **Correção de Visual e Texto:**
  * Atualizar todos os slides no Canva com a nova narrativa de "Agregador de Valor".

## 🔗 Referências

* **Documento**: `PRD.md` (Seção de Monetização/Modelo)
* **Plataforma de Design:** Canva (Link do time)
* **Prazo Final:** Apresentação na sexta-feira (24/04/2026)

---

### **Issue 03: Contrato da API e Rotas**

**Tags:** `documentation`, `question`

## 📝 Resumo

Especificar os endpoints do backend para garantir a integração Frontend/Backend.

## 🎯 Objetivo

* [ ] Criar `api.md` com métodos HTTP (GET, POST, etc).
* [ ] Definir payloads de requisição e modelos de resposta (JSON).
* [ ] Validar regras de negócio por endpoint.

## 🔗 Referências

* Documento: `PRD.pdf` (RF01 a RF05)

---

### **Issue 04: Ambiente de Desenvolvimento (Docker)**

**Tags:** `good first issue`

## 📝 Resumo

Padronizar o ambiente de execução para todos os membros da equipe.

## 🎯 Objetivo

* [ ] Criar `Dockerfile` para o ambiente Python/FastAPI.
* [ ] Configurar `docker-compose.yml` (App + Banco de Dados).
* [ ] Testar persistência de dados via volumes.

## 🔗 Referências

* Documento: `README.md` (Draft)
* Requisito: `RNF05` (PRD)

---

### **Issue 04.1: Diagramação de Infraestrutura e Redes**

**Tags:** `infrastructure`, `documentation`

## 📝 Resumo

Documentar visualmente como os containers Docker se comunicam e como o sistema será orquestrado.

## 🎯 Objetivo

* [ ] Criar `infrastructure-diagram.png` (Redes do Docker e Volumes).
* [ ] Definir o desenho do `deployment-pipeline.png` (GitHub Actions -> Render/Vercel).

## 🔗 Referências

* Documento: `docker-compose.yml`
* Issue Dependente: `Issue 04`

---

### **Issue 05: Governança do Repositório**

**Tags:** `good first issue`

## 📝 Resumo

Configurar as regras de contribuição e fluxo de branches no GitHub.

## 🎯 Objetivo

* [ ] Definir permissões de escrita para os 5 membros.
* [ ] Configurar Branch Protection na `main` (exigir PR).
* [ ] Estruturar pastas iniciais (`/docs`, `/backend`, `/frontend`, `/infra`).

## 🔗 Referências

* Documento: `README.md`

---

### **Issue 06: Adoção da Base Next.js e Configuração de Ambiente**

**Tags:** `frontend`, `setup`, `nextjs`

## 📝 Resumo

Consolidar a estrutura gerada pelo v0.dev, limpar dependências não utilizadas e configurar a comunicação com o Backend via variáveis de ambiente.

## 🎯 Objetivo

* [ ] Mudar o prefixo da variável de API no frontend (Criar `.env.local` com `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`).
* [ ] Adicionar a prop `suppressHydrationWarning` na tag `<html>` no `app/layout.tsx` para evitar erros de extensão de navegador.
* [ ] Criar a pasta `frontend/services/` para isolar as chamadas `fetch()` para a API.

## 🔗 Referências

* Documento: `PROVISIONING.md`
* Diagrama: `infrastructure-diagram.png`

---

### **Issue 06.1: Integração do Módulo de Busca (Consumo da API)**

**Tags:** `frontend`, `integration`, `high-priority`

## 📝 Resumo

Substituir os dados estáticos (`mockLibraries`) da página de busca por dados reais consumidos do endpoint `/resources` do FastAPI.

## 🎯 Objetivo

* [ ] Criar a função `getResources()` no diretório `services/api.ts` utilizando `fetch` nativo.
* [ ] No arquivo `app/busca/page.tsx`, remover o array `mockLibraries`.
* [ ] Implementar um `useEffect` (ou transformar a página em Server Component) para carregar os dados reais na variável de estado que alimenta a listagem.
* [ ] Garantir que o componente `Card` (`frontend/components/ui/card.tsx`) renderize as informações vindas do Supabase.

## 🔗 Referências

* Documento: `api.md` (Contrato da API)
* Arquivo Alvo: `frontend/app/busca/page.tsx`

---

### **Issue 07: Integração de Autenticação e Gestão de Sessão (Frontend)**

**Tags:** `frontend`, `security`, `auth`

## 📝 Resumo

Conectar o formulário estático de Login/Cadastro (gerado pelo v0) ao endpoint de autenticação do FastAPI e gerenciar o Token JWT no Next.js.

## 🎯 Objetivo

* [ ] Criar função de submissão no formulário de `app/login/page.tsx` apontando para `POST /auth/login`.
* [ ] Armazenar o token JWT retornado pela API de forma segura (Cookies ou LocalStorage).
* [ ] Configurar os botões do cabeçalho (`Header`) para mudarem de "Login" para "Meu Perfil" caso o usuário esteja autenticado.
* [ ] Redirecionar para o `/dashboard` em caso de sucesso.

## 🔗 Referências

* Documento: `api.md` (RF05, RN01)

---

### **Issue 07.1: Setup da Arquitetura Backend (DDD / Layered)**

**Tags:** `backend`, `setup`, `architecture`

## 📝 Resumo

Implementar a estrutura de pastas e o esqueleto inicial do projeto seguindo os padrões de Arquitetura em Camadas (Domain-Driven Design simplificado).

## 🎯 Objetivo

* [ ] Estruturar o diretório `/backend/app` com as seguintes camadas:
  * `/domain`: Modelos de negócio e entidades puras.
  * `/services`: Lógica de negócio e casos de uso.
  * `/infrastructure`: Configurações de banco (PostgreSQL) e repositórios.
  * `/api`: Rotas (Controllers), Schemas (Pydantic) e Dependências.
* [ ] Configurar o arquivo `main.py` para inicializar o FastAPI carregando as rotas da camada de API.
* [ ] Criar arquivo `.env.example` com as variáveis de ambiente necessárias.
* [ ] Configurar o gerenciador de dependências (`requirements.txt` ou `pyproject.toml`).

## 🔗 Referências

* Documento: `PRD.pdf` (Seção de Arquitetura)
* Padrão Técnico: Camadas (Model-Controller + Domain/Infra)
* Issue Dependente: `Issue 04` (Docker)

---

### **Issue 08: Implementação do ORM e Conexão com Banco de Dados**

**Tags:** `backend`, `database`

## 📝 Resumo

Configurar o SQLAlchemy, conectar o FastAPI ao PostgreSQL e criar as tabelas baseadas no DER.

## 🎯 Objetivo

* [ ] Configurar a string de conexão do PostgreSQL via `.env`.
* [ ] Criar os modelos (Models) usando SQLAlchemy/SQLModel.
* [ ] Gerar as tabelas no banco de dados.
* [ ] Implementar as operações básicas de persistência (CRUD).

## 🔗 Referências

* Documento: `data-dictionary.md`
* Issue Dependente: `Issue 01` e `Issue 04`

---

### **Issue 08.1: Gestão de Migrações (Alembic) e Carga Inicial (Seeding)**

**Tags:** `backend`, `database`, `setup`

## 📝 Resumo

Configurar o versionamento do banco de dados com Alembic e popular a tabela de ferramentas com dados reais para permitir os testes de integração.

## 🎯 Objetivo

* [ ] Configurar o `alembic.ini` e o `env.py` para lerem a `DATABASE_URL` do `.env`.
* [ ] Gerar a primeira migração (Revision) baseada nos modelos do SQLAlchemy (`alembic revision --autogenerate`).
* [ ] Aplicar a migração no Supabase (`alembic upgrade head`).
* [ ] Criar um script de "Seed" (ex: `seed.py` ou via DBeaver/SQL) para inserir as ferramentas iniciais (React, Docker, FastAPI, etc.) direto no banco, substituindo a necessidade do mock no frontend.

## 🔗 Referências

* Documento: `data-dictionary.md`
* Issue Dependente: `Issue 08`

---

### **Issue 09: [EPIC] Desenvolvimento dos Endpoints da API (Backend)**

**Tags:** `backend`, `epic`

## 📝 Resumo

Issue de gestão para o desenvolvimento da camada de API (Controllers/Services) no FastAPI. Todas as tarefas de implementação de rotas devem ser vinculadas a esta Epic.

## 🎯 Objetivo

* [ ] Implementar autenticação (Login/Registro).
* [ ] Implementar listagem e busca de bibliotecas.
* [ ] Implementar persistência de favoritos.
* [ ] Validar todos os payloads de entrada.

---

### **Issue 09.1: Implementação do Endpoint GET /resources**

**Tags:** `backend`, `api`, `task`

## 📝 Resumo

Criar a rota de listagem de ferramentas no FastAPI para alimentar a página de busca do Frontend.

## 🎯 Objetivo

* [ ] Implementar a rota `GET /api/v1/resources` em `backend/api/routes/resources.py`.
* [ ] Criar o schema Pydantic de resposta (`ResourceResponse`) com `id`, `name`, `description`, `language`, `category`, `stars` e `tags`.
* [ ] Realizar a consulta via SQLAlchemy na tabela `Tool`.
* [ ] Testar via Swagger (`/docs`).

## 🔗 Referências

* Documento: `api.md`
* Issue Dependente: `Issue 08` (Banco de Dados populado)

---

### **Issue 09.2: Implementação da Autenticação (Auth)**

**Tags:** `backend`, `api`, `task`

## 📝 Resumo

Criar os endpoints de registro e login, implementando a lógica de geração de tokens JWT.

## 🎯 Objetivo

* [ ] Criar `POST /auth/register` (com validação de maioridade - RN01).
* [ ] Criar `POST /auth/login` (retorno de token Bearer).
* [ ] Configurar injeção de dependência para verificar o token nas rotas protegidas.

## 🔗 Referências

* Documento: `api.md` (Seção 1)
* Issue Dependente: `Issue 08`

---

### **Issue 12: Deploy e Hospedagem (Produção)**

**Tags:** `infra`, `deploy`

## 📝 Resumo

Subir a aplicação para o ambiente em nuvem e liberar o acesso público (Zero Cost).

## 🎯 Objetivo

* [ ] Configurar e fazer o deploy do Banco de Dados.
* [ ] Fazer deploy do Backend (FastAPI) no Render ou Railway.
* [ ] Fazer deploy do Frontend (React) na Vercel.
* [ ] Testar integração das URLs em produção (CORS).

## 🔗 Referências

* Documento: Planejamento de Infraestrutura

---

### **Issue 13: QA, Testes Finais e Refinamento**

**Tags:** `bug`, `qa`

## 📝 Resumo

Revisão final do fluxo do usuário para garantir que não haja erros durante a apresentação.

## 🎯 Objetivo

* [ ] Testar fluxo completo: Cadastro -> Login -> Busca -> Favoritar.
* [ ] Corrigir quebras de layout (responsividade).
* [ ] Limpar logs do console e otimizar tempo de carregamento.

## 🔗 Referências

* Documento: `PRD.md` (Validação de Requisitos Funcionais)

---


### **Issue 13.1: Implementação de Testes Automatizados (Backend)**

**Tags:** `backend`, `testing`, `quality-assurance`

## 📝 Resumo

Garantir a confiabilidade da API através de testes automatizados que validem as regras de negócio e a integridade dos endpoints.

## 🎯 Objetivo

* [ ] Configurar o framework `pytest` e `httpx` no ambiente backend.
* [ ] Criar testes unitários para validar a lógica de negócio principal (Ex: Validação de maioridade na regra RN01).
* [ ] Criar testes de integração para os endpoints da API (verificar se `GET /resources` retorna status 200 e a estrutura correta de JSON).
* [ ] Configurar um job simples no GitHub Actions para rodar esses testes automaticamente a cada `push` na branch `develop`.

## 🔗 Referências

* Documento: `api.md` (Contrato da API)
* Issue Dependente: `Issue 07.1` (Setup Backend) e `Issue 09` (Endpoints)

---

### **Issue 14: Compilação do Dossier Final**

**Tags:** `documentation`, `management`

## 📝 Resumo

Consolidar toda a documentação, diagramas e códigos em um único conjunto de entrega oficial para a banca examinadora, garantindo um repositório limpo e profissional.

## 🎯 Objetivo

* [ ] **Unificação de Documentos:** Gerar o `dossier-final.pdf` (ou organizar a pasta `/docs` de forma que o sumário no `README.md` guie a banca).
* [ ] **Limpeza de Repositório:** Remover arquivos temporários, logs, comentários desnecessários no código e garantir que não haja linguagem sentimental (corações, mensagens informais) em rodapés ou commits.
* [ ] **Revisão de Links:** Verificar se todos os links internos no `README.md` (diagramas, documentos, link do deploy online) estão funcionando.
* [ ] **Finalização do README:** Garantir que o `README.md` principal conte a história do projeto e contenha o guia "Como Rodar" (Docker/Compose).

## 🔗 Referências

* Documento: Todos os arquivos da pasta `/docs`.
* Prazo Final: Data da entrega final do projeto.

---

### **Issue 15 (Opcional): Painel Administrativo de Recursos**

**Tags:** `frontend`, `backend`, `admin`

## 📝 Resumo

Criar uma interface administrativa protegida para gestão de bibliotecas (CRUD completo) sem depender do banco de dados direto.

## 🎯 Objetivo

* [ ] Criar a rota protegida `POST/PUT/DELETE /api/v1/admin/resources` no FastAPI (validar `role=admin` no token).
* [ ] Criar a página `/admin` no Next.js com formulário de cadastro/edição de ferramentas.
* [ ] Garantir que apenas usuários autenticados com cargo "admin" acessem essa rota.

## 🔗 Referências

* Issue Dependente: `Issue 09` e `Issue 07`


Aqui estão as duas novas issues para completar o seu planejamento. Elas garantem tanto a proteção legal do seu projeto quanto a integridade técnica da documentação, especialmente importante após a refatoração para Next.js.

---

### **Issue 16: Licenciamento do Projeto (Legal)**

**Tags:** `legal`, `documentation`

## 📝 Resumo

Definir e implementar a licença de uso do código-fonte para proteger a propriedade intelectual e orientar colaboradores.

## 🎯 Objetivo

* [ ] Escolher uma licença adequada para o projeto (Ex: MIT para permissividade total ou GPL para copyleft).
* [ ] Criar o arquivo `LICENSE` na raiz do repositório.
* [ ] Incluir um aviso de copyright no cabeçalho dos arquivos principais (opcional, mas recomendado).
* [ ] Atualizar o `README.md` com um selo de licença visível.

## 🔗 Referências

* Documento: `README.md`

---

### **Issue 17: Atualização Técnica da Arquitetura do Frontend**

**Tags:** `documentation`, `frontend`, `refactoring`

## 📝 Resumo

Atualizar a documentação do projeto para refletir a mudança de arquitetura do Frontend para Next.js, garantindo que o desenho técnico condiga com o código atual.

## 🎯 Objetivo

* [ ] Atualizar o diagrama `high-level-architecture.png` para refletir o SSR/SSG do Next.js.
* [ ] Revisar o `PROVISIONING.md` e o `README.md` para remover referências à estrutura antiga.
* [ ] Adicionar uma breve nota técnica no `README` explicando o porquê da escolha do Next.js (Performance e SEO).
* [ ] Garantir que o fluxograma de telas esteja alinhado com a estrutura de rotas do App Router do Next.js.

## 🔗 Referências

* Documento: `Issue 06` (Adoção da Base Next.js)
* Diagrama: `high-level-architecture.png`
