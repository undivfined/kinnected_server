import { NextFunction, Request, Response } from "express";

export function handleServerErrors( 
    error: any,
    request: Request,
    response: Response,
    next: NextFunction){
  response.status(500).send({ message: "internal server error" });
};

export function handlePsqlErrors( 
    error: any,
    request: Request,
    response: Response,
    next: NextFunction){
  const psqlErrors = ["22P02", "23502", "23503", "22001", "22008", "23505"];
  if (psqlErrors.includes(error.code)) {
    response.status(400).send({ message: "bad request" });
  } else next(error);
};

export function handleCustomErrors( 
    error: any,
    request: Request,
    response: Response,
    next: NextFunction){
  if (error.status) {
    response.status(error.status).send({ message: error.message });
  } else next(error);
};
