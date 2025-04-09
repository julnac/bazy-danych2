// Middleware obsługujące nieznalezione ścieżki (404 Not Found)
const notFound = (req, res, next) => {
    res.status(404).json({
      status: 'error',
      message: `Nie znaleziono zasobu: ${req.originalUrl}`
    });
  };
  
  module.exports = notFound;