import { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-datepicker/dist/react-datepicker.css';

const Daypicker = props => {
  const [finalDay, setFinalDay] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const fiveDaysAway = new Date();
    fiveDaysAway.setDate(today.getDate() + 4);
    setFinalDay(fiveDaysAway);
  }, []);

  return (
    <DatePicker
      value={props.selectedDate}
      onChange={props.setSelectedDate}
      minDate={new Date()}
      maxDate={finalDay}
    />
  );
};

export default Daypicker;
