import { DomainException } from './domain-exception';

export class BusinessRuleException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessRuleException';
    Object.setPrototypeOf(this, BusinessRuleException.prototype);
  }
}
