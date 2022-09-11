abstract class Usuario {
  private id: string;
  private nome: string;
  private email: string;
  private dataNascimento: string;
  private idTurma: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    dataNascimento: string,
    idTurma: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.idTurma = idTurma;
  }

  public getId() {
    return this.id;
  }
  public getNome() {
    return this.nome;
  }
  public getEmail() {
    return this.email;
  }
  public getDataNascimento() {
    return this.dataNascimento;
  }
  public getIdTurma() {
    return this.idTurma;
  }
}
export default Usuario;
