import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(public message: string = "Resource not found.") {
    super(message, 404);
  }
}
