import { Link } from 'react-router-dom';
import Icons from '../../components/Icons';
export default ({ data }) => {
  // console.log('CARD', data);
  const classList = [
    'bg-white',
    'border',
    'border-transparent',
    'mb-6',
    'p-2',
    'rounded',
    'shadow-md',
    'hover:shadow-2xl',
    'hover:border-slate-200',
  ];
  // let shadow = 'border border-slate-200 ';
  // switch (data.priority) {
  //   case 'Highest':
  //     shadow += 'shadow-2xl border-slate-300';
  //     break;
  //   case 'High':
  //     shadow += 'shadow-xl';
  //     break;
  //   case 'Normal':
  //     shadow = 'shadow-lg';
  //     break;
  //   default:
  //     shadow = 'shadow-md';
  // }
  // classList.push(shadow);
  return (
      <div className={ classList.join(' ') }>
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
            { data.users.length &&
                <div className='flex items-center border'>
                { Icons('users', ['stroke-black', 'mr-2']) }
                  <span>{ data.users.length } </span>
                </div>
            }
            { data.tags.length &&
                <div className='flex items-center border'>
                  { Icons('tag', ['stroke-black', 'mr-2']) }
                  <span>{ data.tags.length } </span>
                </div>
            }
            <div className='text-right px-2'>{ data.status }</div>
          </div>
        </Link>
      </div>
  );
}