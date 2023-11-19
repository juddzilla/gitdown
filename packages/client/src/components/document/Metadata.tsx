import type { ReactElement } from 'react';

import MetadataSelection from './metadata/container';
import Calendar from './metadata/calendar';

export default (params): ReactElement => {
  const { list, metadata, update } = params;


  function onChoice(selection) {
    update({ ...metadata, ...selection });
  }

  return (
      <div className="">
        { ['bug', 'task'].includes(metadata.type.toLowerCase()) &&
            <>
              { Calendar({
                property: 'due',
                update: onChoice,
                value: metadata.due,
              }) }

              { <MetadataSelection
                  display={ 'Priority' }
                  options={ list.priorities }
                  property={ 'priority' }
                  selected={ metadata.priority }
                  setSelected={ onChoice }
                  title={ 'Priority' }
              /> }
            </>
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
