import type { ReactElement } from 'react';
import React from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import ExtensionLink from '@tiptap/extension-link';
import {
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Icon from './Icon';

import './styles.css';

const MenuBar = (params) => {
  const { editor } = params;
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
      'bg-white',
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
        <span
          className="h-10 w-10 flex items-center justify-center inline-block mr-1"
          key={ config.key }
        >
          <button
              className={ classList.join(' ') }
              onClick={ config.onClick }
              disabled={ disabled }

          >
            { Icon(config.icon, ) }
          </button>
        </span>
    );
  };

  const MenuButton = (data, index) => {
    const { disabled, icon, isActive, method } = data;
    const onClick = () => editor.chain().focus()[method]().run();
    const classList = [];
    let toDisable = false;

    if (Object.hasOwn(data, 'disabled')) {
      toDisable = !editor.can()
          .chain()
          .focus()
          [disabled]()
          .run();
    }

    if (Object.hasOwn(data, 'isActive') && editor.isActive(isActive)) {
      classList.push('is-active', 'border-4');
    }

    const config = {
      classList,
      disabled: toDisable,
      icon,
      key: index,
      onClick,
    } as ButtonConfig;

    return configureButton(config);
  };

  const MenuButtonHeading = (level, index) => {
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

  // const actions = [
  //   { disabled: 'undo', method: 'undo', icon: 'UN' },
  //   { disabled: 'redo', method: 'redo', icon: 'RD' },
  // ].map(MenuButton);

  // const clearing = [{ property: 'unsetAllMarks', icon: 'FC' }].map((data, index) => {
  //   const onClick = () => {
  //     editor.chain().focus().clearNodes().unsetAllMarks().run();
  //   };
  //   const config = {
  //     icon: data.icon,
  //     key: index,
  //     onClick,
  //   } as ButtonConfig;
  //
  //   return configureButton(config);
  // });
  const codes = [
    { disabled: 'toggleCode', icon: 'CD', isActive: 'code', method: 'toggleCode'},
    { icon: 'CB', isActive: 'codeBlock', method: 'toggleCodeBlock' },
  ].map(MenuButton);

  const headings = [2,3,4].map(MenuButtonHeading);

  const link = [{ property: 'link', icon: 'LI'}].map((data, index) => {
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

  const textFormat = [
    { icon: 'PP', isActive: 'paragraph', method: 'setParagraph'},
    { icon: 'BL', isActive: 'bulletList', method: 'toggleBulletList' },
    { icon: 'OL', isActive: 'orderedList', method: 'toggleOrderedList' },
    { icon: 'BQ', isActive: 'blockquote', method: 'toggleBlockquote' },
    { icon: 'HB', method: 'setHardBreak' },
  ].map(MenuButton);

  const textStyle = [
    { disabled: 'toggleBold', icon: 'BO', isActive: 'bold', method: 'toggleBold', property: 'bold' },
    { disabled: 'toggleItalic', icon: 'IT', isActive: 'italic', method: 'toggleItalic', property: 'italic' },
    { disabled: 'toggleStrike', icon: 'ST', isActive: 'strike', method: 'toggleStrike', property: 'strike' },
  ].map(MenuButton);

  return (
      <div className='px-2 py-3 rounded'>
        <div className="h-11 flex items-center justify-center">
          { textStyle }
          { link }
          { headings }
          { textFormat }
          { codes }
        </div>
      </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  ExtensionLink.configure(),
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
  TextStyle.configure({ types: [ListItem.name] }),
];
export default ({ content, update }) => {
  const editor = useEditor({
    editable: true,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      update(editor.getHTML());
    },
  });

  return (
      <div className='bg-slate-50'>
        <MenuBar editor={ editor }/>
        <div className='px-6 py-4'>
          <EditorContent editor={editor} />
        </div>
      </div>
  );
};