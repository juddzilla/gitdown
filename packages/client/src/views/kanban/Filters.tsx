import Filter from './filter';
const all = () => ([
  'statuses',
  'priorities',
  'projects',
  'tags',
  'types',
  'users',
]);

export default ({ filters, groupingOn, list, onSelect }) => {
  const ordered = all();
  const indexOfGroupingOn = ordered.indexOf(groupingOn);
  if (indexOfGroupingOn > -1) {
    ordered.splice(indexOfGroupingOn, 1);
  }
  return (
      <>
        {
          ordered.map((item, index) => {
            return (
                <span key={ item }>
                  <Filter
                      options={list[item]}
                      property={item}
                      selected={filters[item]}
                      setSelected={onSelect.bind(null, item)}
                      title={item}
                  />
                </span>
            )
          })
        }
      </>
  );
}