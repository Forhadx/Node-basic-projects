import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../models/Author";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
      age: Joi.number().required()
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
      age: Joi.number().required()
    }),
  },
};
