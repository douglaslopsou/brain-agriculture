import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '../../../domain/producers/repositories/producer.repository.interface';
import { ProducerOutputDto } from '../dto/producer-output.dto';
import { BusinessRuleException } from '../../../domain/shared/exceptions/business-rule-exception';

@Injectable()
export class GetProducerUseCase {
  constructor(private readonly repository: IProducerRepository) {}

  async execute(id: string): Promise<ProducerOutputDto> {
    const producer = await this.repository.findById(id);

    if (!producer) {
      throw new BusinessRuleException('Produtor não encontrado');
    }

    return {
      id: producer.getId(),
      cpfCnpj: producer.getCpfCnpj(),
      name: producer.getName(),
      createdAt: producer.getCreatedAt(),
      updatedAt: producer.getUpdatedAt(),
    };
  }
}
