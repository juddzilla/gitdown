import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';

import DocumentsTable from '../components/documents-table';

const Component = () => {
  const documents = useLoaderData();
  console.log('documents', documents);
  return (
      <>
        <div>
          <h1>Documents</h1>
        </div>
        <div>
          <Link to='/create/document'>Create</Link>
        </div>
        <div>
          {/*{ documents.map((document, index) => (*/}
          {/*    <div key={index}>*/}
          {/*      <Link to={`${document.id}`}>*/}
          {/*        { document.title || 'Untitled'}*/}
          {/*      </Link>*/}
          {/*    </div>*/}
          {/*))}*/}
          { DocumentsTable(documents) }
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