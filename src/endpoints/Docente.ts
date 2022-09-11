import { Request, Response } from "express";
import moment from "moment";
import DocenteData from "../data/DocenteData";
import TurmaData from "../data/TurmaData";
import EmailError from "../error/EmailError";
import EstudanteError from "../error/UsuarioError";
import IdTurmaError from "../error/IdTurmaError";
import InserirDados from "../error/InserirDados";
import DocenteModel from "../model/DocenteModel";

class Docente {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, dataNascimento, idTurma } = req.body;
      const id = Math.floor(Date.now() * Math.random()).toString(36);
      if (!nome || !email || !dataNascimento || !idTurma) {
        throw new InserirDados();
      }

      const docenteData = new DocenteData();
      const verificaEmail = await docenteData.verificaEmail(email);
      if (verificaEmail) {
        throw new EmailError();
      }

      const turmaData = new TurmaData();
      const verificaID = await turmaData.verificaId(idTurma);
      if (!verificaID.length) {
        throw new IdTurmaError();
      }

      const dataConvertida = moment(dataNascimento, "DD/MM/YYYY/").format(
        "YYYY/MM/DD"
      );

      const estudanteModel = new DocenteModel(
        id,
        nome,
        email,
        dataConvertida,
        idTurma
      );
      const resultado = await docenteData.criarDocente(estudanteModel);

      res.status(201).send(resultado);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async buscarDocentes(req: Request, res: Response) {
    try {
      const docenteData = new DocenteData();

      const todosDocentes = await docenteData.buscarDocentes();

      res.status(200).send(todosDocentes);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async mudar(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { turma } = req.body;

      const docenteData = new DocenteData();
      const verificaId = await docenteData.buscarId(id);
      if (!verificaId) {
        throw new EstudanteError();
      }

      const turmaData = new TurmaData();
      const verificaID = await turmaData.verificaId(turma);
      if (!verificaID.length) {
        throw new IdTurmaError();
      }

      const resultado = await docenteData.mudarDocente(id, turma);

      res.status(200).send({ message: resultado });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}
export default Docente;
