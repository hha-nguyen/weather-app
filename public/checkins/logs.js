const mymap = L.map('mymap').setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors;';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);

    const txt = `the weather at ${item.weather.coord.lat}°, ${item.weather.coord.lon}° is ${item.weather.weather[0].description} with a temperature of ${item.weather.main.temp.toFixed(2)} degrees celsius. <br>
    The air quality index (aqi) in your city (${item.air.data.city.name}) is ${item.air.data.aqi} with paticulate matter (${item.air.data.dominentpol}). Your air status is ${item.air.status} last read on ${item.air.data.time.is}.`
    
    marker.bindPopup(txt);
  }
  console.log(data);
}