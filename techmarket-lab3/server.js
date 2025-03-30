require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// Import modeli, aby upewnić się, że są zarejestrowane
require('./models');

// Ustawienie portu
const PORT = process.env.PORT || 3000;

// Uruchomienie serwera
const startServer = async () => {
  try {
    console.log('DB Config:', process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD);
    // Testowanie połączenia z bazą danych
    await sequelize.authenticate();
    console.log('Połączenie z bazą danych zostało pomyślnie nawiązane.');
    
    // Uruchomienie serwera Express
    app.listen(PORT, () => {
      console.log(`Serwer działa na porcie ${PORT}`);
      console.log(`API dostępne pod adresem http://localhost:${PORT}/api/`);
    });
  } catch (error) {
    console.error('Nie można uruchomić serwera:', error);
    process.exit(1);
  }
};

startServer();

// docker pull postgres:latest
// docker run --name techmarket-lab3 -e POSTGRES_PASSWORD=haslo123 -p 5433:5432 -d postgres:latest

// node server.js
//npm test


