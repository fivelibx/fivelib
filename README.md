<img alt="FiveLib Banner" src="https://github.com/devacademicx/fivelib/blob/main/docs/assets/banner.png"/>

<div align="center">
<br/>
  <a href="https://fivelib.vercel.app/">
      <img alt="Website" src="https://img.shields.io/badge/website-green?labelColor=404040&color=353535&style=for-the-badge&logo=vercel&logoColor=white" href="https://fivelib.vercel.app/">
  </a>
  <a href="/docs/architecture/">
      <img alt="API Documentation" src="https://img.shields.io/badge/API_Docs-green?labelColor=404040&color=353535&style=for-the-badge&logo=fastapi&logoColor=white" href="#">
  </a>
  <a href="/docs/">
      <img alt="Project Documentation" src="https://img.shields.io/badge/documentation-green?labelColor=404040&color=353535&style=for-the-badge&logo=readthedocs&logoColor=white" href="/docs/">
  </a>
<br>
<br>
</div>

O FiveLib é uma **plataforma web de curadoria e organização** focada em centralizar conteúdos, ferramentas e bibliotecas essenciais para iniciantes na área de programação, reduzindo a sobrecarga de informação através de uma arquitetura limpa e escalável.

Se você considera este repositório útil para seus estudos ou projetos, por favor considere dar um Star no projeto.

## Como Executar

O ambiente de desenvolvimento é totalmente conteinerizado utilizando Docker para garantir paridade estrutural entre todos os desenvolvedores.

Para subir todo o ecossistema (Frontend, Backend e Banco de Dados), utilize os comandos abaixo:

```bash
# Utilizando o Makefile para orquestrar o ambiente
make up

# Alternativa direta caso não possua o Makefile configurado
docker-compose up --build
```

## Funcionalidades Principais

### Curadoria Técnica

* Direcionamento estruturado para iniciantes no ecossistema de desenvolvimento.
* Explicações conceituais claras sobre ferramentas fundamentais (Docker, Git, APIs).
* Hub de documentação com links diretos para fontes oficiais e confiáveis.

### Gestão e Personalização

* Autenticação e gestão de usuários.
* Sistema de biblioteca pessoal para salvar e organizar referências.
* Interface totalmente assíncrona garantindo fluidez no consumo de dados.

## Arquitetura do Sistema

O projeto adota uma abordagem rigorosa de **API-first** com desacoplamento total entre as camadas do software:

* **Frontend (Web):** Camada de apresentação que consome os serviços da API de forma independente.
* **Backend (API):** Desenvolvido em FastAPI e Python, isolando todas as regras de negócio e rotas de acesso.
* **Banco de Dados:** PostgreSQL encarregado da persistência de metadados, credenciais e relacionamentos.

## Documentação do Projeto

O FiveLib foi desenhado com o princípio de "Documentation First". Todas as especificações técnicas estão isoladas no diretório `/docs`.

Para uma compreensão detalhada, acesse os domínios específicos abaixo:

* [Requirements](/docs/requirements/): Definição de escopo, regras de negócio (RN), requisitos (RF/RNF) e casos de uso.
* [Architecture](/docs/architecture/): Modelagem de dados (ERD), Dicionário de Dados e contratos de API (Swagger/OpenAPI).
* [Infrastructure](/docs/infrastructure/): Configurações de containers Docker, redes e estratégias de implantação.
* **Dossier Final:** Compilado absoluto do projeto para auditoria acadêmica (`dossier-final.pdf`).

## Diretrizes de Desenvolvimento

Para contribuir ou manter o código, as seguintes diretrizes arquiteturais e de versionamento devem ser estritamente respeitadas:

* **Decoupling:** Frontend e Backend operam como entidades isoladas. Nenhuma lógica de negócio deve residir na interface.
* **API-Driven:** Todas as funcionalidades devem ser idealizadas, modeladas e expostas via endpoints antes de qualquer implementação no Frontend.
* **Versionamento Semântico:** Uso mandatório do padrão *Conventional Commits* (`feat/`, `fix/`, `docs/`, `chore/`) para integridade do histórico do Git.

## Contribuições e Autores

O FiveLib é um projeto aberto a melhorias. Valorizamos contribuições que respeitem a arquitetura e os padrões estabelecidos.

Para entender as regras de desenvolvimento, fluxo de trabalho e como enviar suas alterações, leia nosso [Guia de Contribuição](/.github/CONTRIBUTING.md).
