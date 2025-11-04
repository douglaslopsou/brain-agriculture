import { ApiProperty } from '@nestjs/swagger';

export class ProducerResponseDto {
  @ApiProperty({
    description: 'ID único do produtor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '12345678909',
  })
  cpfCnpj: string;

  @ApiProperty({
    description: 'Nome completo do produtor',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização',
    example: '2024-01-02T00:00:00.000Z',
  })
  updatedAt: Date;
}
