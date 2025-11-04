import { BusinessRuleException } from '../exceptions/business-rule-exception';

export class CpfCnpj {
  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = this.clean(value);
  }

  private clean(value: string): string {
    return value.replace(/\D/g, '');
  }

  private validate(value: string): void {
    const cleaned = this.clean(value);

    if (!cleaned || cleaned.length === 0) {
      throw new BusinessRuleException('CPF/CNPJ não pode ser vazio');
    }

    if (cleaned.length === 11) {
      if (!this.isValidCpf(cleaned)) {
        throw new BusinessRuleException('CPF inválido');
      }
    } else if (cleaned.length === 14) {
      if (!this.isValidCnpj(cleaned)) {
        throw new BusinessRuleException('CNPJ inválido');
      }
    } else {
      throw new BusinessRuleException('CPF/CNPJ deve ter 11 ou 14 dígitos');
    }
  }

  private isValidCpf(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  private isValidCnpj(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  toString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }

  isCpf(): boolean {
    return this.value.length === 11;
  }

  isCnpj(): boolean {
    return this.value.length === 14;
  }
}
