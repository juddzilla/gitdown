export default (props) => {
  const classList = [
    'tooltip-display',
    'flex',
    'items-center',
    'rounded-lg'
  ];

  return (
      <div className={ classList.join(' ') }>{ props.children }</div>
  )
}