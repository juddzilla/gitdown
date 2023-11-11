import Fastify from 'fastify';
import cors from '@fastify/cors';

import Routing from './routing/index.js';

const fastify = Fastify({ logger: true });
fastify.register(cors, { origin: true, credentials: true });

export default async function({ port, host }) {
  await Routing(fastify);

  fastify.listen({ port, host }, (err) => {
    if (err) { throw err; }
    console.log('APP SERVER ADDRESS', fastify.server.address()); // eslint-disable-line
    console.log('Server listening on :', host, port || fastify.server.address().port); // eslint-disable-line
  });

  return fastify;
}
