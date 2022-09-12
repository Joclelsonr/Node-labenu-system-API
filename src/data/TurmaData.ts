import TurmaModel from "../model/TurmaModel";
import BaseDataBase from "./BaseDataBase";

class TurmaData extends BaseDataBase {
  async criarTurma(turma: TurmaModel): Promise<string> {
    await this.getConnection()
      .insert({
        id: turma.pegarId(),
        nome: turma.pegarNome(),
      })
      .into("lab_system_turma");
    return `Turma ${turma.pegarNome()} criada com sucesso!`;
  }

  async turmasAtivas(): Promise<TurmaModel[]> {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_turma")
      .where("modulo", ">", 0);
    const turmasTipadas = resultado.map((turma) => {
      return new TurmaModel(turma.id, turma.nome, turma.modulo);
    });
    return turmasTipadas;
  }

  async mudarTurma(id: string, modulo: number): Promise<string> {
    await this.getConnection()
      .update({ modulo })
      .into("lab_system_turma")
      .where({ id });

    return `O modulo foi alterado com sucesso!`;
  }

  async verificaId(id: string) {
    const resultado = await this.getConnection()
      .select("*")
      .from("lab_system_turma")
      .where({ id });

    return resultado;
  }
}
export default TurmaData;
