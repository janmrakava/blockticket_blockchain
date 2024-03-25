import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const Validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error: Record<string, string> = {};

    errors.array().forEach((err: ValidationError & { [key: string]: any }) => {
      if (err.param) {
        error[err.param] = err.msg;
      }
    });

    return res.status(422).json({ error });
  }

  next();
};

export default Validate;
