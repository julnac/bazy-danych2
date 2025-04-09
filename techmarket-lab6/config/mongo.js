const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    // Próba połączenia z MongoDB używając connection string ze zmiennej środowiskowej
    // Zakładamy, że dotenv został załadowany wcześniej w pliku server.js
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Komunikat sukcesu w konsoli
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Obsługa błędu połączenia
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Zakończenie procesu aplikacji z kodem błędu (1)
    process.exit(1);
  }
};

// Eksportowanie funkcji, aby można jej było użyć w innych plikach
module.exports = connectMongo;