const errorHandler = (err, req, res, next) => {
    console.error('❌', err);
    res.status(err.status || 500).json({
      message: err.message || 'Wystąpił błąd serwera',
    });
  };
  
  module.exports = errorHandler;