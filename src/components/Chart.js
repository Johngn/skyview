import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = props => {
  useEffect(() => {
    props.chartData.weather &&
      console.log(props.chartData.weather[0].main.temp);
  });

  return (
    <div className="chart">
      <Line
        data={{
          labels: props.chartData.forecastTimes,
          datasets: [
            {
              pointRadius: 0,
              label: 'Cloud cover (%)',
              data: props.chartData.cloudArray,
              borderColor: 'red',
            },
            {
              pointRadius: 0,
              label: 'Humidity (%)',
              data: props.chartData.humidityArray,
              borderColor: 'rgb(255, 100, 0)',
            },
            {
              pointRadius: 0,
              label: 'Wind speed (km/hr)',
              data: props.chartData.windArray,
              borderColor: 'rgb(255, 0, 225)',
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          legend: {
            display: true,
            labels: {
              fontColor: '#fff',
            },
          },
          title: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  fontSize: 15,
                  fontColor: '#fff',
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginatZero: true,
                  max: 100,
                  min: 0,
                  fontSize: 15,
                  fontColor: '#fff',
                },
                gridLines: {
                  display: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Chart;
