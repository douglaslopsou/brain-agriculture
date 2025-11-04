import { Injectable, Inject } from '@nestjs/common';
import { IProducerRepository } from '../../../domain/producers/repositories/producer.repository.interface';
import { BusinessRuleException } from '../../../domain/shared/exceptions/business-rule-exception';
import { PRODUCER_REPOSITORY } from '../../../domain/producers/repositories/producer.repository.token';

@Injectable()
export class DeleteProducerUseCase {
  constructor(
    @Inject(PRODUCER_REPOSITORY)
    private readonly repository: IProducerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const producer = await this.repository.findById(id);

    if (!producer) {
      throw new BusinessRuleException('Produtor não encontrado');
    }

    await this.repository.delete(id);
  }
}
