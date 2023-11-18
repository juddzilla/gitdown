import { useLoaderData } from 'react-router-dom';
import API from '../interfaces/host';

const Component = () => {
  const data = useLoaderData();
  return (
      <>
        <div>
          <h1>Home</h1>
          <div>
            <ul>
              <li>Open Tasks</li>
            </ul>
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: () => API.Home(),
  path: "/",
};

export default Route;