import { Scalar } from '@scalar/hono-api-reference';
import { openAPISpecs } from 'hono-openapi';

import packageJSON from '../../package.json' with { type: 'json' };
import type { createRouter } from './create-router';

export function configureOpenApi(app: ReturnType<typeof createRouter>) {
  app
    .get(
      '/openapi',
      openAPISpecs(app, {
        documentation: {
          info: {
            title: 'API',
            description: 'API Documentation',
            version: packageJSON.version,
          },
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      })
    )
    .get(
      '/docs',
      Scalar({
        url: '/openapi',
        defaultHttpClient: {
          targetKey: 'js',
          clientKey: 'fetch',
        },
      })
    );
}
