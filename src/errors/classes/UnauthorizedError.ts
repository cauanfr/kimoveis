import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(public message: string = "This action is unauthorized.") {
    super(message, 401);
  }
}
