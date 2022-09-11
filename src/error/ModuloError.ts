import BaseError from "./BaseError";

class ModuloError extends BaseError {
  constructor() {
    super("Insira valores entre 1 e 6", 401);
  }
}
export default ModuloError;
