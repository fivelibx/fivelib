# Variáveis para facilitar a manutenção
DOCKER_COMPOSE = docker compose

.PHONY: help up up-front up-api build-front-nc down logs test clean commit push sync

help: ## Mostra os comandos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

# --- Comandos Docker ---

up: ## Sobe todo o ambiente (Frontend, API e Banco) com build
	$(DOCKER_COMPOSE) up --build

up-front: ## Sobe apenas o frontend (fivelib-frontend) com build
	$(DOCKER_COMPOSE) up fivelib-frontend --build

up-api: ## Sobe apenas o backend (fivelib-api) com build
	$(DOCKER_COMPOSE) up fivelib-api --build

build-front-nc: ## Reconstrói o frontend do zero ignorando o cache
	$(DOCKER_COMPOSE) build --no-cache fivelib-frontend

down: ## Derruba todos os containers do ambiente
	$(DOCKER_COMPOSE) down

logs: ## Exibe os logs de todos os serviços em tempo real
	$(DOCKER_COMPOSE) logs -f

test: ## Roda os testes na pasta src do container fivelib-api
	$(DOCKER_COMPOSE) exec fivelib-api pytest src/

clean: ## Reset Total: Derruba containers e APAGA os volumes do banco
	$(DOCKER_COMPOSE) down -v

# --- Comandos Git ---

# Uso: make commit msg="descrição do commit"
commit: ## Adiciona tudo e commita seguindo o padrão de mensagens
	git add .
	git commit -m "$(msg)"

# Uso: make push
push: ## Faz push da branch atual para o repositório remoto
	git push origin $(shell git branch --show-current)

# Uso: make sync
sync: ## Sincronização Segura: Fetch + Merge da origin/develop na branch atual
	git fetch origin
	git merge origin/develop