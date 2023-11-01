import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Document from './views/Document';
import Documents from './views/Documents';
import Home from './views/Home';
import Kanban from './views/Kanban';
import Project from './views/Project';
import Projects from './views/Projects';
import User from './views/User';
import Users from './views/Users';

const routes = {
  element: <App />,
  children: [
    Document,
    Documents,
    Home,
    Kanban,
    Project,
    Projects,
    User,
    Users,
  ],
};

export default createBrowserRouter([routes]);