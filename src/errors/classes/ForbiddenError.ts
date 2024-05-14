import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  constructor(public message: string = "This action is forbidden.") {
    super(message, 403);
  }
}
