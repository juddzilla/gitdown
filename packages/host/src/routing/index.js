import Routes from './routes';

export default async function(app) {
  try {
    const routes = await Routes();
    console.log('routes', routes);
    await routes.forEach((route) => {
      if (route) {
        const { method, handler, path } = route;

        app[method](path, handler);
      }
    });
  } catch (err) {
    console.warn('ERR', err);
  }
};
