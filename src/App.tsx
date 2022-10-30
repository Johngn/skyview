import { useState, useEffect } from 'react';
import axios from 'axios';

import Chart from './components/Chart';
import Daypicker from './components/Daypicker';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorModal from './components/ErrorModal';
import StyledContainer from './components/StyledContainer';
import Introduction from './components/Introduction';

import './App.css';
import './datepickercustomstyles.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  const [forecastTimes, setForecastTimes] = useState([]);
  const [cloudArray, setCloudArray] = useState([]);
  const [humidityArray, setHumidityArray] = useState([]);
  const [windArray, setWindArray] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [lat, lng, selectedDate]);

  const clearError = () => {
    setError(null);
  };

  const auth_key = Buffer.from(
    `${process.env.REACT_APP_ROADGOAT_ACCESS_KEY}:${process.env.REACT_APP_ROADGOAT_SECRET_KEY}`
  ).toString('base64');

  const changeSearchTerm = (text: string) => {
    setSearchTerm(text);
    axios
      .get(
        `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${text}`,
        {
          headers: {
            Authorization: `Basic ${auth_key}`,
          },
        }
      )
      .then(res => {
        const result = res.data?.data?.map(({ attributes, id }: any) => ({
          id: id,
          long_name: attributes.long_name,
          latitude: attributes.latitude,
          longitude: attributes.longitude,
        }));
        setAutoCompleteResults(result ? result : []);
      });
  };

  return (
    <>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      {loading && <LoadingSpinner />}

      <StyledContainer>
        <Introduction />
        <form className="searchform">
          <div style={{ width: '60%' }}>
            <input
              className="searchInput"
              value={searchTerm}
              onChange={e => changeSearchTerm(e.target.value)}
            />
            <div className="autocomplete-container">
              {autoCompleteResults.map(
                ({ long_name, latitude, longitude, id }) => (
                  <button
                    key={id}
                    className="autocomplete-item-button"
                    onClick={e => {
                      e.preventDefault();
                      setLat(latitude);
                      setLng(longitude);
                      setAutoCompleteResults([]);
                      setSearchTerm(long_name);
                    }}
                  >
                    {long_name}
                  </button>
                )
              )}
            </div>
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
