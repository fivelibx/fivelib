
# Guia de Contribuição do FiveLib

Este projeto é mantido com foco em arquitetura limpa, desacoplamento e documentação rigorosa. Ao contribuir, você aceita seguir estas diretrizes técnicas e de versionamento.

---

## Padrões de Versionamento (Git)

Para manter o histórico do repositório limpo, rastreável e profissional, seguimos rigorosamente os seguintes padrões:

### 1. Conventional Commits

Todos os commits devem seguir a estrutura `<tipo>: <descrição>`, sendo terminantemente proibido o uso de mensagens genéricas.

* **`feat/`** : Implementação de novas funcionalidades.
* **`fix/`** : Correção de bugs ou falhas de segurança.
* **`docs/`** : Alterações exclusivas em documentação (README, Wiki ou arquivos em `/docs`).
* **`chore/`** : Manutenção de infraestrutura, arquivos de configuração, licenças e automação.

### 2. Estratégia de Branching

* As branches devem ser criadas a partir da branch principal (`main`).
* **Nomenclatura** : Use o formato `tipo/descrição-curta-em-ingles`.
* *Exemplo* : `feat/add-auth-middleware` ou `chore/update-license`.

### 3. Pull Requests (PRs)

* Todo PR deve conter uma descrição sucinta do que foi alterado e por quê.
* PRs que não respeitarem o padrão de commits ou a estrutura de pastas do projeto serão bloqueados para revisão.
* Certifique-se de que a documentação técnica foi atualizada no diretório `/docs` antes de solicitar a mesclagem.

---

## Fluxo de Trabalho e Revisão

1. **Arquitetura:** A abordagem **API-first** é mandatória. Alterações que quebrem o contrato da API ou promovam acoplamento entre Frontend e Backend serão rejeitadas.
2. **Qualidade do Código:** Siga as convenções da linguagem (PEP 8 para Python) e garanta que o código esteja legível e consistente com o Dicionário de Dados do projeto.
3. **Ambiente:** O desenvolvimento deve ser validado via Docker para garantir que as alterações funcionem em containers.

---

## Relatório de Issues

Ao encontrar uma falha técnica, reporte-a seguindo este protocolo:

* **Passos para reproduzir:** Descrição clara do caminho que levou ao erro.
* **Logs:** Anexe logs do Docker, da API ou do Banco de Dados.
* **Impacto:** Qual funcionalidade ou camada do sistema foi afetada.

---

## Equipe e Contribuidores

A tabela abaixo define os papéis técnicos e as áreas de responsabilidade no desenvolvimento do DevAcademicX.

| Nome                                 | Cargo / Título                       | Foco de Contribuição                                         |
| ------------------------------------ | ------------------------------------- | -------------------------------------------------------------- |
| **Lucas Paiva S. de Oliveira** | Lead Full Stack Developer & Architect | Arquitetura, Backend, Frontend, Infraestrutura, Documentação |
| **Felipe Gonçalves**          | Frontend Developer                    | Frontend                                                       |

---

***Nota**: Se você deseja contribuir e ver seu nome nesta lista, siga rigorosamente as diretrizes definidas neste guia.*
