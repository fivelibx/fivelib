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
