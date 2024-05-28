import {config} from "dotenv";
config();

let name;
let temperature;
let time;

const fetchWeather = async () => {
    const weatherApi = process.env.API_KEY
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=52.1797&lon=21.5662&appid=${weatherApi}&units=metric`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
    
        temperature = data.main.temp;
        name = data.name;

        return {temperature,name}
    
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
   
  };

  const fetchTimeForLocation = async () => {
    const timeApi = process.env.TIMEZONEDB_API_KEY;
  
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApi}&format=json&by=position&lat=52.1797&lng=21.5662`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
  
        time = new Date(data.formatted);
        return time
  
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
  };

const server = Bun.serve({
    port: 3000,
    async fetch(request) {
        const response = await fetchWeather()
      return new Response(`Willkommen machen deine stadt ist : ${response.name} und der temperaturen ist ${response.temperature}°C at ${await fetchTimeForLocation()}`);
    },
  });

  
  console.log(`Listening on localhost:${server.port}`);

