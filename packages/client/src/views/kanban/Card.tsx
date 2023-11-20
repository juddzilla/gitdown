import { Link } from 'react-router-dom';

export default ({ data }) => {
  // console.log('CARD', data);
  return (
      <Link className='no-underline' to={`/documents/${data.id}`}>
        <div className='flex items-center p-1'>
          <div className={`w-12 h-12 flex justify-center items-center mr-2 rounded bg-${data.type.replace(' ', '-').toLowerCase()}-primary text-white`}>{ data.type[0] }</div>
          <div>
            <div className='text-xs' >{ data.project || '(no project)'}</div>
            <div className='font-bold'>{ data.title }</div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='w-12 pl-2'>{ data.priority }</div>
          <div className='text-right px-2'>{ data.status }</div>
        </div>

      </Link>
  );
}