import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateProducerRequestDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor (apenas números ou com formatação)',
    example: '12345678909',
    required: false,
  })
  @IsString()
  @IsOptional()
  cpfCnpj?: string;

  @ApiProperty({
    description: 'Nome completo do produtor',
    example: 'João Santos',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}

