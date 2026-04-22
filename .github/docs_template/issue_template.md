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

### **Issue 06: Setup da Arquitetura Frontend (React + Tailwind)**

**Tags:** `frontend`, `setup`, `enhancement`

## 📝 Resumo

Inicializar o projeto Frontend com React e configurar o Tailwind CSS para estilização padronizada.

## 🎯 Objetivo

* [ ] Criar o diretório base `/frontend` no repositório (depende da Issue 05).
* [ ] Inicializar o projeto React (Vite/CRA).
* [ ] Instalar e configurar o Tailwind CSS e suas diretivas.
* [ ] Definir a estrutura inicial de pastas (ex: `/components`, `/pages`, `/assets`).

## 🔗 Referências

* Documento: `DESIGN.md` (Para variáveis de cores no `tailwind.config.js`)

---

### **Issue 07: Desenvolvimento da Interface de Autenticação (Estático)**

**Tags:** `frontend`, `ui`

## 📝 Resumo

Desenvolver a estrutura visual e os componentes estáticos para as telas de Login e Registro.

## 🎯 Objetivo

* [ ] Criar componente base de formulário de Login.
* [ ] Criar componente base de formulário de Registro (Sign Up).
* [ ] Aplicar estilização responsiva utilizando Tailwind CSS.
* [ ] Garantir fidelidade visual com os mockups aprovados.

## 🔗 Referências

* Design: Wireframes de T2 (Login) e Registro (Mapeamento de telas)
* Issue Dependente: `Issue 06` (Setup do Tailwind)

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

### **Issue 09: Desenvolvimento dos Endpoints (CRUD da API)**

**Tags:** `backend`, `api`, `feature`

## 📝 Resumo

Implementar a lógica de negócio (Controllers/Services) e liberar as rotas no FastAPI.

## 🎯 Objetivo

* [ ] Criar rotas de Autenticação (Login/Registro).
* [ ] Criar rotas de listagem e busca de bibliotecas.
* [ ] Criar rotas para salvar e gerenciar links favoritos (RN03 - Privacidade).
* [ ] Validar payload de entrada usando Pydantic.

## 🔗 Referências

* Documento: `api.md` (Contrato da API)
* Issue Dependente: `Issue 03` e `Issue 08`

---

### **Issue 10: Desenvolvimento da Interface Principal (Home/Dashboard)**

**Tags:** `frontend`, `ui`

## 📝 Resumo

Construir a interface principal onde o usuário fará a busca e visualizará as bibliotecas cadastradas.

## 🎯 Objetivo

* [ ] Criar o layout da Home (Sidebar, Barra de Busca, Grid de Cards).
* [ ] Criar o componente de Card para exibir cada ferramenta/biblioteca.
* [ ] Adicionar estados estáticos para simular o filtro de busca.

## 🔗 Referências

* Design: Wireframes T1 (Home) e T6 (Busca)
* Issue Dependente: `Issue 06`

---

### **Issue 11: Integração Frontend x API (Consumo de Dados)**

**Tags:** `frontend`, `integration`

## 📝 Resumo

Conectar o React ao backend FastAPI usando Axios para dar vida às telas.

## 🎯 Objetivo

* [ ] Integrar fluxo de Login/Registro para receber o Token JWT.
* [ ] Salvar o estado de autenticação (Context API ou Zustand/LocalStorage).
* [ ] Fazer o fetch das bibliotecas na Home com base no banco de dados.
* [ ] Integrar a função de "Favoritar" ferramenta.

## 🔗 Referências

* Issue Dependente: `Issue 07`, `Issue 09` e `Issue 10`

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

### **Issue 14: Compilação do Dossier Final**

**Tags:** `documentation`, `management`

## 📝 Resumo

Consolidar toda a documentação, diagramas e códigos em um único documento oficial para a banca.

## 🎯 Objetivo

* [ ] Gerar o `dossier-final.pdf` unindo PRD, Arquitetura e Resultados.
* [ ] Revisar todos os links no `README.md` principal.
* [ ] Garantir que o repositório esteja limpo e organizado para auditoria.

## 🔗 Referências

* Documento: Todos os arquivos da pasta `/docs`.
* Prazo Final: Data da entrega final do projeto.
