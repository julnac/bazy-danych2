function validateRequest(schema, property) {
    return (req, res, next) => {
      const { error } = schema.validate(req[property]);
      
      if (error) {
        return res.status(400).json({
          message: 'Validation error',
          details: error.details.map(detail => detail.message)
        });
      }
      
      next();
    };
  }
  
module.exports = { validateRequest };