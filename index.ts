import { config } from "dotenv";
config();

const fetchWeather = async () => {
  const weatherApi = process.env.API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=52.1797&lon=21.5662&appid=${weatherApi}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching api");
    }
    const data = await response.json();

    return { temperature: data.main.temp, name: data.name };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const response = await fetchWeather();
    if (!response) return new Response("Error");
    const date = new Date()
    return new Response(
      `Willkommen machen deine stadt ist : ${
        response.name
      } und der temperaturen ist ${response.temperature}°C at ${date.toISOString()}`
    );
  },
});

console.log(`Listening on localhost:${server.port}`);
