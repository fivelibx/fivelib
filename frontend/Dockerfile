FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário para instalar dependências
COPY package.json package-lock.json* ./

# Instala as dependências de forma limpa
RUN npm install

# Copia o restante, mas o .dockerignore vai filtrar o que não deve ir
COPY . .

# Garante que o diretório .next tenha permissão (evita erros de escrita no container)
RUN mkdir -p .next && chown node:node .next

EXPOSE 3000

CMD ["npm", "run", "dev"]