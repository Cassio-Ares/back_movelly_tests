import { Request, Response, NextFunction } from 'express';

export const errorsMiddleware = (err, _req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) {
    res.status(err.statusCode)
    return res.json(err)
  }

  res.status(500).json({
    statusCode: 500,
    error: "Internal server error",
  });

  return res.json({ error: err.message });
}
