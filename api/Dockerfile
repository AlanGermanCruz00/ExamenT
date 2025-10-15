FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilar TypeScript
RUN npm run build


EXPOSE 3000

# Ejecutar compilado
CMD ["node", "build/index.js"]
