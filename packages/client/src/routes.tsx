import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import CreateDocument from './views/document/Create';
import Document from './views/Document';
import Documents from './views/Documents';
import Home from './views/Home';
import Kanban from './views/Kanban';
import Project from './views/Project';
import Projects from './views/Projects';
import Tag from './views/Tag';
import Tags from './views/Tags';
import User from './views/User';

const routes = {
  element: <App />,
  children: [
    CreateDocument,
    Document,
    Documents,
    Home,
    Kanban,
    Project,
    Projects,
    Tag,
    Tags,
    User,
  ],
};

export default createBrowserRouter([routes]);