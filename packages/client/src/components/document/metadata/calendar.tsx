import { useState } from 'react';
import localeEn from 'air-datepicker/locale/en';

import airdatepicker from './airdatepicker';

import Section from './Section';
import Heading from './Heading';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default ({ property, update, value }) => {
  const getParts = (d) => {
    const nd = new Date(d);
    const DT = nd.getDate();
    const DA = dayName[nd.getDay()];
    const MO = monthNames[nd.getMonth()];

    return { DT, DA, MO };
  };

  let initialShowPicker = false;
  if (!value) {
    initialShowPicker = true;
  }

  const [showPicker, setShowPicker] = useState(initialShowPicker);
  const [dateParts, setDateParts] = useState(getParts(value));

  function toggle() {
    setShowPicker(!showPicker);
  }

  const options = {
    classes: '!border-transparent',
    dateFormat: 'MMMM dd EEEE',
    inline: true,
    locale: localeEn,
    minDate: new Date(),
    onSelect: ({ date, formattedDate }) => {
      if (!formattedDate) {
        update({ [property]: '' });
        return;
      }
      const [MO, DT, DA] = formattedDate.split(' ');
      const selected = new Date(date);
      const selectedMs = selected.getTime();
      update({ [property]: selectedMs});
      setDateParts({ MO, DT, DA });
      toggle();
    },
    selectedDates: [value],
  };

  const singleDateClassList = [
    'font-medium',
    'flex',
    'justify-center',
    'p-2',
    'pb-4'
  ];

  const calendarClassList = ['ml-1'];

  const hide = showPicker ? singleDateClassList : calendarClassList;
  hide.push('hidden')

  return (
      <Section>
        { Heading({
          active: true,
          noToggle: true,
          title: 'Due',
          toggleActive: null,
        }) }
        <div className={ singleDateClassList.join(' ')} onClick={ toggle }>
          <div
              className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
            <div className="block rounded-t overflow-hidden  text-center ">
              <div className="bg-slate-500 text-white py-1">
                { dateParts.MO }
              </div>
              <div className="pt-1 border-l border-r border-white bg-white">
                <span className="text-5xl font-bold leading-tight">
                  { dateParts.DT }
                </span>
              </div>
              <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                <span className="text-sm">
                  { dateParts.DA }
                </span>
              </div>
              <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
              </div>
            </div>
          </div>
        </div>
        <div className={ calendarClassList.join(' ') }>
          { airdatepicker(options) }
        </div>
      </Section>
  );
}
