import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '../../../domain/producers/repositories/producer.repository.interface';
import { CpfCnpjValidatorService } from '../../../domain/producers/services/cpf-cnpj-validator.service';
import { BusinessRuleException } from '../../../domain/shared/exceptions/business-rule-exception';
import { UpdateProducerInputDto } from '../dto/update-producer-input.dto';
import { ProducerOutputDto } from '../dto/producer-output.dto';

@Injectable()
export class UpdateProducerUseCase {
  constructor(
    private readonly repository: IProducerRepository,
    private readonly validatorService: CpfCnpjValidatorService,
  ) {}

  async execute(
    id: string,
    input: UpdateProducerInputDto,
  ): Promise<ProducerOutputDto> {
    const producer = await this.repository.findById(id);

    if (!producer) {
      throw new BusinessRuleException('Produtor não encontrado');
    }

    if (input.cpfCnpj && input.cpfCnpj !== producer.getCpfCnpj()) {
      if (!this.validatorService.validate(input.cpfCnpj)) {
        throw new BusinessRuleException('CPF/CNPJ inválido');
      }

      const existingProducer = await this.repository.findByCpfCnpj(
        input.cpfCnpj,
      );
      if (existingProducer && existingProducer.getId() !== id) {
        throw new BusinessRuleException(
          'Já existe outro produtor com este CPF/CNPJ',
        );
      }
    }

    if (input.name) {
      producer.updateName(input.name);
    }

    const updatedProducer = await this.repository.save(producer);

    return {
      id: updatedProducer.getId(),
      cpfCnpj: updatedProducer.getCpfCnpj(),
      name: updatedProducer.getName(),
      createdAt: updatedProducer.getCreatedAt(),
      updatedAt: updatedProducer.getUpdatedAt(),
    };
  }
}
