import { useState } from 'react';
import type { ReactElement } from 'react';
import { useLoaderData } from 'react-router-dom';

import API from '../../../interfaces/host';
import Metadata from './metadata';

import WYSIWYG from '../../../components/editor';

const testcontent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const Component = (): ReactElement => {
  const data = useLoaderData();
  const [metadata, setMetadata] = useState({
    title: '',
    project: '',
    tags: [],
    users: [],
    type: '',
    priority: '',
    status: '',
  });
  const [content, setContent] = useState(testcontent);

  const save = () => {
    console.log('SAVE');
    console.log('content', content);
    console.log('metadata', metadata);
  };

  function titleChange({ target }) {
    setMetadata({ ...metadata, title: target.value });
  }

  return (
      <>
        <div className="">
          <div className='w-full text-sm uppercase mb-2 mt-1'>Create Document</div>

          <div className='flex'>
            <div className="bg-slate-50 p-6">
              <div className="max-w-prose">
                <div className='mb-6'>
                   <input
                       className='outline-none text-4xl p-2 bg-transparent w-full font-extrabold border-b-2 border-slate-800 border-solid'
                       onChange={ titleChange }
                       placeholder='Title'
                       type="text"
                       value={metadata.title}
                   />
                </div>
                <WYSIWYG content={ content } update={ setContent }/>
              </div>
            </div>

            <Metadata
                metadata={ metadata }
                save={ save }
                update={ setMetadata }
            />
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    return await API.Lists();
  },
  path: "/create/document",
};

export default Route;