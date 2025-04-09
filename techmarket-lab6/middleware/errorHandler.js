const errorHandler = (err, req, res, next) => {
  console.error(`[BŁĄD] ${err.stack}`);
  
  // Błąd walidacji Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Błąd walidacji',
      errors
    });
  }
  
  // Błąd unikalności Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    
    return res.status(409).json({
      status: 'error',
      message: 'Naruszenie ograniczenia unikalności',
      errors
    });
  }
  
  // Błąd klucza obcego Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Naruszenie ograniczenia klucza obcego',
      error: 'Odwoływany zasób nie istnieje'
    });
  }
  
  // Domyślna odpowiedź błędu
  return res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Wewnętrzny błąd serwera'
  });
};

module.exports = errorHandler;