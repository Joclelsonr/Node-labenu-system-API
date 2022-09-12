import DocenteModel from "../model/DocenteModel";
import BaseDataBase from "./BaseDataBase";

class DocenteData extends BaseDataBase {
  async criarDocente(docente: DocenteModel) {
    await this.getConnection()
      .insert({
        id: docente.getId(),
        nome: docente.getNome(),
        email: docente.getEmail(),
        data_nasc: docente.getDataNascimento(),
        turma_id: docente.getIdTurma(),
      })
      .into("lab_system_docente");

    return `Professor: ${docente.getNome()} criado com sucesso!`;
  }

  async verificaEmail(email: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_docente")
      .where({ email });
    return resultado[0];
  }

  async buscarDocentes(): Promise<DocenteModel[]> {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_docente");

    const docenteTipado = resultado.map((docente) => {
      return new DocenteModel(
        docente.id,
        docente.nome,
        docente.email,
        docente.data_nasc,
        docente.turma_id
      );
    });

    return docenteTipado;
  }

  async buscarId(id: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_docente")
      .where({ id });

    return resultado[0];
  }

  async mudarDocente(id: string, turma: string) {
    await this.getConnection()
      .update({
        turma_id: turma,
      })
      .into("lab_system_docente")
      .where({ id });
    return `A turma do professor, foi atualizado com sucesso!`;
  }
}
export default DocenteData;
