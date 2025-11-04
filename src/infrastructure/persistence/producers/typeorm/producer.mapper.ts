import { Producer } from '../../../../domain/producers/entities/producer.entity';
import { ProducerOrmEntity } from './producer.orm-entity';

export class ProducerMapper {
  static toDomain(ormEntity: ProducerOrmEntity): Producer {
    return Producer.reconstitute(
      ormEntity.id,
      ormEntity.cpf_cnpj,
      ormEntity.name,
      ormEntity.created_at,
      ormEntity.updated_at,
    );
  }

  static toOrm(domainEntity: Producer): Partial<ProducerOrmEntity> {
    return {
      id: domainEntity.getId(),
      cpf_cnpj: domainEntity.getCpfCnpj(),
      name: domainEntity.getName(),
      created_at: domainEntity.getCreatedAt(),
      updated_at: domainEntity.getUpdatedAt(),
    };
  }
}
