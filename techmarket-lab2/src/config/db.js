const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'haslo123',
  port: 5433,
});

// Automatyczna inicjalizacja bazy danych z pliku SQL
const initDb = async () => {
  const initScript = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
  try {
    await pool.query(initScript);
    console.log('Baza danych została zainicjalizowana.');
  } catch (err) {
    console.error('Błąd inicjalizacji bazy danych:', err);
  }
};

initDb();

module.exports = pool;