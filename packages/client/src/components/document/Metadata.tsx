import type { ReactElement } from 'react';

import MultiSelect from './metadata/multi-select';
import SingleSelect from './metadata/single-select';
import Calendar from './metadata/calendar';

export default (params): ReactElement => {
  const { list, metadata, update } = params;


  function onChoice(selection) {
    console.log('selection', selection);
    update({ ...metadata, ...selection });
  }

  return (
      <>
        { ['bug', 'task'].includes(metadata.type.toLowerCase()) &&
            <>
              { Calendar({
                property: 'due',
                update: onChoice,
                value: metadata.due,
              }) }

              {  }
            </>
        }

        <SingleSelect
            options={ list.priorities }
            property={ 'priority' }
            selected={ metadata.priority }
            setSelected={ onChoice }
            title={ 'Priority' }
        />

        <SingleSelect
            options={ list.statuses }
            property={ 'status' }
            selected={ metadata.status }
            setSelected={ onChoice }
            title={ 'Status' }
        />

        {   MultiSelect({
              allowCreate: true,
              display: 'Tag',
              options: list.tags,
              property: 'tags',
              selected: metadata.tags,
              setSelected: onChoice,
              title: 'Tags',
            })
          }

          {
            MultiSelect({
              display: 'User',
              options: list.users,
              property: 'users',
              selected: metadata.users,
              setSelected: onChoice,
              title: 'Users',
            })
          }
      </>
  );
}
