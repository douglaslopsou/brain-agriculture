import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '../../../domain/producers/repositories/producer.repository.interface';
import { Producer } from '../../../domain/producers/entities/producer.entity';
import { CpfCnpjValidatorService } from '../../../domain/producers/services/cpf-cnpj-validator.service';
import { BusinessRuleException } from '../../../domain/shared/exceptions/business-rule-exception';
import { CreateProducerInputDto } from '../dto/create-producer-input.dto';
import { ProducerOutputDto } from '../dto/producer-output.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    private readonly repository: IProducerRepository,
    private readonly validatorService: CpfCnpjValidatorService,
  ) {}

  async execute(input: CreateProducerInputDto): Promise<ProducerOutputDto> {
    if (!this.validatorService.validate(input.cpfCnpj)) {
      throw new BusinessRuleException('CPF/CNPJ inválido');
    }

    const existingProducer = await this.repository.findByCpfCnpj(input.cpfCnpj);
    if (existingProducer) {
      throw new BusinessRuleException(
        'Já existe um produtor com este CPF/CNPJ',
      );
    }

    const producer = Producer.create(randomUUID(), input.cpfCnpj, input.name);

    const savedProducer = await this.repository.save(producer);

    return this.toOutputDto(savedProducer);
  }

  private toOutputDto(producer: Producer): ProducerOutputDto {
    return {
      id: producer.getId(),
      cpfCnpj: producer.getCpfCnpj(),
      name: producer.getName(),
      createdAt: producer.getCreatedAt(),
      updatedAt: producer.getUpdatedAt(),
    };
  }
}
