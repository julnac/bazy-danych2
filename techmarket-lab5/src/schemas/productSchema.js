const Joi = require('joi');

// Schemat dla tworzenia produktu
const createProductSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  category: Joi.string().required(),
  price: Joi.number().required().min(0),
  attributes: Joi.object().pattern(
    Joi.string(), 
    Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean())
  ),
  category_info: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    parent: Joi.string().allow(null, '')
  })
});

// Schemat dla aktualizacji oceny produktu
const ratingSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5)
});

// Schemat dla aktualizacji ceny produktu
const priceUpdateSchema = Joi.object({
  price: Joi.number().required().min(0)
});

// Schemat dla wyszukiwania według atrybutu
const attributeSearchSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean()).required()
});

module.exports = {
  createProductSchema,
  ratingSchema,
  priceUpdateSchema,
  attributeSearchSchema
};
