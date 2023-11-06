import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';

const Component = () => {
  const documents = useLoaderData();

  return (
      <>
        <div>
          <h1>Documents</h1>
        </div>
        <div>
          { documents.map((document, index) => (
              <div key={index}>
                <Link to={`${document.id}`}>
                  { document.title || 'Untitled'}
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
    const request = await API.Documents();
    return request;
  },
  path: "/documents",
};

export default Route;