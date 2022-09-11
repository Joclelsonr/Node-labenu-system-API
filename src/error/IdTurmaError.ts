import BaseError from "./BaseError";

class IdTurmaError extends BaseError {
  constructor() {
    super("Id da turma inválido", 401);
  }
}
export default IdTurmaError;
