import { CpfCnpj } from '../../shared/value-objects/cpf-cnpj.value-object';

export class CpfCnpjValidatorService {
  validate(cpfCnpj: string): boolean {
    try {
      new CpfCnpj(cpfCnpj);
      return true;
    } catch {
      return false;
    }
  }

  isCpf(cpfCnpj: string): boolean {
    try {
      const valueObject = new CpfCnpj(cpfCnpj);
      return valueObject.isCpf();
    } catch {
      return false;
    }
  }

  isCnpj(cpfCnpj: string): boolean {
    try {
      const valueObject = new CpfCnpj(cpfCnpj);
      return valueObject.isCnpj();
    } catch {
      return false;
    }
  }
}
