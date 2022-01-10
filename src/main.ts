import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { getCompleteUrlPath } from './utils';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

export let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Dashboard Epitech api example')
    .setLicense('MIT', "https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt")    
    .setDescription('The Dashboard Epitech API description')
    .setVersion('1.0')
    .addTag('Dashboard Epitech')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT || 8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log("App launched at " + await getCompleteUrlPath());

}
bootstrap();
