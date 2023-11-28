import type { ReactElement } from 'react';

import MultiSelect from './metadata/multi-select';
import SingleSelect from './metadata/single-select';
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

              {  }
            </>
        }

        <SingleSelect
            display={ 'Priority' }
            options={ list.priorities }
            property={ 'priority' }
            selected={ metadata.priority }
            setSelected={ onChoice }
            title={ 'Priority' }
        />

        <SingleSelect
            display={ 'Status' }
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
      </div>
  );
}
