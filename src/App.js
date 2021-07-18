import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import Daypicker from './components/Daypicker';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './App.css';
import './datepickercustomstyles.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState({});
  const [chartData, setChartData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address.length > 10) {
      setLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latLng.lat}&lon=${latLng.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        )
        .then(response => {
          selectedDate.setHours(23, 0, 0, 0);

          const weatherTonight = response.data.list.filter(weathersingle => {
            return (
              new Date(weathersingle.dt * 1000).getTime() >=
                selectedDate.getTime() - 3600000 * 6 &&
              new Date(weathersingle.dt * 1000).getTime() <=
                selectedDate.getTime() + 3600000 * 12
            );
          });

          setChartData({
            forecastTimes: weatherTonight.map(hr =>
              hr.dt_txt.substring(11, 16)
            ),
            cloudArray: weatherTonight.map(hr => hr.clouds.all),
            humidityArray: weatherTonight.map(hr => hr.main.humidity),
            windArray: weatherTonight.map(hr => hr.wind.speed),
          });
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [latLng, selectedDate]);

  const onAddressChangeHandler = enteredAddress => {
    setAddress(enteredAddress);
  };

  const onAddressSelectHandler = () => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setLatLng(latLng))
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
        <PlacesAutocomplete inputProps={inputProps} />
        <Daypicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </form>
      {address.length > 10 && !loading && <Chart chartData={chartData} />}
      {loading && (
        <div>
          <h1
            style={{ textAlign: 'center', color: 'white', marginTop: '100px' }}
          >
            Loading...
          </h1>
        </div>
      )}
      {address.length < 10 && (
        <div>
          <h1
            style={{ textAlign: 'center', color: 'white', marginTop: '100px' }}
          >
            Enter Address
          </h1>
        </div>
      )}
    </main>
  );
};

export default App;
