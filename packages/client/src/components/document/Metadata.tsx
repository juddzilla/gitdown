import type { ReactElement } from 'react';

import Haading from './metadata/Heading';
import MetadataSelection from './metadata/container';
import Calendar from './metadata/calendar';
import Section from './metadata/Section';
import Heading from "./metadata/Heading";

export default (params): ReactElement => {
  const { list, metadata, update } = params;

  function onChoice(selection) {
    update({ ...metadata, ...selection });
  }

  return (
      <div className="">
        { ['Bug', 'Task'].includes(metadata.type) &&
            Calendar({
              property: 'due',
              update: onChoice,
              value: metadata.due,
            })
        }

            <MetadataSelection
                display={ 'Status' }
                options={ list.statuses }
                property={ 'status' }
                selected={ metadata.status }
                setSelected={ onChoice }
                title={ 'Status' }
            />

        {   MetadataSelection({
              allowCreate: true,
              display: 'Tag',
              multi: true,
              options: list.tags,
              property: 'tags',
              selected: metadata.tags,
              setSelected: onChoice,
              title: 'Tags',
            })
          }

          {
            MetadataSelection({
              display: 'User',
              multi: true,
              options: list.users,
              property: 'users',
              selected: metadata.users,
              setSelected: onChoice,
              title: 'Users',
            })
          }
      </div>
  );
}
