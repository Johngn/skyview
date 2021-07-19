import { Line } from 'react-chartjs-2';

export interface chartDataProps {
  forecastTimes: string[];
  cloudArray: string[];
  humidityArray: string[];
  windArray: string[];
}

const Chart = ({
  forecastTimes,
  cloudArray,
  humidityArray,
  windArray,
}: chartDataProps) => {
  return (
    <div className="chart">
      <Line
        data={{
          labels: forecastTimes,
          datasets: [
            {
              pointRadius: 0,
              label: 'Cloud cover (%)',
              data: cloudArray,
              borderColor: 'red',
            },
            {
              pointRadius: 0,
              label: 'Humidity (%)',
              data: humidityArray,
              borderColor: 'rgb(255, 100, 0)',
            },
            {
              pointRadius: 0,
              label: 'Wind speed (km/hr)',
              data: windArray,
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
