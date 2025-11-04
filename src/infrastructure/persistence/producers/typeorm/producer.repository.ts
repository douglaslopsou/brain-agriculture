import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProducerRepository } from '../../../../domain/producers/repositories/producer.repository.interface';
import { Producer } from '../../../../domain/producers/entities/producer.entity';
import { ProducerOrmEntity } from './producer.orm-entity';
import { ProducerMapper } from './producer.mapper';

@Injectable()
export class TypeOrmProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(ProducerOrmEntity)
    private readonly ormRepository: Repository<ProducerOrmEntity>,
  ) {}

  async save(producer: Producer): Promise<Producer> {
    const ormEntity = ProducerMapper.toOrm(producer);

    if (ormEntity.id) {
      const existing = await this.ormRepository.findOne({
        where: { id: ormEntity.id },
      });
      if (existing) {
        await this.ormRepository.update(ormEntity.id, ormEntity);
        const updated = await this.ormRepository.findOne({
          where: { id: ormEntity.id },
        });
        return ProducerMapper.toDomain(updated!);
      }
    }

    const saved = await this.ormRepository.save(ormEntity as ProducerOrmEntity);
    return ProducerMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Producer | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? ProducerMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<Producer[]> {
    const ormEntities = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });
    return ormEntities.map((entity) => ProducerMapper.toDomain(entity));
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Producer | null> {
    const cleaned = cpfCnpj.replace(/\D/g, '');
    const ormEntity = await this.ormRepository.findOne({
      where: { cpf_cnpj: cleaned },
    });
    return ormEntity ? ProducerMapper.toDomain(ormEntity) : null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
