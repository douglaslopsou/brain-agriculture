import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateProducerRequestDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor (apenas números ou com formatação)',
    example: '12345678909',
  })
  @IsString({ message: 'CPF/CNPJ deve ser uma string' })
  @IsNotEmpty({ message: 'CPF/CNPJ é obrigatório' })
  cpfCnpj: string;

  @ApiProperty({
    description: 'Nome completo do produtor',
    example: 'João Silva',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;
