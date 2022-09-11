import app from "./app";
import Docente from "./endpoints/Docente";
import Estudante from "./endpoints/Estudante";
import Turma from "./endpoints/Turma";

const turma = new Turma();
const estudante = new Estudante();
const docente = new Docente();

app.post("/turma", turma.criar);
app.get("/turmas-ativas", turma.ativas);
app.post("/alterar-modulo/:id", turma.modulo);

app.post("/estudante", estudante.criar);
app.get("/estudante/:nome", estudante.buscar);
app.post("/mudar-turma/:id", estudante.mudar);

app.post("/docente", docente.criar);
app.get("/docentes", docente.buscarDocentes);
app.post("/mudar-docente/:id", docente.mudar);
