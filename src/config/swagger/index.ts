import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('NAME', ''))
    .setDescription(configService.get<string>('DESCRIPTION', ''))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const path = configService.get<string>('SWAGGER_PATH', '/swagger');
  SwaggerModule.setup(path, app, document);
  logger.log(`You can view Swagger by reaching path /${path}`);
}
