import type { ReactElement } from 'react';
import Icons from './icons';

export default (name): ReactElement => {
  return (
      <span dangerouslySetInnerHTML={{__html: Icons[name] }} />
  );
}