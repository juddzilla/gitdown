import Routes from './routes';
import PreHandlers from './preHandlers';

export default async function(app) {
  try {
    const routes = await Routes();
    await routes.forEach((config) => {
      if (config) {

        // const { method, handler, path } = config;
        const preHandler = PreHandlers[config.method.toUpperCase()];

        // const route = {
        //   ...config,
        //   handler,
        //   preHandler,
        // };
        app.route({ ...config, preHandler });
      }
    });
  } catch (err) {
    console.warn('ERR', err);
  }
};
