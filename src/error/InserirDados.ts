import BaseError from "./BaseError";

class InserirDados extends BaseError {
  constructor() {
    super("Insira os dados nos campos", 401);
  }
}
export default InserirDados;
