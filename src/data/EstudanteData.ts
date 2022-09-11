import EstudanteModel from "../model/EstudanteModel";
import BaseDataBase from "./BaseDataBase";

class EstudanteData extends BaseDataBase {
  async criarEstudante(estudante: EstudanteModel) {
    await this.getConnection()
      .insert({
        id: estudante.getId(),
        nome: estudante.getNome(),
        email: estudante.getEmail(),
        data_nasc: estudante.getDataNascimento(),
        turma_id: estudante.getIdTurma(),
      })
      .into("lab_system_estudante");

    return `Estudante: ${estudante.getNome()} criado com sucesso!`;
  }

  async verificaEmail(email: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_estudante")
      .where({ email });
    return resultado[0];
  }

  async buscarNome(nome: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_estudante")
      .where({ nome });

    return resultado[0];
  }

  async buscarId(id: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_estudante")
      .where({ id });

    return resultado[0];
  }

  async mudarEstudante(id: string, turma: string) {
    await this.getConnection()
      .update({
        turma_id: turma,
      })
      .into("lab_system_estudante")
      .where({ id });
    return `Estudante atualizado com sucesso!`;
  }
}
export default EstudanteData;
