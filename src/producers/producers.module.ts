import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersController } from '../presentation/producers/producers.controller';
import { CreateProducerUseCase } from '../application/producers/use-cases/create-producer.use-case';
import { GetProducerUseCase } from '../application/producers/use-cases/get-producer.use-case';
import { ListProducersUseCase } from '../application/producers/use-cases/list-producers.use-case';
import { UpdateProducerUseCase } from '../application/producers/use-cases/update-producer.use-case';
import { DeleteProducerUseCase } from '../application/producers/use-cases/delete-producer.use-case';
import { TypeOrmProducerRepository } from '../infrastructure/persistence/producers/typeorm/producer.repository';
import { ProducerOrmEntity } from '../infrastructure/persistence/producers/typeorm/producer.orm-entity';
import { CpfCnpjValidatorService } from '../domain/producers/services/cpf-cnpj-validator.service';
import { PRODUCER_REPOSITORY } from '../domain/producers/repositories/producer.repository.token';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerOrmEntity])],
  controllers: [ProducersController],
  providers: [
    {
      provide: PRODUCER_REPOSITORY,
      useClass: TypeOrmProducerRepository,
    },
    CreateProducerUseCase,
    GetProducerUseCase,
    ListProducersUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
    CpfCnpjValidatorService,
  ],
  exports: [PRODUCER_REPOSITORY],
})
export class ProducersModule {}

