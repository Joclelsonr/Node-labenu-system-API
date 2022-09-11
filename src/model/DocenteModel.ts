import Usuario from "./Usuario";

class DocenteModel extends Usuario {
  constructor(
    id: string,
    nome: string,
    email: string,
    dataNascimento: string,
    idTurma: string
  ) {
    super(id, nome, email, dataNascimento, idTurma);
  }
}
export default DocenteModel;
