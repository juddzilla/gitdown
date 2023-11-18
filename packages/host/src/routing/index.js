import Routes from './routes';
import PreHandlers from './preHandlers';

export default async function(app) {
  try {
    const routes = await Routes();
    await routes.forEach((config) => {
      if (config) {

        const preHandler = PreHandlers[config.method.toUpperCase()];
        app.route({ ...config, preHandler });
      }
    });
  } catch (err) {
    console.warn('ERR', err);
  }
};
