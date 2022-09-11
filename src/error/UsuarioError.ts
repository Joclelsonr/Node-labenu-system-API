import BaseError from "./BaseError";

class UsuarioError extends BaseError {
  constructor() {
    super("Usuário não encontrado", 404);
  }
}
export default UsuarioError;
