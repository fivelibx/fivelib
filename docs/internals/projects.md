# 📑 Guia de Gestão: GitHub Projects e Colaboração (FiveLib)

Este documento explica como vamos organizar e acompanhar nosso trabalho usando a aba **Projects** e como operamos o quadro  **FiveLib** . Ele é o nosso mapa para garantir que o projeto saia do papel com organização e transparência.

## 1. Visão Geral do Quadro

Acessando a aba  **Projects** , você encontrará diferentes visualizações na parte superior para facilitar seu foco:

* **My items:** Mostra apenas as tarefas (Issues) atribuídas a  **você** . Foque aqui para saber suas obrigações imediatas.
* **Team:** Mostra o panorama geral do projeto, agrupado pelas frentes de trabalho ( **Backend** ,  **Frontend** , **Integração / Fullstack** e  **Geral** ).

---

## 2. O Ciclo de Vida da Tarefa (Status)

O campo de **Status** deve refletir exatamente o que está acontecendo no momento. Você deve atualizá-lo manualmente:

1. **Not Started:** A tarefa foi criada, mas ninguém começou a mexer nela ainda.
2. **In Progress:** Você iniciou o desenvolvimento (criou sua branch `feat/` e está codificando).
3. **Review:** Você terminou a implementação e  **abriu o Pull Request (PR)** . A tarefa fica aqui enquanto os colegas revisam seu código.
4. **Done ✅:** A tarefa foi finalizada. **Atenção:** Só mova para Done após o PR ter sido aprovado e o código integrado (merged) na branch principal.

---

## 3. Como Trabalhar Dentro da Issue

Ao abrir uma Issue, você verá uma estrutura com  **Resumo** , **Objetivo** e  **Referências** .

* **Checklists:** Na seção Objetivo, existem caixas de seleção. Elas são seus critérios de aceite. Conforme finalizar cada item no código, marque a caixinha no GitHub. Isso gera automaticamente a barra de progresso visual no Project.
* **Sub-issues:** Se encontrar um impedimento ou dúvida complexa, não trave. Clique no botão **"Create sub-issue"** logo abaixo da descrição. Isso mantém a dúvida vinculada à tarefa principal, facilitando o suporte dos colegas.

---

## 4. Dicionário de Tags (Labels)

Utilize as tags abaixo para identificarmos o tipo de cada demanda num relance:

| Tag                  | Descrição                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `bug`              | Algo que deveria funcionar, mas está quebrando ou dando erro.          |
| `documentation`    | Criação ou alteração de documentos (PRD, Dicionário, Workflow).    |
| `duplicate`        | Quando já existe uma issue idêntica aberta.                           |
| `enhancement`      | Nova funcionalidade ou melhoria em algo que já existe.                 |
| `good first issue` | Tarefa simples, ideal para organização, estruturação ou onboarding. |
| `help wanted`      | A tarefa está travada ou ninguém a assumiu e precisa de ajuda.        |
| `question`         | Dúvidas técnicas ou assuntos que precisam de alinhamento do time.     |

Export to Sheets

---

## 5. Colaboração entre Frentes (Cross-Team)

Embora tenhamos divisões técnicas, somos um time único focado na entrega:

* **Suporte Livre:** Se você é de Backend mas sabe resolver um problema de CSS do colega de Frontend, **ajude!** Não há impedimento de prestar suporte entre as áreas.
* **Registro de Participação:** Se ajudar em uma issue que não era sua, adicione-se como **Assignee** (Responsável) ou comente na issue. Isso deixa visível sua participação para fins de registro e mérito.
* **Atenção às Branches:** Mesmo ajudando em outra área, certifique-se de estar na branch correta daquela funcionalidade para evitar misturar códigos de tarefas distintas.

---

> **💡 Dica para iniciantes:** O GitHub Projects funciona como um GPS. Se você esquece de atualizar o status ou marcar o checklist, o resto do time fica "cego" sobre o progresso do projeto. Mantenha seu quadro em dia!
