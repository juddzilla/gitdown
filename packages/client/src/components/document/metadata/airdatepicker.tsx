import AirDatepicker from 'air-datepicker';
import "air-datepicker/air-datepicker.css";

import React, { useEffect, useRef } from "react";

function airDatepicker(props) {
  let $input = useRef();
  let dp = useRef();

  useEffect(() => {
    const elementId = '#datepicker';
    const element = document.querySelector(elementId);

      if (!element.hasChildNodes()) {
        dp.current = new AirDatepicker($input.current, { ...props });
      }
  }, []);

  useEffect(() => {
    dp.current.update({ ...props });
  }, [props]);

  return <div
      className='relative -left-4'
      id="datepicker"
      ref={$input}
      style={{"--adp-border-color-inline": 'transparent' }}
  />;
}

export default airDatepicker;
