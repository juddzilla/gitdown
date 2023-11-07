import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';

const Component = () => {
  const tags = useLoaderData();
  return (
      <>
        <div>
          <h1>Tags</h1>
        </div>
        <div>
          <Link to='/create/tag'>Create</Link>
        </div>
        <div>
          { tags.map((tag, index) => (
              <div key={index}>
                <Link to={`/tags/${tag}`}>
                  { tag }
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