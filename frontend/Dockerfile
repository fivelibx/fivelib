FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência primeiro (boa prática de cache do Docker).
COPY package.json package-lock.json* ./

# Instala as dependências.
RUN npm install

# Copia o resto do projeto.
COPY . .

# Comando padrão para rodar a maioria dos frameworks JS em desenvolvimento.
CMD ["npm", "run", "dev"]