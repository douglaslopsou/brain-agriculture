import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProducerUseCase } from '../../application/producers/use-cases/create-producer.use-case';
import { GetProducerUseCase } from '../../application/producers/use-cases/get-producer.use-case';
import { ListProducersUseCase } from '../../application/producers/use-cases/list-producers.use-case';
import { UpdateProducerUseCase } from '../../application/producers/use-cases/update-producer.use-case';
import { DeleteProducerUseCase } from '../../application/producers/use-cases/delete-producer.use-case';
import { CreateProducerRequestDto } from './dto/create-producer-request.dto';
import { UpdateProducerRequestDto } from './dto/update-producer-request.dto';
import { ProducerResponseDto } from './dto/producer-response.dto';

@ApiTags('producers')
@Controller('producers')
export class ProducersController {
  constructor(
    private readonly createProducerUseCase: CreateProducerUseCase,
    private readonly getProducerUseCase: GetProducerUseCase,
    private readonly listProducersUseCase: ListProducersUseCase,
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo produtor rural' })
  @ApiBody({ type: CreateProducerRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Produtor criado com sucesso',
    type: ProducerResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou CPF/CNPJ já cadastrado',
  })
  async create(
    @Body() createDto: CreateProducerRequestDto,
  ): Promise<ProducerResponseDto> {
    return await this.createProducerUseCase.execute({
      cpfCnpj: createDto.cpfCnpj,
      name: createDto.name,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtores rurais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtores',
    type: [ProducerResponseDto],
  })
  async findAll(): Promise<ProducerResponseDto[]> {
    return await this.listProducersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produtor rural por ID' })
  @ApiParam({ name: 'id', description: 'ID do produtor', type: String })
  @ApiResponse({
    status: 200,
    description: 'Produtor encontrado',
    type: ProducerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async findOne(@Param('id') id: string): Promise<ProducerResponseDto> {
    return await this.getProducerUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produtor rural' })
  @ApiParam({ name: 'id', description: 'ID do produtor', type: String })
  @ApiBody({ type: UpdateProducerRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Produtor atualizado com sucesso',
    type: ProducerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou CPF/CNPJ já cadastrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProducerRequestDto,
  ): Promise<ProducerResponseDto> {
    return await this.updateProducerUseCase.execute(id, {
      cpfCnpj: updateDto.cpfCnpj,
      name: updateDto.name,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um produtor rural' })
  @ApiParam({ name: 'id', description: 'ID do produtor', type: String })
  @ApiResponse({
    status: 204,
    description: 'Produtor deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProducerUseCase.execute(id);
  }
}
