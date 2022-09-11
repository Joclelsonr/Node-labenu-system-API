import BaseError from "./BaseError";

class EmailError extends BaseError {
  constructor() {
    super("O email já esta cadastrado", 401);
  }
}
export default EmailError;
