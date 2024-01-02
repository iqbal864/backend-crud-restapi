/* eslint-disable @typescript-eslint/member-delimiter-style */
import Joi from 'joi';

interface ProductInterface {
  name: String;
  price: Number;
  stok: Number;
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    stok: Joi.number().required()
  });

  return schema.validate(payload);
};
