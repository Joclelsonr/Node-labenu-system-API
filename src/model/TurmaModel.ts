class TurmaModel {
  private id: string | undefined = Math.floor(
    Date.now() * Math.random()
  ).toString(36);
  private nome: string | undefined;
  private modulo: string | undefined;

  constructor(nome: string, id?: string, modulo?: string) {
    this.nome = nome;
    this.id = id;
    this.modulo = modulo;
  }

  public pegarId() {
    return this.id;
  }
  public pegarNome() {
    return this.nome;
  }
}
export default TurmaModel;
