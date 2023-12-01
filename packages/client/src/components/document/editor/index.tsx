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
      <>
        <div className='px-2 py-3 rounded'>
          <div className="h-11 flex items-center justify-center">
            { textStyle }
            { link }
            { headings }
            { textFormat }
            { codes }
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
          <div id="hs-editor-tiptap">
            <div
                className="flex align-middle gap-x-0.5 border-b border-gray-200 p-2 dark:border-gray-700">
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-bold>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 12a4 4 0 0 0 0-8H6v8"/>
                  <path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-italic>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" x2="10" y1="4" y2="4"/>
                  <line x1="14" x2="5" y1="20" y2="20"/>
                  <line x1="15" x2="9" y1="4" y2="20"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-underline>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
                  <line x1="4" x2="20" y1="20" y2="20"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-strike>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4H9a3 3 0 0 0-2.83 4"/>
                  <path d="M14 12a4 4 0 0 1 0 8H6"/>
                  <line x1="4" x2="20" y1="12" y2="12"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-link>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-ol>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="10" x2="21" y1="6" y2="6"/>
                  <line x1="10" x2="21" y1="12" y2="12"/>
                  <line x1="10" x2="21" y1="18" y2="18"/>
                  <path d="M4 6h1v4"/>
                  <path d="M4 10h2"/>
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-ul>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="8" x2="21" y1="6" y2="6"/>
                  <line x1="8" x2="21" y1="12" y2="12"/>
                  <line x1="8" x2="21" y1="18" y2="18"/>
                  <line x1="3" x2="3.01" y1="6" y2="6"/>
                  <line x1="3" x2="3.01" y1="12" y2="12"/>
                  <line x1="3" x2="3.01" y1="18" y2="18"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-blockquote>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 6H3"/>
                  <path d="M21 12H8"/>
                  <path d="M21 18H8"/>
                  <path d="M3 12v6"/>
                </svg>
              </button>
              <button
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button" data-hs-editor-code>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 16 4-4-4-4"/>
                  <path d="m6 8-4 4 4 4"/>
                  <path d="m14.5 4-5 16"/>
                </svg>
              </button>
            </div>

            <div data-hs-editor-field></div>
          </div>
        </div>
      </>
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
      <div className=''>
        <MenuBar editor={ editor }/>
        <div className='py-4'>
          <EditorContent editor={editor} />
        </div>
      </div>
  );
};

