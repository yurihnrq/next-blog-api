import swaggerJsDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next Blog REST API Documentation',
    version: '1.0.0',
    description:
      'REST API developed with Node.js and Express for the Next Blog project.'
  }
};

const options: Options = {
  swaggerDefinition,
  apis: [
    'src/routers/*.ts',
    'src/modules/**/interfaces/*.ts',
    'src/modules/**/schemas/*.ts',
    'src/types/global.d.ts',
    'src/configs/app.ts'
  ]
};

const swaggerSpec = swaggerJsDoc(options);

export const swagger = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerSpec)
};
