import Joi from 'joi';

interface ProductInterface {
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  name: String;
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  price: Number;
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  });

  return schema.validate(payload);
};
