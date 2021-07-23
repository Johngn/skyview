import { useState, useEffect } from 'react';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import AutoCompleteContainer from './components/AutoCompleteContainer';
import Chart from './components/Chart';
import Daypicker from './components/Daypicker';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorModal from './components/ErrorModal';
import StyledContainer from './components/StyledContainer';
import Introduction from './components/Introduction';

import './App.css';
import './datepickercustomstyles.css';

const App = () => {
  const [enteredAddress, setEnteredAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [forecastTimes, setForecastTimes] = useState([]);
  const [cloudArray, setCloudArray] = useState([]);
  const [humidityArray, setHumidityArray] = useState([]);
  const [windArray, setWindArray] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (enteredAddress.length > 10) {
      setLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        )
        .then(response => {
          selectedDate.setHours(23, 0, 0, 0);

          const weatherTonight = response.data.list.filter(
            (weathersingle: any) => {
              return (
                new Date(weathersingle.dt * 1000).getTime() >=
                  selectedDate.getTime() - 3600000 * 6 &&
                new Date(weathersingle.dt * 1000).getTime() <=
                  selectedDate.getTime() + 3600000 * 12
              );
            }
          );

          setForecastTimes(
            weatherTonight.map((hr: any) => hr.dt_txt.substring(11, 16))
          );
          setCloudArray(weatherTonight.map((hr: any) => hr.clouds.all));
          setHumidityArray(weatherTonight.map((hr: any) => hr.main.humidity));
          setWindArray(weatherTonight.map((hr: any) => hr.wind.speed));

          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });

      return setLoading(true);
    }
  }, [lat, lng, selectedDate]);

  const onAddressChangeHandler = (enteredAddress: string) => {
    setEnteredAddress(enteredAddress);
  };

  const onAddressSelectHandler = () => {
    geocodeByAddress(enteredAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLat(latLng.lat);
        setLng(latLng.lng);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const inputProps = {
    value: enteredAddress,
    placeholder: 'Search Location',
    onChange: onAddressChangeHandler,
    onSelect: onAddressSelectHandler,
    autoFocus: true,
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      {loading && <LoadingSpinner />}

      <StyledContainer>
        <Introduction />
        <form className="searchform">
          <div style={{ width: '60%' }}>
            <AutoCompleteContainer inputProps={inputProps} />
          </div>
          <Daypicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </form>
      </StyledContainer>

      <Chart
        forecastTimes={forecastTimes}
        cloudArray={cloudArray}
        humidityArray={humidityArray}
        windArray={windArray}
      />
    </>
  );
};

export default App;
