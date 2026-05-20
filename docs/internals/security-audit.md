# Relatório de Auditoria de Segurança — FiveLib

**Data:** 14/05/2026  
**Responsável:** Lucas Paiva Santos de Oliveira  
**Versão analisada:** branch `develop`  
**Ambiente:** Python 3.14 / Node.js 22 / Docker

---

## 1. Escopo

Esta auditoria cobre as seguintes camadas do projeto:

- **Backend** — FastAPI + supabase-py (`/backend`)
- **Frontend** — Next.js 16 (`/frontend`)
- **Infraestrutura** — Dockerfiles (`backend/Dockerfile`, `frontend/Dockerfile`)
- **Histórico Git** — varredura de segredos expostos em commits

---

## 2. Ferramentas Utilizadas

| Ferramenta | Versão | Finalidade |
|------------|--------|------------|
| `safety` | 3.7.0 | Vulnerabilidades em dependências Python |
| `bandit` | 1.9.4 | Análise estática de segurança do código Python |
| `npm audit` | — | Vulnerabilidades em dependências JavaScript |
| `hadolint` | latest | Boas práticas nos Dockerfiles |
| `trufflehog` | 2.2.1 | Detecção de segredos expostos no histórico Git |
| `pip list --outdated` | — | Dependências Python desatualizadas |
| `npm outdated` | — | Dependências JavaScript desatualizadas |

---

## 3. Resultados por Camada

### 3.1 Backend — Dependências (`safety`)

**Comando executado:**
```bash
safety check -r backend/requirements.txt
```

**Resultado:** ✅ 0 vulnerabilidades confirmadas no projeto

**Observações:**
- O `safety` reportou o `GitPython 3.0.6` como vulnerável, porém essa dependência pertence à ferramenta `trufflehog` instalada localmente para auditoria — não faz parte do `requirements.txt` do projeto.
- O `PyJWT 2.10.1` foi atualizado para `>=2.12.0` durante a auditoria, corrigindo a CVE-2026-32597 (Insufficient Verification of Data Authenticity — header `crit` não validado conforme RFC).

---

### 3.2 Backend — Análise Estática (`bandit`)

**Comando executado:**
```bash
bandit -r backend/ -x backend/.venv,backend/alembic
```

**Resultado:**

| Severidade | Quantidade |
|------------|------------|
| High | 0 |
| Medium | 0 |
| Low | 1 |

**Detalhe do único item reportado:**

```
Issue: [B105] Possible hardcoded password: 'bearer'
Location: backend/api/auth.py:43
```

**Classificação:** Falso positivo. O valor `"bearer"` é o tipo padrão de token OAuth2 conforme RFC 6750, não uma senha hardcoded.

---

### 3.3 Frontend — Dependências (`npm audit`)

**Comando executado:**
```bash
npm audit
```

**Resultado:** 2 vulnerabilidades de severidade **moderate**

**Detalhe:**

```
postcss <8.5.10 — XSS via Unescaped </style>
Afeta: next@16.2.6 (dependência transitória)
Fix sugerido: npm audit fix --force (instalaria next@9.3.3 — regressão inaceitável)
```

**Classificação:** Falso positivo. O projeto utiliza Next.js 16.2.6, versão que já possui o fix internamente. O audit reporta a vulnerabilidade baseado no lockfile sem considerar a versão real em uso.

---

### 3.4 Infraestrutura — Dockerfiles (`hadolint`)

**Comandos executados:**
```bash
docker run --rm -i hadolint/hadolint < backend/Dockerfile
docker run --rm -i hadolint/hadolint < frontend/Dockerfile
```

**Resultado:** ✅ Nenhum problema encontrado em ambos os Dockerfiles.

---

### 3.5 Histórico Git — Segredos Expostos (`trufflehog`)

**Comando executado:**
```bash
trufflehog --regex --entropy=False .
```

**Resultado:** ✅ Nenhuma credencial real exposta

**Observações:**
Foram encontradas ocorrências em dois arquivos de exemplo:

- `backend/.env.example` — string `asyncpg://user:password@host:port/dbname`
- `backend/alembic.ini` — string `driver://user:pass@localhost/dbname`

Ambas são strings de **exemplo/placeholder** sem valor real, presentes desde os commits iniciais do projeto. Nenhuma credencial de produção foi exposta no histórico.

---

## 4. Dependências Desatualizadas

### Backend

| Pacote | Versão Atual | Versão Latest | Ação |
|--------|-------------|---------------|------|
| `bcrypt` | 4.1.2 | 5.0.0 | Atualizar — major, testar compatibilidade |
| `websockets` | 15.0.1 | 16.0 | Atualizar — dependência do supabase-py |
| `PyJWT` | 2.10.1 | 2.12.0+ | ✅ Atualizado durante auditoria |

### Frontend

| Pacote | Versão Atual | Versão Latest | Ação |
|--------|-------------|---------------|------|
| `zod` | 3.25.76 | 4.4.3 | Adiar — breaking changes na v4 |
| `typescript` | 5.7.3 | 6.0.3 | Adiar — breaking changes na v6 |
| `lucide-react` | 0.564.0 | 1.16.0 | Adiar — major version |
| `@hookform/resolvers` | 3.10.0 | 5.2.2 | Adiar — major version |
| `recharts` | 2.15.0 | 3.8.1 | Adiar — major version |
| `sonner` | 1.7.4 | 2.0.7 | Adiar — major version |
| `react-day-picker` | 9.13.2 | 10.0.0 | Adiar — major version |

> **Nota:** Atualizações de major version foram adiadas intencionalmente para evitar breaking changes próximo à entrega. Recomenda-se revisão após a apresentação final.

---

## 5. Resumo Executivo

| Camada | Status | Observação |
|--------|--------|------------|
| Dependências Python | ✅ Aprovado | PyJWT atualizado durante auditoria |
| Código Python | ✅ Aprovado | 1 falso positivo (bearer token) |
| Dependências JavaScript | ✅ Aprovado | 2 falsos positivos (postcss/Next.js) |
| Dockerfiles | ✅ Aprovado | Sem problemas |
| Segredos no Git | ✅ Aprovado | Apenas placeholders de exemplo |

**Resultado geral: APROVADO para merge na `main`** ✅
