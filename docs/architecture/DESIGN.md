
# Guia de Identidade Visual e Prototipação - FiveLib

Este documento define o esqueleto visual, a tipografia, as cores e os componentes principais da plataforma FiveLib. Ele serve como base para a implementação do Frontend, respeitando os requisitos definidos no PRD e no Dicionário de Dados.

## 1. Mapeamento e Fluxo

O mapeamento completo das interfaces e a lógica de interação foram estruturados para garantir uma experiência de usuário fluida, conforme detalhado no arquivo `fivelib_screens_map.html`.

* **Mapeamento de Interfaces:** O sistema é composto por 8 telas principais, identificadas de **T1 (Home)** a  **T8 (Admin)** . Essa estrutura abrange todo o escopo do projeto, incluindo os mecanismos de busca, o gerenciamento de bibliotecas personalizadas e os canais de suporte técnico.
* **Dinâmica de Navegação:** O fluxo foi projetado para guiar o usuário de maneira intuitiva. O percurso inicia-se na **Home** para visualização geral, avança para a **Busca** refinada e, mediante autenticação no **Login/Cadastro** (e respectiva validação de e-mail), permite a persistência de dados e gestão de perfil do usuário.

## 2. Identidade Visual (Design Tokens)

A identidade visual do FiveLib foi modernizada, utilizando o ecossistema Next.js com Tailwind CSS e shadcn/ui.

### 2.1 Paleta de Cores (Tailwind CSS)

As cores abaixo refletem o tema base configurado no `globals.css` da aplicação:

| **Token**             | **Dark Mode (Padrão)** | **Light Mode**          | **Aplicação**                                        |
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

Os wireframes abaixo foram desenhados com base nos atributos do banco de dados atualizado e casos de uso.

### Tela: T1 — Landing Page / Home

* **Objetivo:** Apresentar o sistema e listar ferramentas em destaque.
* **Campos do DB:** Nome da ferramenta (`tool.nome`), descrição (`tool.descricao`), categoria (`tool.categoria`) e contador de favoritos (`tool.stars`).
* **Imagem:** `/assets/mockup/1-home.png`

### Tela: T2 — Busca

* **Objetivo:** Localizar bibliotecas específicas através de filtros e termos de pesquisa.
* **Campos do DB:** `tool.nome`, `tool.linguagem`, `tool.categoria` e array de tecnologias (`tool.tags`).
* **Imagem:** `/assets/mockup/4-busca.png`

### Tela: T3 — Detalhe da Ferramenta

* **Objetivo:** Exibir informações completas de uma ferramenta e permitir a ação de favoritar.
* **Campos do DB:** `tool.nome`, `tool.descricao`, `tool.url_oficial`, `tool.linguagem`, `tool.tags`, `tool.icon_slug` e o toggle na tabela junção `favorite.usuario_id`.
* **Imagem:** `/assets/mockup/8-ferramenta`

### Tela: T4 — Login

* **Objetivo:** Autenticar o usuário ativo.
* **Campos do DB:** E-mail (`user.email`), senha (`user.senha`) e checagem de conta verificada (`user.is_active`).
* **Imagem:** `/assets/mockup/2-login.png`

### Tela: T5 — Cadastro e Ativação

* **Objetivo:** Criar conta e acionar o fluxo de verificação de e-mail via Brevo.
* **Campos do DB:** `user.nome`, `user.email`, `user.senha`, `user.data_nascimento` (maioridade) e aceite das políticas (`user.accepted_terms`).
* **Imagem:** `/assets/mockup/3-cadastro.png`

### Tela: T6 — Perfil (Biblioteca Pessoal)

* **Objetivo:** Gerenciar favoritos, links customizados e dados públicos do usuário.
* **Campos do DB:** Ferramentas favoritadas, links privados (`private_link.titulo` e `url`), e complementos de perfil (`user.titulo_profissional`, `user.github`, `user.linkedin`).
* **Imagem:** `/assets/mockup/5-perfil.png`

### Tela: T7 — Suporte

* **Objetivo:** Canal de comunicação para enviar dúvidas ou reportar instabilidade.
* **Campos do DB:** `support_ticket.email_contato`, `support_ticket.mensagem` e `support_ticket.secao_site`.
* **Imagem:** `/assets/mockup/6-suporte.png`

### Tela: T8 — Admin (Dashboard)

* **Objetivo:** Gestão administrativa da plataforma.
* **Campos do DB:** Controle de permissões (`user.perfil`), gerenciamento do catálogo (`tool.status_ativo`), e moderação de tickets (`support_ticket.status` e `support_ticket.observacao_admin`).
* **Imagem:** `/assets/mockup/7-admin.png`

## 4. Relação DB x Interface

Abaixo, a transposição da arquitetura de dados atualizada para os elementos visuais:

1. **Entidade `tool` → Cards e Listagens:** Cada registro gera um card de interface. O array `tags` é renderizado como *badges* (etiquetas) abaixo da descrição, e o `icon_slug` determina qual ícone do `lucide-react` será carregado dinamicamente no cabeçalho do card.
2. **Entidade `user` → Painel de Perfil:** Além dos dados base, os campos nulos por padrão (`github`, `linkedin`, `titulo_profissional`) ativam blocos adicionais na interface do perfil somente quando preenchidos pelo usuário.
3. **Entidade `favorite` → Biblioteca Dinâmica:** O cruzamento das chaves na tabela de relacionamento permite listar as tecnologias salvas no painel do estudante e alimenta diretamente a coluna `stars` na exibição pública da ferramenta.
4. **Entidade `support_ticket` → Central de Resolução:** O formulário alimenta as requisições pendentes. No painel de administração (T8), a coluna nova `observacao_admin` é traduzida para um campo de texto interno onde a equipe registra o andamento da correção.

## 5. Anexos Técnicos e Referências

A tabela abaixo centraliza os artefatos de suporte utilizados para a construção da interface.

| **Localização do Arquivo**  | **Tipo de Recurso**     | **Descrição Sucinta**                                                   |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| `assets/fivelib_screens_map.html` | **Mapa Interativo**     | Protótipo funcional que detalha a lista de telas e fluxos de navegação.      |
| `assets/mockup/`                  | **Repositório Visual** | Pasta contendo os wireframes digitais e mockups que servem como guia de layout. |
