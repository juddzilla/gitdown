import API from '../interfaces/host';

import Document from '../components/document/Document';

const onSave = async ({ content, metadata }) => {
  try {
    return await API.DocumentUpdate({
      id: metadata.id,
      html: content,
      metadata
    });
  } catch (err) {
    console.warn('SAVE RR', err);
    return { err };
  }
};

export default {
  path: "/documents/:id",
  loader: async ({ params }) => {
    const list = await API.Lists();
    const data = await API.DocumentById({ id: params.id });
    return { ...data, list };
  },
  element: <Document onSave={ onSave } />
};
