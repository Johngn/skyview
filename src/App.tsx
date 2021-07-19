import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import Daypicker from './components/Daypicker';
import AutoCompleteContainer from './components/AutoCompleteContainer';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './App.css';
import './datepickercustomstyles.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [forecastTimes, setForecastTimes] = useState([]);
  const [cloudArray, setCloudArray] = useState([]);
  const [humidityArray, setHumidityArray] = useState([]);
  const [windArray, setWindArray] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address.length > 10) {
      setLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        )
        .then(response => {
          selectedDate.setHours(23, 0, 0, 0);

          console.log(response.data.list);

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
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [lat, lng, selectedDate]);

  const onAddressChangeHandler = (enteredAddress: string) => {
    setAddress(enteredAddress);
  };

  const onAddressSelectHandler = () => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLat(latLng.lat);
        setLng(latLng.lng);
      })
      .catch(error => console.error('Error', error));
  };

  const inputProps = {
    value: address,
    placeholder: 'Search Location',
    onChange: onAddressChangeHandler,
    onSelect: onAddressSelectHandler,
  };

  return (
    <main>
      <form className="searchform">
        <AutoCompleteContainer inputProps={inputProps} />
        <Daypicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </form>
      {address.length > 10 && !loading && (
        <Chart
          forecastTimes={forecastTimes}
          cloudArray={cloudArray}
          humidityArray={humidityArray}
          windArray={windArray}
        />
      )}
      {loading && (
        <div>
          <h1
            style={{ textAlign: 'center', color: 'white', marginTop: '100px' }}
          >
            Loading...
          </h1>
        </div>
      )}
    </main>
  );
};

export default App;
