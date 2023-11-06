import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';

const Component = () => {
  return (
      <>
        <div>
          <h1>Project Id</h1>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async ({ params }) => {
    return await API.Project({ name: params.name });
  },
  path: "/projects/:name",
};

export default Route;