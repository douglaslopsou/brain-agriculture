import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Brain Agriculture API')
    .setDescription('API para gestão de produtores rurais, fazendas e culturas')
    .setVersion('1.0')
    .addTag('producers', 'Gerenciamento de produtores rurais')
    .addTag('farms', 'Gerenciamento de fazendas')
    .addTag('crops', 'Gerenciamento de culturas')
    .addTag('harvests', 'Gerenciamento de safras')
    .addTag('farm-crops', 'Associação de culturas com fazendas')
    .addTag('dashboard', 'Estatísticas e gráficos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
