import Routes from './routes';

export default async function(app) {
  const routes = await Routes();
  await routes.forEach((route) => {
    if (route) {
      const { method, handler, path } = route;

      app[method](path, handler);
    }
  });
};
