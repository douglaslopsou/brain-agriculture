import { Producer } from '../entities/producer.entity';

export interface IProducerRepository {
  save(producer: Producer): Promise<Producer>;
  findById(id: string): Promise<Producer | null>;
  findAll(): Promise<Producer[]>;
  findByCpfCnpj(cpfCnpj: string): Promise<Producer | null>;
  delete(id: string): Promise<void>;
}
