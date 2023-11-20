import API from '../interfaces/host';

import Document from '../components/document/Document';

const onSave = async ({ content, metadata }) => {
  try {
    return await API.DocumentCreate({
      html: content,
      metadata
    });
  } catch (err) {
    console.warn('SAVE RR', err);
    return { err };
  }
};

export default {
  path: "/document/create",
  loader: async ({ request }) => {
    const project = new URL(request.url).searchParams.get('project');
    const type = new URL(request.url).searchParams.get('type');

    return await API.DocumentPreCreate({ project, type });
  },
  element: <Document onSave={ onSave } />
};
