FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json* ./

# Instala as dependências (O Next.js será instalado aqui)
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta 3000 (O Next.js usa 3000 por padrão, diferente do Vite que usava 5173)
EXPOSE 3000

# Comando para rodar o Next.js
# Certifique-se que no seu package.json o "dev" esteja como: "next dev -H 0.0.0.0"
CMD ["npm", "run", "dev"]