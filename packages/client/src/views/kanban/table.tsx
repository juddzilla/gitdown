import { Link } from 'react-router-dom';
export default (data) => {
  return (
      <div className='flex'>
        { data.map((group, index) => (
          <div className='w-72 mr-4 p-2 bg-slate-100' key={index}>
            <div className='font-bold text-xl mb-4 w-full'>
              { group.name || 'none'}
            </div>

            <div className=''>
              { group.results.map((res, i) => (
                  <div className='mb-4 border bg-white border-solid border-white rounded shadow-lg' key={i}>
                    <Link className='no-underline' to={`/documents/${res.id}`}>
                      <div className='flex items-center p-1'>
                        <div className={`w-12 h-12 flex justify-center items-center mr-2 rounded bg-${res.type.replace(' ', '-').toLowerCase()}-primary text-white`}>{ res.type[0] }</div>
                        <div>
                          <div className='text-xs' >{ res.project || '(no project)'}</div>
                          <div className='font-bold'>{ res.title }</div>
                        </div>
                      </div>
                      <div className='text-right px-2'>{ res.status }</div>

                    </Link>
                  </div>

              )) }
            </div>

          </div>
        ))}
      </div>
  )
}