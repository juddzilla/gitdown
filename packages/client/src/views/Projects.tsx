import { Link, useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';

const Component = () => {
  const list = useLoaderData();

  return (
      <>
        <div>
          <h1>Projects</h1>
        </div>
        <div>
          Create New:
        </div>
        <div>
          { list.map((item, index) => (
            <div key={index}>
              <Link to={`/projects/${item}`}>
                { item }
              </Link>
            </div>
          ))}
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    return await API.Projects();
  },
  path: "/projects",
};

export default Route;