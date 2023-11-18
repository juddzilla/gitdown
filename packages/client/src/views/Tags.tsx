import { Link, useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';

const Component = () => {
  const list = useLoaderData();

  return (
      <>
        <div>
          <h1>Tags</h1>
        </div>
        <div>
          { list.map((item, index) => (
              <div key={index}>
                <Link to={`/tags/${item}`}>
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
    return await API.Tags();
  },
  path: "/tags",
};

export default Route;