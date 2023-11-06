import type { ReactElement } from 'react';

import IconMap from './icons/icons';
import './icons/styles.css';

export default (name: string, classList?: string | string[]): ReactElement => {
  let classNames = '';
  if (classList) {
    if (typeof classList === 'string') {
      classNames = classList;
    } else {
      classNames = classList.join(' ');
    }
  }
  return (
      <svg className={classNames} width="32px" height="32px" viewBox="0 0 24 24" strokeWidth="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" dangerouslySetInnerHTML={{__html: IconMap(name)}} />
  );
}