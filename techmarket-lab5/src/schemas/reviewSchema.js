const Joi = require('joi');

// Schemat dla tworzenia recenzji
const createReviewSchema = Joi.object({
    productId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    userId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    rating: Joi.number().required().min(1).max(5),
    title: Joi.string().required().min(3).max(100),
    content: Joi.string().required().min(10),
    pros: Joi.array().items(Joi.string()).default([]),
    cons: Joi.array().items(Joi.string()).default([]),
    verifiedPurchase: Joi.boolean().default(false),
    helpfulVotes: Joi.number().integer().min(0).default(0)
});

// // Schemat dla aktualizacji recenzji
// const updateReviewSchema = Joi.object({
//   rating: Joi.number().min(1).max(5),
//   title: Joi.string().min(3).max(100),
//   content: Joi.string().min(10),
//   pros: Joi.array().items(Joi.string()),
//   cons: Joi.array().items(Joi.string()),
//   verifiedPurchase: Joi.boolean(),
//   helpfulVotes: Joi.number().integer().min(0)
// }).min(1); // Wymaga co najmniej jednego pola do aktualizacji

// Schemat dla aktualizacji zawartości recenzji
const contentUpdateSchema = Joi.object({
    content: Joi.string().required().min(10),
});

// Schemat dla wyszukiwania według oceny
const attributeSearchSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    rating: Joi.number().required().min(1).max(5),
});

module.exports = {
  createReviewSchema,
//   updateReviewSchema,
  contentUpdateSchema,
  attributeSearchSchema
};
