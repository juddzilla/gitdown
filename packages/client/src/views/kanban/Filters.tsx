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
  console.log('groupingOn', groupingOn, list);
  const ordered = all();
  console.log('ordered', ordered);
  const indexOfGroupingOn = ordered.indexOf(groupingOn);
  console.log('indexOfGroupingOn', indexOfGroupingOn);
  if (indexOfGroupingOn > -1) {
    ordered.splice(indexOfGroupingOn, 1);
  }
  console.log('ordered', ordered);

  return (
      <>
        {
          ordered.map((item, index) => {
            console.log('ITEM', item);
            console.log('list[item]', list[item]);
            return (
                <Filter
                    key={index}
                    options={list[item]}
                    property={item}
                    selected={filters[item]}
                    setSelected={onSelect.bind(null, item)}
                    title={item}
                />
            )
          })
        }
      </>
  );
}