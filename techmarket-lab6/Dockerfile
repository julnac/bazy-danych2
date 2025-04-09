# Dockerfile
FROM node:18

# Tworzymy katalog aplikacji
WORKDIR /app

# Kopiujemy package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

# Wystawiamy port
EXPOSE 5000

# Uruchamiamy aplikację
CMD ["npm", "start"]
# CMD ["sh", "-c", "npm run migrate && npm run seed:all && npm run dev"]