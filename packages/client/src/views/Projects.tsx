import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';

const Component = () => {
  const projects = useLoaderData();
  return (
      <>
        <div>
          <h1>Projects</h1>
        </div>
        <div>
          { projects.map((project, index) => (
            <div key={index}>
              <Link to={`/projects/${project}`}>
                { project }
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