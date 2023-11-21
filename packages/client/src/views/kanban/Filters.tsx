import Filter from './filter';
export default ({ filters, groupingOn, list, onSelect }) => {
  const ordered = [
    'statuses',
    'priorities',
    'projects',
    'tags',
    'types',
    'users',
  ];

  const indexOfGroupingOn = ordered.indexOf(groupingOn);
  if (indexOfGroupingOn > -1) {
    ordered.splice(indexOfGroupingOn, 1);
  }

  return (
      <>
        {
          ordered.map((item, index) => (
              <Filter
                key={ index }
                options={ list[item] }
                property={ item }
                selected={ filters[item] }
                setSelected={ onSelect.bind(null, item) }
                title={ item }
              />
          ))
        }
      </>
  );
}