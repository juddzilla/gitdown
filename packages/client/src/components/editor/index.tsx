import type { ReactElement } from 'react';
import React from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import ExtensionLink from '@tiptap/extension-link';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Icon from './Icon';

import './styles.css';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  // setTimeout(() => {
  //   console.log('JSN');
  //   console.log('');
  //   console.log(editor.getJSON());
  //   console.log('');
  //   console.log('HTML');
  //   console.log('');
  //   console.log(editor.getHTML());
  //   console.log('');
  // }, 5000);

  if (!editor) {
    return null
  }

  interface ButtonConfig {
    classList?: String[],
    disabled?: String,
    icon: String,
    key: Number,
    onClick: Function,
  }

  const configureButton = (config: ButtonConfig): ReactElement => {
    const classList = [
      'border-2',
      'border-black',
      'm-1',
      'p-2',
      'rounded',
    ];

    if (Object.hasOwn(config, 'classList')) {
      classList.push(...config.classList);
    }

    let disabled: Boolean = false;

    if (Object.hasOwn(config, 'disabled')) {
        disabled = config.disabled;
    }

    return (
        <span className="h-11 w-11 flex items-center justify-center inline-block mr-1">
          <button
              className={ classList.join(' ') }
              onClick={ config.onClick }
              disabled={ disabled }
              key={ config.key }
          >
            { Icon(config.icon, ) }
          </button>
        </span>
    );
  }

  const buttonCanToggleDisable = ({ icon, property }, index): ReactElement => {
    const capitalized = property.charAt(0).toUpperCase() + property.slice(1);
    const methodName = `toggle${capitalized}`;

    const onClick = () => (editor.chain().focus()[methodName]().run());

    const disabled = !editor.can()
        .chain()
        .focus()
        [methodName]()
        .run();

    const classList = [];

    if (editor.isActive(property)) {
      classList.push('is-active', 'border-4');
    }

    const config = {
      classList,
      disabled,
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const createHeadingButton = (level, index) => {
    const onClick = () => editor.chain().focus().toggleHeading({ level }).run();

    const classList = [];

    if (editor.isActive('heading', { level })) {
      classList.push('is-active', 'border-4');
    }

    const config = {
      classList,
      icon: `H${level}`,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const createSnakeButton = ({ icon, property }, index) => {
    const lowercased = property.charAt(0).toLowerCase() + property.slice(1);
    const methodName = `toggle${property}`;

    const onClick = () => editor.chain().focus()[methodName]().run();

    const classList = [];

    if (editor.isActive(lowercased)) {
      classList.push('is-active', 'border-4');
    }

    const config = {
      classList,
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const createSetSnakeCase = ({ icon, property }, index) => {
    const methodName = `set${property}`;

    const onClick = () => editor.chain().focus()[methodName]().run();

    const config = {
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const createSetSnakeCaseCanDisable = ({ icon, property }, index) => {
    const capitalized = property.charAt(0).toUpperCase() + property.slice(1);
    const methodName = `set${capitalized}`;

    const onClick = () => editor.chain().focus()[methodName]().run();

    const classList = [];

    if (editor.isActive(property)) {
      classList.push('is-active', 'border-4');
    }

    const config = {
      classList,
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const createActionButton = ({ icon, property }, index) => {
    const onClick = () => editor.chain().focus()[property]().run();
    const disabled = !editor.can()
        .chain()
        .focus()
        [property]()
        .run();

    const config = {
      disabled,
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const canToggle = [
    { property: 'bold', icon: 'BO' },
    { property: 'italic', icon: 'IT' },
    { property: 'strike', icon: 'ST' },
    { property: 'code', icon: 'CD' },
  ].map(buttonCanToggleDisable);

  const clearing = [{ property: 'unsetAllMarks', icon: 'FC' }].map((data, index) => {
    const onClick = () => {
      editor.chain().focus().clearNodes().unsetAllMarks().run();
    };
    const config = {
      icon: data.icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  });

  const link = [{ property: 'link', icon: 'LI'}]
      .map((data, index) => {
        const onClick = () => {
          const { from, to, empty } = editor.state.selection;

          if (empty) {
            return null;
          }

          const selection = editor.state.doc.textBetween(from, to, ' ');
          editor.commands.toggleLink({ href: selection })
        };

        const config = {
          icon: data.icon,
          key: index,
          onClick,
        } as ButtonConfig;

        return configureButton(config);
      });

  const paragraph = [{ property: 'paragraph', icon: 'PP' }].map(createSetSnakeCaseCanDisable);

  const headings = [2,3,4].map(createHeadingButton);

  const lists = [
    { property: 'BulletList', icon: 'BL' },
    { property: 'OrderedList', icon: 'OL' },
    { property: 'CodeBlock', icon: 'CB' },
    { property: 'Blockquote', icon: 'BQ' },
  ].map(createSnakeButton);

  const breaks = [
    { property: 'HardBreak', icon: 'HB' },
  ].map(createSetSnakeCase);

  const actions = [
    { property: 'undo', icon: 'UN' },
    { property: 'redo', icon: 'RD' },
  ].map(createActionButton);

  return (
      <>
        <div className="h-11 mb-1 flex items-center">
          <span className=" flex">
            { canToggle  }
            { link }
          </span>

          <span className="flex">
            { headings }
          </span>
          <span className="flex">
            { paragraph }
            { lists }

          </span>


        </div>

        <div className="h-11 mb-1 flex items-center">
          <span className="flex">
            { breaks }
            { clearing }
          </span>

          { actions }
        </div>
      </>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  ExtensionLink.configure()
]

const content = `
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

export default () => {
  return (
      <EditorProvider
          content={content}
          slotBefore={ <MenuBar /> }
          extensions={extensions}
      />
  )
}