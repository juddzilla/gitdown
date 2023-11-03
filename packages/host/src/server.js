import Fastify from 'fastify';
import cors from '@fastify/cors';

import Routing from './routing/index.js';

const fastify = Fastify({ logger: true });

export default async function({ port }) {
  fastify.register(cors, {
    origin: (origin, cb) => {
      const { hostname } = new URL(origin);
      if (hostname === 'localhost') {
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'));
    },
  });

  await Routing(fastify);

  fastify.listen(port, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });

  return fastify;
}
