import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '../../../domain/producers/repositories/producer.repository.interface';
import { ProducerOutputDto } from '../dto/producer-output.dto';

@Injectable()
export class ListProducersUseCase {
  constructor(private readonly repository: IProducerRepository) {}

  async execute(): Promise<ProducerOutputDto[]> {
    const producers = await this.repository.findAll();

    return producers.map((producer) => ({
      id: producer.getId(),
      cpfCnpj: producer.getCpfCnpj(),
      name: producer.getName(),
      createdAt: producer.getCreatedAt(),
      updatedAt: producer.getUpdatedAt(),
    }));
  }
}
