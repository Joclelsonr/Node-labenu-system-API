class TurmaModel {
  private id: string | undefined;
  private nome: string | undefined;
  private modulo: string | undefined;

  constructor(id: string, nome: string, modulo?: string) {
    this.id = id;
    this.nome = nome;
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
