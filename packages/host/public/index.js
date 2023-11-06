// import { readFile } from 'fs/promises';
import PublicHostRoutes from './paths.json' assert { type: 'json' };
// const PublicHostRoutes = JSON.parse(await readFile(new URL('./paths.json', import.meta.url)));
const HostPaths = Object.keys(PublicHostRoutes);

const index = async (url, opts) => {
  const options = {
    credentials: 'include',
    ...opts,
  };
  try {
    const req = await fetch(url, options);
    return await req.json();
  } catch (error) {
    return { error };
  }
};

const Fetch = {
  DELETE: (url) => index(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }),
  GET: (url) => index(url),
  POST: (url, data) => index(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }),
  PUT: (url, data) => index(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }),
};

export default function API(hostUrl) {
  const withBodyData = ({ data, path, search }) => {
    let target = path;
    const query = !search ? null : new URLSearchParams(search).toString();
    const body = !data ? null : Object.keys(data).reduce((acc, key) => {
      const param = `:${key}`;
      if (path.includes(param)) {
        target = target.replace(param, data[key]);
      } else {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    return {
      body: JSON.stringify(body),
      query,
      url: [hostUrl, target].join(''),
    };
  };

  const withUrlParamsData = ({ path, search }) => {
    let target = path;
    const params = !search ? null : Object.keys(search).reduce((acc, key) => {
      const param = `:${key}`;
      if (path.includes(param)) {
        target = target.replace(param, search[key]);
      } else {
        acc[key] = search[key];
      }
      return acc;
    }, {});

    const query = !params ? null : new URLSearchParams(params).toString();

    return {
      query,
      url: [hostUrl, target].join(''),
    };
  };

  const withBody = (route, data) => {
    const { method, path } = route;
    const config = withBodyData({ path, data });
    const { body, url } = config;
    return Fetch[method.toUpperCase()](url, body);
  };

  const withUrlParams = (route, search) => {
    const { method, path } = route;
    const config = withUrlParamsData({ path, search });
    const { query, url } = config;
    const uri = query ? [url, query].join('?') : url;
    return Fetch[method.toUpperCase()](uri);
  };

  const methodMap = {
    DELETE: withUrlParams,
    GET: withUrlParams,
    POST: withBody,
    PUT: withBody,
  };

  return HostPaths.reduce((acc, key) => {
    const route = PublicHostRoutes[key];
    acc[key] = methodMap[route.method.toUpperCase()].bind(null, route);
    return acc;
  }, {});
};