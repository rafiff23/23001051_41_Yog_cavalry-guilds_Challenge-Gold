const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    archetypeId: Joi.string().custom(objectId),
  }),
};

const getById = {
  params: Joi.object().keys({
    deckId: Joi.required().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    deckId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      archetypeId: Joi.string().custom(objectId),
    })
    .min(1),
};

const del = {
  params: Joi.object().keys({
    deckId: Joi.required().custom(objectId),
  }),
};

const getByUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

const getDecksByArchetype = {
  params: Joi.object().keys({
    archetypeId: Joi.string().required(),
  }),
};

const search = {
  query: Joi.object().keys({
    name: Joi.string(),
    sort: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};
module.exports = {
  create,
  getById,
  update,
  del,
  getByUser,
  getDecksByArchetype,
  search,
};
