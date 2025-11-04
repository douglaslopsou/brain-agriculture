import { CpfCnpj } from '../../shared/value-objects/cpf-cnpj.value-object';

export class Producer {
  private constructor(
    private readonly id: string,
    private readonly cpfCnpj: CpfCnpj,
    private name: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    id: string,
    cpfCnpj: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Producer {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do produtor não pode ser vazio');
    }

    const now = new Date();
    return new Producer(
      id,
      new CpfCnpj(cpfCnpj),
      name.trim(),
      createdAt || now,
      updatedAt || now,
    );
  }

  static reconstitute(
    id: string,
    cpfCnpj: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ): Producer {
    return new Producer(id, new CpfCnpj(cpfCnpj), name, createdAt, updatedAt);
  }

  getId(): string {
    return this.id;
  }

  getCpfCnpj(): string {
    return this.cpfCnpj.toString();
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do produtor não pode ser vazio');
    }
    this.name = name.trim();
    this.updatedAt = new Date();
  }
}
