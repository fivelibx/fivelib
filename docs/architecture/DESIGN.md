
# 🎨 Guia de Identidade Visual e Prototipação - FiveLib

Este documento define o esqueleto visual, a tipografia, as cores e os componentes principais da plataforma FiveLib. Ele serve como base para a implementação do Frontend, respeitando os requisitos definidos no PRD e no Dicionário de Dados.

## 1. Mapeamento e Fluxo

O mapeamento completo das interfaces e a lógica de interação foram estruturados para garantir uma experiência de usuário fluida, conforme detalhado no arquivo `fivelib_screens_map.html`.

* **Mapeamento de Interfaces:** O sistema é composto por 8 telas principais, identificadas de **T1 (Home)** a  **T8 (Admin)** . Essa estrutura abrange todo o escopo do projeto, incluindo os mecanismos de busca, o gerenciamento de bibliotecas personalizadas e os canais de suporte técnico.
* **Dinâmica de Navegação:** O fluxo foi projetado para guiar o usuário de maneira intuitiva. O percurso inicia-se na **Home** para visualização geral, avança para a **Busca** refinada e, mediante autenticação no  **Login/Cadastro** , permite a persistência de dados e gestão de favoritos dentro do **Perfil** do usuário.

## 2. Identidade Visual (Design Tokens)

A identidade visual do FiveLibX foi modernizada, utilizando o ecossistema Next.js com Tailwind CSS e shadcn/ui.

### 2.1 Paleta de Cores (Tailwind CSS)

As cores abaixo refletem o tema base configurado no `globals.css` da aplicação:

| Token                       | Dark Mode (Padrão)           | Light Mode                    | Aplicação                                                  |
| --------------------------- | ----------------------------- | ----------------------------- | ------------------------------------------------------------ |
| **Background**        | `#21211f`                   | `#21211f`                   | Fundo principal da aplicação.                              |
| **Foreground**        | `#d9d9d9`                   | `#d9d9d9`                   | Texto principal.                                             |
| **Primary / Accent**  | `#c1e328`                   | `#c1e328`                   | Botões principais, links ativos, destaques da marca.        |
| **Card / Popover**    | `#2a2a28`                   | `#2a2a28`                   | Fundo de componentes elevados (cards, modais, dropdowns).    |
| **Secondary / Muted** | `#3a3a38`                   | `#3a3a38`                   | Fundos secundários, bordas de inputs, e elementos inativos. |
| **Muted Foreground**  | `#8a8a88`                   | `#8a8a88`                   | Textos secundários ou de menor importância.                |
| **Destructive**       | `oklch(0.396 0.141 25.723)` | `oklch(0.577 0.245 27.325)` | Ações de erro ou deleção (Vermelho).                     |

### 2.2 Tipografia (Next/Font)

A tipografia é gerenciada nativamente pelo Next.js (`next/font/google`), garantindo performance sem Flash of Unstyled Text (FOUT).

* **Fonte Sans-serif (Padrão):** `Geist` (Utilizada para leitura, títulos e interface geral).
* **Fonte Monospace:** `Geist Mono` (Utilizada para blocos de código e elementos técnicos).

### 2.3 Stack de UI e Componentes

A biblioteca de componentes é baseada na arquitetura **Radix UI** primitives, estilizada via **shadcn/ui** (estilo `new-york`), garantindo acessibilidade (WAI-ARIA) e controle total sobre o código. O design inclui:

* Variantes configuradas com `class-variance-authority`.
* Mesclagem de classes utilitárias via `tailwind-merge` e `clsx`.
* Animações de entrada/saída via `tw-animate-css`.
* Ícones do sistema providos pela biblioteca `lucide-react`.

## 3. Wireframes e Telas Principais (Mockups)

Os wireframes abaixo foram desenhados com base nos atributos do DER e casos de uso.

### Tela: T1 — Landing Page / Home

* **Objetivo:** Apresentar o sistema e listar ferramentas em destaque.
* **Campos do DER:** Nome da ferramenta (`tool.nome`), descrição (`tool.descricao`) e linguagem (`tool.linguagem`).
* **Imagem:** [/assets/mockup/1-home.png](/docs/architecture/assets/mockup/1-home.png)

### Tela: T2 — Busca

* **Objetivo:** Localizar bibliotecas específicas através de filtros e termos de pesquisa.
* **Campos do DER:** `tool.nome`, `tool.linguagem` e `tool.descricao`.
* **Imagem:** [/assets/mockup/2-busca.png](/docs/architecture/assets/mockup/4-busca.png)

### Tela: T3 — Detalhe da Ferramenta

* **Objetivo:** Exibir informações completas de uma ferramenta e permitir a ação de favoritar.
* **Campos do DER:** `tool.nome`, `tool.descricao`, `tool.url_oficial`, `tool.linguagem` e `favorite.usuario_id`.
* **Imagem:** [/assets/mockup/3-ferramenta.png](/docs/architecture/assets/mockup/8-ferramenta)

### Tela: T4 — Login

* **Objetivo:** Autenticar o usuário.
* **Campos do DER:** E-mail (`user.email`) e senha (`user.senha`).
* **Imagem:** [/assets/mockup/4-login.png](/docs/architecture/assets/mockup/2-login.png)

### Tela: T5 — Cadastro

* **Objetivo:** Permitir que novos utilizadores criem uma conta na plataforma para acederem a funcionalidades personalizadas (favoritos e links privados).
* **Campos do DER:** `user.nome`, `user.email`, `user.senha` e `user.data_nascimento` (essencial para a regra de negócio de maioridade).
* **Imagem:** [/assets/mockup/5-cadastro.png](/docs/architecture/assets/mockup/3-cadastro.png)

### Tela: T6 — Perfil (Biblioteca Pessoal)

* **Objetivo:** Gerenciar favoritos (RN03).
* **Campos do DER:** Lista de ferramentas relacionadas via tabela **Favorite** e links privados da tabela  **PrivateLink** .
* **Imagem:** [/assets/mockup/6-perfil.png](/docs/architecture/assets/mockup/5-perfil.png)

### Tela: T7 — Suporte

* **Objetivo:** Canal de comunicação para o usuário enviar dúvidas ou reportar erros.
* **Campos do DER:** `support_ticket.email_contato`, `support_ticket.mensagem` e `support_ticket.secao_site`.
* **Imagem:** [/assets/mockup/7-suporte.png](/docs/architecture/assets/mockup/6-suporte.png)

### Tela: T8 — Admin (Dashboard)

* **Objetivo:** Gestão administrativa de usuários, ferramentas e tickets de suporte.
* **Campos do DER:** `support_ticket.status`, `user.perfil` e `tool.status_ativo`.
* **Imagem:** [/assets/mockup/8-admin.png](/docs/architecture/assets/mockup/7-admin.png)

---

## 4. Relação DER x Interface

Abaixo, explicamos como a modelagem de dados foi transposta para elementos visuais:

1. **Entidade `Tool` → Cards de Interface:** Cada registro na tabela **Tool** gera um card visual na Home. O campo `url_oficial` foi transformado em um botão de ação "Acessar Site".
2. **Entidade `Favorite` → Lista de Desejos:** A relação N:N entre usuários e ferramentas permitiu a criação da tela de Perfil. O campo `adicionado_at` é exibido como um rótulo "Favoritado em: [Data]".
3. **Entidade `SupportTicket` → Central de Ajuda:** Os atributos `mensagem` e `secao_site` tornaram-se campos de um formulário de contato, enquanto o `status` (Pendente/Resolvido) aparece como uma etiqueta visual para o usuário acompanhar sua solicitação.
4. **Entidade `PrivateLink` → Links Customizados:** O relacionamento 1:N com o **User** possibilitou uma seção exclusiva no Perfil onde o usuário gerencia seus próprios links de estudo (`titulo` e `url`).

## 5. Anexos Técnicos e Referências

A tabela abaixo centraliza os artefatos de suporte utilizados para a construção da interface e validação dos fluxos.

| Localização do Arquivo            | Tipo de Recurso               | Descrição Sucinta                                                                                                        |
| ----------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `assets/fivelib_screens_map.html` | **Mapa Interativo**     | Protótipo funcional que detalha a lista de telas, fluxos de navegação e a correlação entre Casos de Uso e requisitos. |
| `assets/mockup/`                  | **Repositório Visual** | Pasta contendo os wireframes digitais e fotos dos protótipos em papel, servindo como guia de layout para o frontend.      |
