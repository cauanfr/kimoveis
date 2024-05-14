import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(public message: string = "Resource already exists.") {
    super(message, 409);
  }
}
