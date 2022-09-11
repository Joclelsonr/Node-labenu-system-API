import { Request, Response } from "express";
import EstudanteData from "../data/EstudanteData";
import TurmaData from "../data/TurmaData";
import EmailError from "../error/EmailError";
import IdTurmaError from "../error/IdTurmaError";
import InserirDados from "../error/InserirDados";
import EstudanteModel from "../model/EstudanteModel";
import EstudanteError from "../error/UsuarioError";
import moment from "moment";

class Estudante {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, dataNascimento, idTurma } = req.body;
      const id = Math.floor(Date.now() * Math.random()).toString(36);
      if (!nome || !email || !dataNascimento || !idTurma) {
        throw new InserirDados();
      }

      const estudanteData = new EstudanteData();
      const verificaEmail = await estudanteData.verificaEmail(email);
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

      const estudanteModel = new EstudanteModel(
        id,
        nome,
        email,
        dataConvertida,
        idTurma
      );
      const resultado = await estudanteData.criarEstudante(estudanteModel);

      res.status(201).send(resultado);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const nome = req.params.nome;

      const estudanteData = new EstudanteData();
      const resultado = await estudanteData.buscarNome(nome);

      if (!resultado) {
        throw new EstudanteError();
      }

      res.status(200).send(resultado);
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

      const estudanteData = new EstudanteData();
      const verificaId = await estudanteData.buscarId(id);
      if (!verificaId) {
        throw new EstudanteError();
      }

      const turmaData = new TurmaData();
      const verificaID = await turmaData.verificaId(turma);
      if (!verificaID.length) {
        throw new IdTurmaError();
      }

      const resultado = await estudanteData.mudarEstudante(id, turma);

      res.status(200).send({ message: resultado });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}
export default Estudante;
