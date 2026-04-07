## Fluxo de Branches

O projeto segue um modelo baseado em **branch por feature**, não por pessoa.

### Estrutura principal

```bash
main        # versão estável (produção)
develop     # integração das funcionalidades
```

---

### Padrão de branches

Cada tarefa deve ser desenvolvida em uma branch própria:

```bash
feat/nome-da-feature
fix/nome-do-bug
chore/ajuste
```

Exemplos:

```bash
feat/auth-login
feat/favorites
feat/resource-list
fix/login-error
```

---

### Regras

* Cada branch representa **uma funcionalidade**, não um desenvolvedor
* Não criar branches fixas por pessoa
* Sempre criar branches a partir da `develop`
* Não realizar commits diretamente na `main`
* Evitar commits diretos na `develop` (usar Pull Request)

---

### Fluxo de trabalho

1. Criar branch a partir da `develop`
2. Desenvolver a funcionalidade
3. Abrir Pull Request para `develop`
4. Revisão por pelo menos 1 integrante
5. Merge na `develop`

---

### Observação

Um desenvolvedor pode trabalhar em várias branches ao mesmo tempo, pois cada branch representa uma entrega específica do sistema.
