import { Request, Response } from "express";
import TurmaData from "../data/TurmaData";
import InserirDados from "../error/InserirDados";
import ModuloError from "../error/ModuloError";
import TurmaModel from "../model/TurmaModel";

class Turma {
  async criar(req: Request, res: Response) {
    try {
      const { nome } = req.body;
      const id = Math.floor(Date.now() * Math.random()).toString(36);

      if (!nome) {
        throw new InserirDados();
      }
      const turma = new TurmaModel(id, nome);

      const turmaData = new TurmaData();
      const resultado = await turmaData.criarTurma(turma);

      res.status(201).send({ message: resultado });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async ativas(req: Request, res: Response) {
    try {
      const turmaData = new TurmaData();
      const turmasAtivas = await turmaData.turmasAtivas();

      res.status(200).send(turmasAtivas);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async modulo(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { modulo } = req.body;

      if (!modulo) {
        throw new InserirDados();
      }
      if (modulo < 0 || modulo > 6) {
        throw new ModuloError();
      }
      const turmaData = new TurmaData();
      const resultado = await turmaData.mudarTurma(id, modulo);

      res.status(200).send({ message: resultado });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}
export default Turma;
